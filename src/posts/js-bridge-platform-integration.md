# 3개 플랫폼, 1개 API — 브릿지 통신 방식 설계

> **작업 기간**: 2026년 1월 ~ 4월
> **기술 스택**: TypeScript, WebView2, Android WebView, iOS WKWebView

---

## 배경

stove-js-bridge-v2는 웹뷰 환경에서 네이티브(PCSDK / AOS / IOS)로부터 토큰을 발급받는 TypeScript SDK입니다.

3개 플랫폼은 각자 완전히 다른 방식으로 웹과 통신합니다.

| 플랫폼 | 감지 조건 | 요청 방식 | 응답 방식 |
|--------|-----------|-----------|-----------|
| PCSDK  | `window.chrome?.webview` 존재 | `postMessage` | `message` 이벤트 |
| AOS    | `window._StoveJSBridge` 존재 | `invoke` 함수 직접 호출 | `window.StoveJSBridge.callback` |
| IOS    | `window.webkit?.messageHandlers` 존재 | `postMessage` | `window.StoveJSBridge.callback` |

핵심 과제는 **이 차이를 SDK 내부에서 완전히 흡수**하여, 웹 서비스는 플랫폼을 신경 쓰지 않는 것이었습니다.

---

## 플랫폼 자동 감지

`BridgeEnvironmentResolver`가 `window` 글로벌 객체를 분석해 현재 플랫폼을 결정합니다.

```typescript
static resolve(): ResolvedEnvironment {
  if (typeof window === 'undefined') return { platform: 'MOCK' };    // Node.js / 테스트
  if (window.chrome?.webview)        return { platform: 'PCSDK' };   // Windows WebView2
  if (window._StoveJSBridge)         return { platform: 'AOS' };     // Android WebView
  if (window.webkit?.messageHandlers) return { platform: 'IOS' };    // iOS WKWebView
  return { platform: 'MOCK' };                                        // 일반 브라우저 fallback
}
```

우선순위 순으로 검사하며, 모두 해당되지 않으면 Mock으로 fallback합니다.

---

## PCSDK (Windows WebView2)

WebView2는 `postMessage` / `message` 이벤트로 요청-응답이 이루어집니다. 응답에 `requestId`가 포함되어 있어 동시 요청이 가능합니다.

**통신 흐름**

```
웹 → 네이티브: window.chrome.webview.postMessage({ requestId, method, parameter })
네이티브 → 웹: window.chrome.webview message 이벤트 → { requestId, result }
```

**페이로드 구조**

```typescript
// 요청
{
  requestId: 'uuid-v4',
  method: 'RequestAccessToken',
  parameter: '{}',
}

// 응답 (message 이벤트 data)
{
  requestId: 'uuid-v4',
  result: 'actual_token_value',
}
```

**PCSDKBridge 구현**

```typescript
class PCSDKBridge extends AbstractJSBridge implements TokenBridge {
  readonly platform = BridgePlatform.PCSDK;

  constructor(private adapter: PCSDKPayloadAdapter) {
    super();
    // 생성 시 message 이벤트 리스너 등록
    window.chrome.webview.addEventListener('message', (event) => {
      const { requestId, result } = event.data;
      this.resolveCallback(requestId, result);
    });
  }

  protected sendToNative(requestId: string, request: TokenRequest): void {
    const { method, parameter } = this.adapter.buildPayload(request);
    window.chrome.webview.postMessage({ requestId, method, parameter });
  }
}
```

**웹뷰 닫기**

PCSDK는 `window.close()`가 redirect 이후 페이지에서 동작하지 않아 네이티브 브릿지로 직접 요청합니다. 응답을 기다리지 않는 fire-and-forget 방식입니다.

```typescript
class PCSDKWebviewBridge implements WebviewBridge {
  closeWebview(): void {
    window.chrome.webview.postMessage({ action: 'CloseWebview' });
  }
}
```

---

## AOS (Android WebView)

AOS는 `window._StoveJSBridge.invoke` 함수를 직접 호출하는 방식입니다. 응답은 `window.StoveJSBridge.callback` 전역 함수로 수신합니다.

**통신 흐름**

```
웹 → 네이티브: window._StoveJSBridge.invoke(method, parameter, callbackId)
네이티브 → 웹: window.StoveJSBridge.callback(callbackId, error, data)
```

**페이로드 구조**

```typescript
// 요청 — 함수 인자로 전달
method:     'getStoveValue'
parameter:  'access_token' | 'refresh_token'
callbackId: 'uuid-v4'

// 응답 — window.StoveJSBridge.callback(callbackId, null, data)
data: {
  key: 'access_token',
  value: {
    token: 'actual_access_token',
    refresh_token: 'actual_refresh_token',
  }
}
```

**AOSBridge 구현**

```typescript
class AOSBridge extends AbstractJSBridge implements TokenBridge {
  readonly platform = BridgePlatform.AOS;

  constructor(private adapter: AOSPayloadAdapter) {
    super();
    // 전역 콜백 등록
    window.StoveJSBridge = {
      callback: (callbackId, error, data) => {
        if (error) {
          this.rejectCallback(callbackId, error);
          return;
        }
        const token = data.value.token;
        this.resolveCallback(callbackId, token);
      },
    };
  }

  protected sendToNative(requestId: string, request: TokenRequest): void {
    const { method, parameter } = this.adapter.buildPayload(request);
    window._StoveJSBridge.invoke(method, parameter, requestId);
  }
}
```

---

## IOS (iOS WKWebView)

IOS는 `window.webkit.messageHandlers.StoveJS.postMessage`로 요청하며, 응답 수신 방식은 AOS와 동일하게 `window.StoveJSBridge.callback`을 사용합니다.

**통신 흐름**

```
웹 → 네이티브: window.webkit.messageHandlers.StoveJS.postMessage({ method, parameter, callbackId })
네이티브 → 웹: window.StoveJSBridge.callback(callbackId, error, data)   ← AOS와 동일
```

**페이로드 구조**

```typescript
// 요청 — 객체로 전달 (AOS와 다름)
{
  method:     'getStoveValue',
  parameter:  'access_token' | 'refresh_token',
  callbackId: 'uuid-v4',
}

// 응답 — AOS와 동일한 포맷
```

**IOSBridge 구현**

```typescript
class IOSBridge extends AbstractJSBridge implements TokenBridge {
  readonly platform = BridgePlatform.IOS;

  constructor(private adapter: IOSPayloadAdapter) {
    super();
    // AOS와 동일한 전역 콜백 구조
    window.StoveJSBridge = {
      callback: (callbackId, error, data) => {
        if (error) {
          this.rejectCallback(callbackId, error);
          return;
        }
        this.resolveCallback(callbackId, data.value.token);
      },
    };
  }

  protected sendToNative(requestId: string, request: TokenRequest): void {
    const { method, parameter } = this.adapter.buildPayload(request);
    window.webkit.messageHandlers.StoveJS.postMessage({ method, parameter, callbackId: requestId });
  }
}
```

---

## Self-registration으로 플랫폼 확장

각 플랫폼 브릿지는 `register.ts`에서 `BridgeRegistry`에 스스로를 등록합니다. import 행위 자체가 등록이므로, 새 플랫폼을 추가해도 기존 코드를 수정할 필요가 없습니다.

```typescript
// plugins/aos/register.ts
import { BridgeRegistry } from '../../core/bridge/registry/BridgeRegistry.js';
import { AOSBridge } from './AOSBridge.js';
import { AOSPayloadAdapter } from './AOSPayloadAdapter.js';

BridgeRegistry.register('AOS', () => new AOSBridge(new AOSPayloadAdapter()));
```

새 플랫폼 추가 시에는 `plugins/` 하위에 디렉터리를 만들고 `register.ts`를 작성하기만 하면 됩니다.

---

## 플랫폼별 비교 요약

| 항목 | PCSDK | AOS | IOS |
|------|-------|-----|-----|
| 요청 방식 | `postMessage` (객체) | `invoke` (인자 3개) | `postMessage` (객체) |
| 응답 방식 | `message` 이벤트 | `window.StoveJSBridge.callback` | `window.StoveJSBridge.callback` |
| requestId 키 이름 | `requestId` | `callbackId` | `callbackId` |
| 웹뷰 닫기 | `postMessage({ action: 'CloseWebview' })` | 미지원 | 미지원 |
| 동시 요청 | 가능 | 가능 | 가능 |

---

## 배운 점

**플랫폼 차이는 SDK 경계 안에서 완전히 흡수해야 합니다.** AOS와 IOS가 같은 `window.StoveJSBridge.callback` 포맷을 사용한다는 점을 발견했을 때, `AbstractJSBridge`를 공통 추상 클래스로 올리는 결정이 자연스럽게 이루어졌습니다. 차이를 먼저 나열하고, 공통점을 추상화하는 순서로 작업하는 게 효과적이었습니다.

**PCSDK의 응답 방식이 AOS/IOS와 다르다는 점**(`message` 이벤트 vs 전역 콜백)은 처음에 `AbstractJSBridge`를 설계할 때 고민이 많았습니다. 결국 `resolveCallback`을 public으로 노출하고, 각 브릿지 생성자에서 응답 리스너를 등록하는 방식으로 해결했습니다.
