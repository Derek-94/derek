# DX를 설계한다 — BridgeLogger와 전역 디버그 객체

> **작업 기간**: 2026년 1월 ~ 4월
> **기술 스택**: TypeScript, WebView2, Android WebView, iOS WKWebView

---

## 배경

stove-js-bridge-v2의 기능 구현이 완료된 시점에서 한 가지 문제가 남아 있었습니다.

**연동 상태를 확인할 수단이 없었습니다.**

웹 서비스 팀과 네이티브 팀(AOS/IOS) 사이에서 반복되는 패턴이 있었습니다.

```
웹 서비스 팀: "토큰 요청 보냈는데 응답이 안 와요"
네이티브 팀:  "우리는 정상적으로 콜백 쐈는데요"
웹 서비스 팀: "그럼 우리 로그를 볼게요... (한참 뒤) 요청 자체가 안 갔네요"
```

문제가 웹에 있는지 네이티브에 있는지 파악하는 데 불필요한 시간이 소요됐습니다. 기능 완성 이후 "연동 과정을 스스로 디버깅할 수 있는 환경"을 추가로 설계했습니다.

---

## 제안 1. BridgeLogger — 구조화된 콘솔 로그

대상: **웹 서비스 개발팀**

웹 서비스 팀은 브라우저 DevTools 콘솔에서 브릿지의 전체 생애주기를 볼 수 있어야 합니다.

### 동작 방식

모듈이 로드되는 순간부터 자동으로 출력됩니다. 별도 설정 불필요.

```
[StoveBridge] Platform detected: AOS
[StoveBridge] Bridge registered: AOSBridge
[StoveBridge] → REQUEST ACCESS  req-uuid-1234
[StoveBridge] ← RESPONSE        req-uuid-1234  ✓  213ms
[StoveBridge] ← RESPONSE        req-uuid-5678  ✗  ERROR: token fetch failed
[StoveBridge] ⚠ req-uuid-9999 (ACCESS) 응답 없음 (5000ms 초과). 네이티브 확인 필요.
```

### 확인 가능한 정보

| 로그 | 의미 |
|------|------|
| `Platform detected` | 어떤 플랫폼으로 감지됐는지 즉시 확인 |
| `→ REQUEST` | 요청이 실제로 네이티브로 나갔는지 |
| `← RESPONSE ✓` | 응답이 왔는지, 응답 시간은 얼마인지 |
| `← RESPONSE ✗` | 에러 응답 내용 |
| `⚠ 응답 없음` | 5초 타임아웃 경고 — 조용한 무한 대기 버그 조기 감지 |

### 토글

기본 활성화. 필요에 따라 끄거나 프로덕션 배포 후에도 현장에서 켤 수 있습니다.

```typescript
// 초기화 시 끄기
new TokenFacade({ debug: false });

// localStorage로 현장 토글 (프로덕션 배포 후에도 가능)
localStorage.setItem('STOVE_BRIDGE_DEBUG', '1');
```

### AbstractJSBridge 연동

`AbstractJSBridge`의 요청/응답 시점에 logger 호출을 추가합니다.

```typescript
abstract class AbstractJSBridge {
  protected registerCallback(requestId: string): Promise<string> {
    BridgeLogger.request(requestId, request.type); // ← 요청 로그
    const start = Date.now();

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        BridgeLogger.timeout(requestId, request.type); // ← 타임아웃 경고
        reject(new BridgeError('timed out', this.platform, 'TIMEOUT'));
      }, AbstractJSBridge.TIMEOUT_MS);

      this.pending.set(requestId, {
        resolve: (token) => {
          BridgeLogger.response(requestId, Date.now() - start); // ← 응답 로그 + 소요시간
          clearTimeout(timer);
          resolve(token);
        },
        reject: (error) => {
          BridgeLogger.error(requestId, error); // ← 에러 로그
          clearTimeout(timer);
          reject(error);
        },
      });
    });
  }
}
```

---

## 제안 2. window.__STOVE_BRIDGE__ — 전역 디버그 객체

대상: **네이티브 개발팀 (AOS / IOS)**

네이티브 팀은 각 플랫폼 도구로 WebView 콘솔에 접속해 이 객체를 직접 조회합니다.

| 플랫폼 | 접속 방법 |
|--------|-----------|
| AOS | Android Studio → `chrome://inspect` → DevTools 콘솔 |
| IOS | Mac Safari → 개발 메뉴 → [기기명] → [WebView] → Web Inspector 콘솔 |

### 노출 구조

```javascript
window.__STOVE_BRIDGE__ = {
  platform: 'IOS',
  version:  '2.0.0',
  pending: {
    'uuid-1234': { type: 'ACCESS', since: 1711234567890 }
  },
  stats: { total: 5, success: 4, failed: 1 },
  simulateCallback: (callbackId, token) => { ... }
}
```

### 실제 사용법

```javascript
// 1. 현재 대기 중인 요청 확인 — 웹이 요청을 보냈는지 검증
> window.__STOVE_BRIDGE__.pending
{ 'uuid-1234': { type: 'ACCESS', since: 1711234567890 } }

// 2. 누적 통계 확인
> window.__STOVE_BRIDGE__.stats
{ total: 5, success: 4, failed: 1 }

// 3. 네이티브 없이 콜백 시뮬레이션
> window.__STOVE_BRIDGE__.simulateCallback('uuid-1234', 'test-token')
// → 웹이 정상 반응하면: 네이티브 콜백 코드 문제
// → 웹이 여전히 이상하면: 웹 코드 문제
```

`simulateCallback`이 핵심입니다. 네이티브 팀이 실제 앱 없이도 콘솔에서 콜백을 주입해, 웹과 네이티브 중 어느 쪽 문제인지 즉시 구분할 수 있습니다.

---

## 구현 범위

| 파일 | 작업 | 내용 |
|------|------|------|
| `src/core/bridge/logger/BridgeLogger.ts` | 신규 | 콘솔 로그 + 타임아웃 경고 구현 |
| `src/core/bridge/abstraction/AbstractJSBridge.ts` | 수정 | 요청/응답 시 BridgeLogger 호출, `window.__STOVE_BRIDGE__` 등록 |
| `src/core/bridge/environment/BridgeEnvironmentResolver.ts` | 수정 | 플랫폼 감지 결과 로그 출력 |
| `src/features/token/TokenFacade.ts` | 수정 | `debug` 옵션 수용 |

---

## 결과

| 항목 | 기존 | TO-BE |
|------|------|-------|
| 플랫폼 감지 결과 확인 | 코드 분석 필요 | 콘솔 첫 줄에 출력 |
| 요청 발송 여부 확인 | 불가능 | `→ REQUEST` 로그 |
| 응답 소요 시간 | 알 수 없음 | `← RESPONSE ✓ 213ms` |
| 타임아웃 감지 | 무한 대기 | 5초 후 경고 로그 + BridgeError |
| 웹/네이티브 책임 구분 | 핑퐁 커뮤니케이션 | `simulateCallback`으로 콘솔에서 즉시 검증 |

---

## 배운 점

**기능 완성이 끝이 아닙니다.** 브릿지처럼 웹-네이티브 경계를 넘는 통신은 문제가 생겼을 때 어느 쪽인지 특정하기 어렵습니다. 이런 모듈일수록 디버깅 도구를 처음부터 함께 설계해야 한다는 걸 느꼈습니다.

**`simulateCallback`의 가치는 단순한 테스트 유틸이 아닙니다.** 네이티브 팀이 실제 앱 없이 콜백 주입으로 책임 경계를 직접 확인할 수 있게 되면서, "우리는 쐈는데"와 "우리는 못 받았는데" 사이의 커뮤니케이션 비용이 줄었습니다. 도구 하나가 팀 간 신뢰를 만들 수 있다는 점이 인상적이었습니다.
