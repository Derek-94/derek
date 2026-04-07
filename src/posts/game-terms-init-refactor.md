# 게임 약관 초기화 로직 리팩토링

> **작업 기간**: 2025년 11월
> **관련 MR**: !427, !447
> **기술 스택**: TypeScript, RxJS, Angular (Vue)

---

## 배경

게임 약관 동의 페이지의 초기화 로직이 하나의 파일에 집중되어 있었습니다.
오랜 기간 기능이 추가되면서 단일 함수가 **416줄**, 에러 핸들러가 **200줄**까지 커진 상태였고,
신규 요구사항이 생길 때마다 기존 코드를 직접 수정해야 하는 구조였습니다.

---

## 문제

### 1. 초기화 함수: 416줄의 단일 함수

```typescript
// AS-IS: gameTermsInit() — 416줄
switchMap((data) => {
    // 검증 + API 호출 + 비즈니스 로직이 모두 한 곳에
    switchMap((data) => {
        switchMap((data) => {
            switchMap((data) => {
                switchMap((data) => {
                    switchMap((data) => {
                        // 6단계 중첩 switchMap
                    })
                })
            })
        })
    })
})
```

- 검증, API 호출, 비즈니스 규칙, UI 상태 발행이 하나의 함수에 혼재
- 6단계 중첩 `switchMap`으로 인한 가독성 저하
- `zip`으로 6개 변수를 튜플로 전달하는 불안정한 구조

### 2. 에러 핸들러: 200줄의 switch-case

```typescript
// AS-IS: handleInitResult() — 200줄
switch (code) {
    case IntegrationInitCode.AbnormalAccess: /* ... */ break;
    case IntegrationInitCode.NotLogin:       /* ... */ break;
    case IntegrationInitCode.FailGetGameInfo: /* ... */ break;
    // ... 15개 이상의 case
}
```

- 새로운 에러 코드가 생길 때마다 이 함수를 직접 수정
- 각 케이스별 로직을 독립적으로 테스트할 수 없음
- 에러 메시지 생성 로직이 여러 케이스에 중복

---

## 해결

### MR !427 — Orchestrator Pattern + Context Pattern

초기화 함수를 역할별로 4개의 Service로 분리하고, Orchestrator가 전체 흐름을 조율하는 구조로 변경했습니다.

```typescript
// TO-BE: GameTermsInitOrchestrator
execute(route, subject) {
    return of(new GameTermsContext({ query: route.query })).pipe(
        // Phase 1: 검증
        this.validationService.validateQuery(),
        this.validationService.validateAuth(),

        // Phase 2: 데이터 로딩
        this.dataLoaderService.loadMemberInfo(),
        this.dataLoaderService.loadGds(),
        this.dataLoaderService.loadGameInfo(),

        // Phase 3~6: 약관 동의, 본인인증, 연령 검증, 약관 목록 ...

        // Phase 7: 비즈니스 로직
        this.businessRuleService.determineTermsType(),

        // Phase 8: 결과 발행
        this.presenterService.sendViewLog(),
        this.presenterService.emitTermsListInfo(),
    );
}
```

**파일 구조**

| 파일 | 역할 | 사용 Operator |
|------|------|--------------|
| `GameTermsContext.ts` | 파이프라인 전체 데이터 컨테이너 | - |
| `GameTermsValidationService.ts` | 검증 로직 | `map` |
| `GameTermsDataLoaderService.ts` | API 호출 | `switchMap` |
| `GameTermsBusinessRuleService.ts` | 비즈니스 규칙 | `map`, `tap` |
| `GameTermsPresenterService.ts` | UI 상태 발행 | `tap`, `map` |
| `GameTermsInitOrchestrator.ts` | 플로우 조율 | - |

**Context Pattern으로 튜플 제거**

```typescript
// AS-IS: zip으로 6개 변수 튜플 전달
zip(of(query), of(memberInfo), of(gds), of(gameInfo), of(userAge), of(termsList))

// TO-BE: 단일 Context 객체로 누적
context.update({ memberInfo })
context.update({ gds })
context.update({ gameInfo })
```

**RxJS Operator 목적에 맞게 분리**

```typescript
// AS-IS: 모든 로직이 switchMap
switchMap((data) => {
    if (!data.isValid) throw error;
    return of(data); // 불필요한 Observable 래핑
})

// TO-BE: 동기/비동기/부수효과 명확히 구분
map(context => { /* 동기 검증/변환 */ })
switchMap(context => api.call()) // 비동기 API
tap(context => { /* 부수효과 */ })
```

---

### MR !447 — Strategy Pattern + Factory Pattern

에러 핸들러를 각 코드별 독립 클래스로 분리하고, Factory가 적절한 핸들러를 선택하는 구조로 변경했습니다.

```typescript
// TO-BE: InitResultHandlerFactory
export class InitResultHandlerFactory {
    constructor(deps: HandlerDependencies) {
        this.handlers = new Map([
            [IntegrationInitCode.AbnormalAccess, new AbnormalAccessHandler(deps)],
            [IntegrationInitCode.NotLogin,        new NotLoginHandler(deps)],
            [IntegrationInitCode.FailGetGameInfo, new FailGetGameInfoHandler(deps)],
            // ...
        ]);
    }

    getHandler(code: IntegrationInitCode): InitResultHandler {
        return this.handlers.get(code) ?? new GenericErrorHandler(deps);
    }
}

// 호출부
const handler = factory.getHandler(result.code);
handler.handle({ serverCode, additionMsg });
```

**공통 로직 유틸리티로 통합**

```typescript
// AS-IS: 여러 Handler에 동일 코드 중복
const errorMsg = serverCode
    ? this.deps.$trans(serverCode)
    : this.deps.$trans('alert.connection-delay-msg');

// TO-BE: ErrorMessageUtil로 통합
const errorMsg = ErrorMessageUtil.getErrorAlertMsg(serverCode, this.deps.$trans);
```

---

## 결과

| 항목 | AS-IS | TO-BE |
|------|-------|-------|
| 초기화 함수 규모 | 단일 함수 416줄 | Orchestrator + 4 Services |
| switchMap 중첩 | 6단계 | 없음 (단계별 operator 분리) |
| 에러 핸들러 규모 | 단일 switch-case 200줄 | Handler 클래스 14개로 분리 |
| 신규 케이스 추가 | 기존 함수 직접 수정 | Handler 클래스 추가 후 Factory 등록 |
| 테스트 가능성 | 어려움 (전체 의존성 필요) | 각 Service/Handler 독립 테스트 가능 |

---

## 배운 점

**RxJS에서 Orchestrator Pattern은 명시적인 단계별 파이프라인을 표현할 때 자연스럽게 맞아떨어집니다.** 각 Operator가 Context를 받아 변환하고 다음 단계로 넘기는 구조 덕분에 전체 흐름을 선언적으로 읽을 수 있게 됩니다.

**Strategy Pattern은 분기 로직이 많고 각 케이스가 서로 독립적일 때 효과적입니다.** switch-case를 클래스로 옮기는 것 자체가 목적이 아니라, 각 케이스가 독립적으로 테스트되고 수정될 수 있다는 점이 핵심이었습니다.
