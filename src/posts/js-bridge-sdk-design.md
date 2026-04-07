# 6개 디자인 패턴으로 멀티플랫폼 TypeScript SDK 설계하기

> **작업 기간**: 2026년 1월 ~ 4월
> **기술 스택**: TypeScript, Rollup, WebView2, Android WebView, iOS WKWebView

---

## 배경

STOVE 플랫폼에서 동작하는 웹 서비스는 실행 환경에 따라 각기 다른 방식으로 토큰을 발급받아야 했습니다.

- **PCSDK (Windows WebView2)**: `window.chrome.webview.postMessage`로 요청, `message` 이벤트로 응답
- **AOS (Android WebView)**: `window._StoveJSBridge.invoke`로 요청, `window.StoveJSBridge.callback` 전역 콜백으로 응답
- **IOS (iOS WKWebView)**: `window.webkit.messageHandlers.StoveJS.postMessage`로 요청, 동일한 전역 콜백으로 응답

각 웹 서비스가 플랫폼을 직접 감지하고 분기 처리를 하는 구조였기 때문에, 새 플랫폼이 추가될 때마다 모든 서비스 코드를 수정해야 했습니다.

---

## 목표

```typescript
// 웹 서비스가 알아야 할 건 이것뿐
const token = await createTokenFacade().getAccessToken();
```

플랫폼이 무엇이든 동일한 API로 동작하는 SDK를 설계하는 것이 목표였습니다.

---

## 설계: 6개 패턴을 하나의 흐름으로

### Facade — 단일 진입점

외부에서 사용하는 API는 `createTokenFacade()`와 `createWebviewFacade()` 두 가지뿐입니다. 내부의 플랫폼 감지, 브릿지 생성, 서비스 조립은 모두 은닉됩니다.

```typescript
// 웹 서비스 코드 — 플랫폼을 알 필요 없음
const facade = createTokenFacade();
const accessToken = await facade.getAccessToken();
const refreshToken = await facade.getRefreshToken();
```

### Builder — 요청 객체 조립

토큰 요청은 `TokenRequestBuilder`로 단계적으로 구성합니다. `.build()` 호출 전까지 유효성을 검증하지 않으므로, 잘못된 요청 객체가 만들어지는 것을 타입 레벨에서 차단합니다.

```typescript
const request = new TokenRequestBuilder()
  .accessToken()
  .scope('user')
  .audience('stove')
  .build();
// → { type: 'ACCESS', params: { scope: 'user', audience: 'stove' } }
```

### Registry — Self-registration으로 플랫폼 등록

각 플랫폼 브릿지는 `register.ts`를 import하는 순간 스스로를 등록합니다. 새 플랫폼을 추가해도 기존 코드를 수정할 필요가 없습니다.

```typescript
// plugins/pcsdk/register.ts
// import 하는 행위 자체가 등록
BridgeRegistry.register('PCSDK', () => new PCSDKBridge());
```

```typescript
// plugins/ios/register.ts
BridgeRegistry.register('IOS', () => new IOSBridge());
```

### Bridge — 추상 레이어와 구현체 분리

`TokenBridge` 인터페이스가 상위 레이어와 플랫폼 구현체 사이의 계약을 정의합니다. `TokenService`는 어떤 플랫폼 브릿지가 주입되든 동일한 방식으로 호출합니다.

```typescript
interface TokenBridge {
  readonly platform: BridgePlatform;
  send(request: TokenRequest): Promise<string>;
}
```

### Strategy — 전송 방식 교체

플랫폼마다 다른 `postMessage` 방식을 `TransportStrategy`로 분리합니다. 브릿지는 전송 구현을 알 필요 없이 strategy에게 위임합니다.

```typescript
interface TransportStrategy<T = unknown> {
  send(payload: T): Promise<string>;
}
```

### Adapter — 페이로드 변환

공통 `TokenRequest`를 각 플랫폼이 기대하는 포맷으로 변환합니다. 상위 로직은 포맷 변경에 영향을 받지 않습니다.

```typescript
interface PayloadAdapter<T = unknown> {
  buildPayload(request: TokenRequest): T;
}

// PCSDK는 { method, parameter } 포맷을 기대
class PCSDKPayloadAdapter implements PayloadAdapter<PCSDKPayload> {
  buildPayload(request: TokenRequest): PCSDKPayload {
    return {
      method: PCSDKMethod.RequestAccessToken,
      parameter: '{}',
    };
  }
}
```

---

## AbstractJSBridge — requestId 매칭 메커니즘

네이티브 브릿지의 핵심 문제는 **요청과 응답이 분리된 이벤트**라는 점입니다.

```
웹 → 네이티브: postMessage({ requestId: "uuid-1", method: "RequestAccessToken" })
네이티브 → 웹: callback({ requestId: "uuid-1", token: "actual_token" })
```

동시에 여러 요청이 발생하면 어떤 응답이 어떤 요청에 대한 것인지 매칭이 필요합니다. `AbstractJSBridge`가 이 패턴을 공통화합니다.

```typescript
abstract class AbstractJSBridge {
  // requestId → { resolve, reject } 매핑
  private readonly pending = new Map<string, PendingCallback>();
  protected static readonly TIMEOUT_MS = 5_000;

  // 요청 시: Promise 등록 + 타임아웃 설정
  protected registerCallback(requestId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new BridgeError('Bridge request timed out', this.platform, 'TIMEOUT'));
      }, AbstractJSBridge.TIMEOUT_MS);

      this.pending.set(requestId, {
        resolve: (token) => { clearTimeout(timer); resolve(token); },
        reject: (error) => { clearTimeout(timer); reject(error); },
      });
    });
  }

  // 응답 시: 네이티브가 호출 → 해당 Promise resolve
  resolveCallback(requestId: string, token: string): void {
    const cb = this.pending.get(requestId);
    if (cb) {
      this.pending.delete(requestId);
      cb.resolve(token);
    }
  }

  // 구현체는 이것만 작성
  protected abstract sendToNative(requestId: string, request: TokenRequest): void;
}
```

덕분에 각 플랫폼 브릿지는 `sendToNative()`만 구현하면 됩니다. 동시 요청도 requestId로 각각 독립된 Promise에 매칭됩니다.

```typescript
// 동시에 2개 요청 — 각각 독립된 Promise로 처리
const [accessToken, refreshToken] = await Promise.all([
  bridge.send({ type: 'ACCESS' }),   // requestId: "uuid-1"
  bridge.send({ type: 'REFRESH' }),  // requestId: "uuid-2"
]);
```

---

## 레이어 구조

```
features/         외부 진입점 (TokenFacade, WebviewFacade)
bootstrap/        조립 헬퍼 (createBridge, createTokenService, createFacade)
core/abstraction/ 순수 계약 인터페이스 (TokenBridge, AbstractJSBridge, PayloadAdapter ...)
core/infra/       BridgeRegistry, BridgeEnvironmentResolver
plugins/          플랫폼 구현체 (mock/, pcsdk/, aos/, ios/)
```

`core/abstraction/`이 경계선입니다. 상위 레이어는 이 인터페이스에만 의존하고, 플랫폼 구현체는 이 인터페이스를 구현합니다.

---

## 결과

| 항목 | 기존 | TO-BE |
|------|------|-------|
| 플랫폼 분기 처리 위치 | 각 웹 서비스 코드 | SDK 내부 (BridgeEnvironmentResolver) |
| 새 플랫폼 추가 시 | 모든 서비스 수정 | `plugins/` 디렉터리에 추가만 |
| 웹 서비스 API | 플랫폼별 상이 | `createTokenFacade()` 단일 진입점 |
| 동시 요청 처리 | 미지원 | requestId 기반 pending Map |
| 타임아웃 처리 | 미지원 | 5초 후 BridgeError 자동 reject |

---

## 배운 점

**패턴은 조합일 때 강력해집니다.** Facade 하나만으로는 내부 복잡도가 줄지 않습니다. Registry로 플랫폼을 분리하고, Bridge로 추상 레이어를 만들고, Adapter로 포맷을 분리해야 Facade가 진짜 단순해집니다.

**AbstractJSBridge의 pending Map 패턴은 네이티브 브릿지처럼 요청-응답이 분리된 비동기 통신에서 반복적으로 쓸 수 있는 유용한 기법입니다.** 구현체마다 중복 작성하는 대신 추상 클래스로 공통화하면 새 플랫폼 추가 시 실수를 줄일 수 있습니다.
