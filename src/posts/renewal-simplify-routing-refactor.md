# 라우팅 로직 리팩토링: 순수 함수 분리

> **작업 기간**: 2025년 11월
>
> **기술 스택**: TypeScript, Vue Router

---

## 배경

모바일 SDK 약관 동의 페이지(`RenewalSimplifyLayout`)의 초기 라우팅 로직이 컴포넌트 내부에 복잡하게 얽혀 있었습니다. 시나리오가 추가될 때마다 `init()` 메서드가 커졌고, 어느 시점에는 **108줄의 if-else 블록**이 되어 있었습니다.

---

## 문제

```typescript
// AS-IS: init() 내 108줄 if-else
protected init(): void {
    if (!this.isStoveJoin && checkJoinTerms(this.termsQuery) && checkInfoEnable(this.termsQuery)) {
        // 시나리오 1: 신규 가입 동선 — 데이터 설정 50줄
        this.renewalSimplifyInitService.setInfoConfirmData({
            nationSetting: { isShow: true, code: this.termsQuery.nation, ... },
            birthSetting: { isShow: this.isDefaultNation ? true : checkBirthEnable(...) },
            onSubmit: this.onStoveJoinBirthDialogSubmit,
            // ...
        });
        this.$router.replace({ name: 'infoConfirm', query: {...} });

    } else if (!checkJoinTerms(...) && nation !== 'kr' && !this.isVerifiedAge && ...) {
        // 시나리오 2: 기존 회원 동선 — 데이터 설정 40줄
        this.renewalSimplifyInitService.setInfoConfirmData({ ... });
        this.$router.replace({ name: 'infoConfirm', query: {...} });

    } else {
        // 시나리오 3: 약관 목록 — 데이터 설정 42줄
        this.renewalSimplifyInitService.setSdkTermsPageData({ ... });
        this.$router.replace({ name: 'mobileSdkTermsList', query: {...} });
    }
}
```

문제는 세 가지였습니다:
- **조건 판단**과 **데이터 설정**과 **라우팅 실행**이 한 블록에 혼재
- 새 시나리오 추가 시 `init()` 전체를 수정해야 함
- 컴포넌트 의존성(`this.renewalSimplifyInitService`, `this.$router`)이 뒤섞여 순수 함수로 추출 불가능

---

## 해결

### 데이터와 동작을 분리

핵심 아이디어는 **컴포넌트 의존성 없이 순수 데이터/함수만 다루는 파일**을 분리하는 것이었습니다.
콜백(`onSubmit`)처럼 컴포넌트 메서드를 참조해야 하는 부분만 남기고, 나머지는 모두 `RenewalSimplifyRouting.ts`로 추출했습니다.

**`RenewalSimplifyRouting.ts` (새 파일) — 순수 함수/데이터**

```typescript
// 라우팅 목적지 (Enum → as const로 변경, 번들 최적화)
export const RoutingDestination = {
    INFO_CONFIRM_SIGNUP: 'INFO_CONFIRM_SIGNUP',
    INFO_CONFIRM_SIGNIN: 'INFO_CONFIRM_SIGNIN',
    TERMS_LIST: 'TERMS_LIST'
} as const;

// 라우팅 전략 — 조건과 목적지만 정의
const ROUTING_STRATEGIES = [
    {
        condition: (ctx) => !ctx.isStoveJoin && checkJoinTerms(ctx.termsQuery) && checkInfoEnable(ctx.termsQuery),
        destination: RoutingDestination.INFO_CONFIRM_SIGNUP
    },
    {
        condition: (ctx) => !checkJoinTerms(ctx.termsQuery) && ctx.termsQuery.nation !== 'kr' && !ctx.isVerifiedAge,
        destination: RoutingDestination.INFO_CONFIRM_SIGNIN
    },
    {
        condition: () => true, // fallback
        destination: RoutingDestination.TERMS_LIST
    }
];

// 라우팅 결정 (순수 함수)
export function determineInitialRoute(context: RoutingContext): RoutingDestination {
    return ROUTING_STRATEGIES.find(s => s.condition(context)).destination;
}

// 목적지별 데이터 config (onSubmit 콜백 제외)
export const ROUTING_DATA_CONFIGS = {
    [RoutingDestination.INFO_CONFIRM_SIGNUP]: (ctx) => ({
        nationSetting: { isShow: true, code: ctx.termsQuery.nation, isSelect: ctx.isDefaultNation },
        birthSetting: { isShow: ctx.isDefaultNation ? true : checkBirthEnable(ctx.termsQuery) },
        logSetting: { userinfoReason: 'signup' },
        privacyCheckSetting: { isShow: false },
        isFirstPage: true
    }),
    [RoutingDestination.INFO_CONFIRM_SIGNIN]: (ctx) => ({
        nationSetting: { isShow: false },
        birthSetting: { isShow: true },
        privacyCheckSetting: { isShow: true },
        logSetting: { userinfoReason: 'signin' },
        isFirstPage: true
    }),
    [RoutingDestination.TERMS_LIST]: (ctx) => ({
        gameName: ctx.termsQuery.gameName,
        isStoveJoin: ctx.isStoveJoin,
        sdkVersion: ctx.sdkVersion,
        isFirstPage: true,
        // ...
    })
};
```

**`RenewalSimplifyLayout.ts` — 컴포넌트는 콜백 주입과 실행만**

```typescript
// 컴포넌트 메서드 참조는 여기서만 관리
protected readonly ROUTING_CALLBACKS = {
    [RoutingDestination.INFO_CONFIRM_SIGNUP]: this.onStoveJoinBirthDialogSubmit,
    [RoutingDestination.INFO_CONFIRM_SIGNIN]: this.onBirthDialogSubmit
};

protected readonly ROUTE_NAME_MAP = {
    [RoutingDestination.INFO_CONFIRM_SIGNUP]: 'infoConfirm',
    [RoutingDestination.INFO_CONFIRM_SIGNIN]: 'infoConfirm',
    [RoutingDestination.TERMS_LIST]: 'mobileSdkTermsList'
};

// init() — 108줄 → 26줄
protected init(): void {
    const context: RoutingContext = {
        termsQuery: this.termsQuery,
        isStoveJoin: this.isStoveJoin,
        isVerifiedAge: this.isVerifiedAge,
        isDefaultNation: this.isDefaultNation,
        sdkVersion: this.sdkVersion
    };

    const destination = determineInitialRoute(context);           // 1. 목적지 결정 (순수 함수)
    const baseData = ROUTING_DATA_CONFIGS[destination](context);  // 2. 데이터 생성
    const callback = this.ROUTING_CALLBACKS[destination];         // 3. 콜백 조회
    const data = callback ? { ...baseData, onSubmit: callback } : baseData; // 4. 콜백 주입

    this.setServiceData(destination, data);  // 5. 서비스 설정
    this.navigateToRoute(destination);       // 6. 라우팅
}
```

---

## 결과

| 항목 | AS-IS | TO-BE |
|------|-------|-------|
| `init()` 규모 | 108줄 if-else | 26줄 |
| 라우팅 조건 테스트 | 불가 (컴포넌트 의존성 혼재) | `determineInitialRoute()` 단독 테스트 가능 |
| 신규 시나리오 추가 | `init()` 전체 수정 | `ROUTING_STRATEGIES`에 항목 추가 |
| Enum 번들 비용 | TypeScript Enum (IIFE 생성) | `as const` (트리쉐이킹 가능) |

---

## 배운 점

if-else 블록에서 "조건"과 "그 조건이 참일 때 실행하는 코드"가 붙어 있으면, 조건만 따로 떼어 테스트하거나 재배치하기가 어렵습니다. 조건을 배열 기반 Strategy로 추출하면 우선순위 변경이나 새 케이스 추가가 선언적으로 가능해집니다.

또한 순수 데이터/함수와 컴포넌트 의존성(콜백, `this`)을 파일 수준에서 분리하면, 테스트 작성이 수월해지고 코드를 읽는 사람도 "이 파일은 외부 의존성이 없다"는 걸 바로 알 수 있습니다.
