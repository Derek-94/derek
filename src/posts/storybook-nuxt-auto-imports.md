# Nuxt3 Auto Imports를 Storybook에서 — 4번의 시도와 결론

> **작업 기간**: 2025년 3월
> **관련 MR**: !86, !91
> **기술 스택**: Nuxt 3, Storybook, TypeScript, stove-ui

---

## 배경

초기 세팅([이전 글: 모노레포에 Storybook 세팅하기](/logbook/storybook-monorepo-setup))을 마치고 Storybook에서 Tailwind와 stove-ui가 동작하게 됐지만, 하나의 큰 문제가 남아있었습니다.

Nuxt3의 핵심 기능 중 하나인 **Auto Imports** — `useState`, `useFetch`, `useRouter` 같은 composable들을 import 없이 바로 사용하는 기능 — 가 Storybook 안에서는 전혀 동작하지 않았습니다.

```vue
<script setup>
// 서비스 코드에서는 import 없이 바로 사용
const counter = useState('counter', () => 0);
const { data } = useFetch('/api/users');
</script>
```

이 컴포넌트를 Storybook에 올리면 `useState is not defined` 에러가 발생합니다.
Storybook은 Nuxt 런타임이 아니기 때문입니다.

4번의 시도 끝에 결론을 냈습니다.

---

## 시도

### 시도 1 — `storybook-addon-nuxt` 도입

`storybook-addon-nuxt`는 Storybook에서 Nuxt 셋업을 도와주는 addon으로,
Nuxt의 Auto Imports와 `NuxtLink`를 지원한다고 문서에 명시되어 있었습니다.

이 addon이 Vite 기반으로 동작하기 때문에 기존 webpack5 번들러를 `@storybook/vue3-vite`로 교체해야 했습니다.

```ts
// .storybook/main.ts
const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite', // webpack5 → vite 전환
    options: {},
  },
  addons: [
    'storybook-addon-nuxt',
    // ...
  ],
};
```

**결과**: Storybook은 실행됐지만 화면이 완전히 비어있었습니다.
터미널에 에러 메시지도 없었고, 브라우저 콘솔에도 아무것도 출력되지 않았습니다.
완전한 무응답 상태로 디버깅 단서가 전혀 없어 포기했습니다.

---

### 시도 2 — `@storybook-vue/nuxt` 도입

`@storybook-vue/nuxt`는 Nuxt 공식 팀이 관리하는 Vite 기반 Storybook 프레임워크로,
Nuxt 기능의 대부분을 지원합니다.
개인 레포에서 단독으로 테스트했을 때는 에러 없이 잘 동작했습니다.

```ts
// .storybook/main.ts
const config: StorybookConfig = {
  framework: {
    name: '@storybook-vue/nuxt', // 프레임워크만 교체
    options: {},
  },
};
```

**결과**: 모노레포 환경에서 Storybook 실행 시 Node 프로세스가 메모리를 끝없이 소비하다 죽어버렸습니다.

```
FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
 1: 0xb7c6e0 node::Abort() [node]
 2: 0xa90908 node::FatalError(char const*, char const*) [node]
```

단독 레포에서는 완벽하게 동작하던 것이 pnpm 모노레포 환경에서는 실행조차 안 됐습니다.
`@storybook-vue/nuxt`가 모노레포 내의 Nuxt 프로젝트 전체를 탐색하는 과정에서
발생한 문제로 추정했지만, 확신하기도 어렵고 제어할 방법을 찾지 못했습니다.

---

### 시도 3 — Storybook tsconfig.json 경로 수정

Nuxt는 빌드 시 `.nuxt/` 폴더를 생성하며, 그 안에 TypeScript 설정과 Auto Imports 타입 선언이 포함됩니다.
Storybook의 TypeScript 인식을 이 파일로 돌리면 Auto Imports를 인식하지 않을까 생각했습니다.

```json
// AS-IS: .storybook/tsconfig.json
{}

// TO-BE
{
  "extends": "../packages/creators/.nuxt/tsconfig.json"
}
```

**결과**: 동작하지 않았습니다. TypeScript 타입 체크는 통과하더라도,
런타임에서 실제 composable 함수를 찾지 못하는 것은 tsconfig 문제가 아니었습니다.
타입 선언과 런타임 구현체는 별개였습니다.

---

### 시도 4 — `.nuxt` 폴더 직접 접근

`.nuxt` 폴더 안에는 `imports.d.ts`라는 파일이 있고, 그 안에 모든 Auto Import 함수들이 선언되어 있습니다.
webpack alias로 이 파일을 직접 참조하면 구현체까지 연결되지 않을까 시도했습니다.

```ts
// .storybook/main.ts
webpackFinal: async (config) => {
  // postinstall로 .nuxt 폴더를 Storybook 런타임에 먼저 생성
  execSync('pnpm run postinstall', { stdio: 'inherit' });

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve?.alias,
      '#imports': require.resolve('../packages/creators/.nuxt/imports.d.ts'),
      '#app':     require.resolve('../packages/creators/.nuxt/imports.d.ts'),
    },
  };
  return config;
},
```

**결과**: `imports.d.ts`는 타입 선언 파일이지 구현체가 아니었습니다.

```
📂 .nuxt
 ├── imports.d.ts    ← 타입 선언만 있음 (type, interface)
 ├── dist/           ← 실제 구현체가 여기 있지만...
 │    └── *.mjs      ← 번들링된 기계어 수준의 코드
 └── tsconfig.json
```

`.nuxt/dist/` 안에 실제 구현이 있었지만, 번들링된 코드라 특정 함수를 추출해 참조하는 것이
불가능에 가까웠습니다.

---

## 결론: 모노레포 루트 포기

4번의 시도를 통해 내린 결론은 하나였습니다.

**모노레포 루트의 `.storybook`에서 Nuxt Auto Imports를 연결하는 것은 현재 생태계에서 지원되지 않는다.**

루트에 `.storybook`을 두는 이점(설정 공유)보다, Nuxt 런타임 연동 문제를 해결하는 데 드는 비용이
훨씬 컸습니다. 결국 **각 패키지 내부에 `.storybook`을 두는 방식**으로 전환했습니다.

```
# AS-IS: 루트에 공유 설정
[root]/
  .storybook/
    main.ts
    preview.ts
  packages/
    creators/
    pc-sdk/

# TO-BE: 패키지 내부로 이동
[root]/
  packages/
    creators/
      .storybook/    ← 여기로
        main.ts
        preview.ts
```

패키지 내부에서 `@storybook-vue/nuxt`를 사용하면, Nuxt 컨텍스트 안에서 Storybook이 실행되어
Auto Imports가 자연스럽게 동작합니다.

```ts
// packages/creators/.storybook/main.ts
const config: StorybookConfig = {
  framework: {
    name: '@storybook-vue/nuxt', // 패키지 내부에서는 메모리 문제 없이 정상 동작
    options: {},
  },
  stories: ['./**/*.stories.@(js|jsx|mjs|ts|tsx)'],
};
```

한 가지 남은 이슈: `vue-docgen-plugin`이라는 플러그인이 Vite config에 자동 주입됐는데,
`find node_modules -type f -name "*vue-docgen-plugin*"`를 수행해도 아무런 출력이 없었습니다.
패키지가 존재하지 않는데 자동 주입되는 기묘한 상황이었고, 결국 수동으로 제거하는 방식으로 해결했습니다.

```ts
// packages/creators/.storybook/main.ts
viteFinal: async (config) => {
  // 패키지가 없는데 자동 주입되어 오류 발생 — 수동 제거
  const idx = config.plugins?.findIndex(
    (p: any) => p?.name === 'storybook:vue-docgen-plugin'
  );
  if (idx !== undefined && idx !== -1) {
    config.plugins?.splice(idx, 1);
  }
  return config;
},
```

---

## MR !91 — 마무리 설정

Auto Imports 문제가 해결된 후, Storybook 사용성을 높이기 위한 추가 설정을 진행했습니다.

**Viewport — stove-ui 브레이크포인트 연동**

서비스에서 사용하는 브레이크포인트를 Storybook Viewport에 그대로 가져와
stove-ui 기준으로 컴포넌트 반응형을 확인할 수 있게 했습니다.

```ts
// preview.ts
import { tailwindConfig } from '@stove-ui/vue/tailwind-config';

const screens = tailwindConfig.theme?.extend?.screens ?? {};
const viewports = Object.entries(screens).reduce((acc, [name, width]) => ({
  ...acc,
  [name]: { name, styles: { width: width as string, height: '100%' } },
}), {});

export const parameters = {
  viewport: { viewports },
};
```

**UserAgent toolbar**

모바일/PC 환경에 따라 다르게 동작하는 컴포넌트를 확인하기 위해
toolbar에서 UserAgent를 직접 전환할 수 있게 설정했습니다.

```ts
// preview.ts
export const globalTypes = {
  userAgent: {
    name: 'User Agent',
    toolbar: {
      items: [
        { value: 'desktop', title: 'Desktop' },
        { value: 'mobile',  title: 'Mobile'  },
      ],
    },
  },
};
```

---

## 결과

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| Auto Imports | `useState is not defined` | 정상 동작 |
| `.storybook` 위치 | 모노레포 루트 | 패키지 내부 |
| Storybook 프레임워크 | webpack5 | `@storybook-vue/nuxt` |
| Viewport | 기본값 | stove-ui 브레이크포인트 적용 |
| UserAgent | 고정 | toolbar에서 전환 가능 |

---

## 배운 점

**"잘 된다"와 "모노레포에서도 잘 된다"는 다른 말입니다.** 개인 레포에서 완벽하게 동작하던 `@storybook-vue/nuxt`가 pnpm 모노레포에서는 메모리 부족으로 실행조차 안 됐습니다. 새로운 도구를 도입할 때는 실제 환경 — 모노레포, 패키지 매니저, Node 버전 — 에서 먼저 검증해야 합니다.

**4번의 실패도 하나의 답입니다.** "모노레포 루트에서 Nuxt Auto Imports를 Storybook과 연결하는 것은 현재 생태계에서 지원되지 않는다" — 이것도 명확한 결론입니다. 더 시도하는 것보다 방향을 바꾸는 것이 맞는 순간이 있습니다. 삽질의 흔적을 MR 설명에 남겨두면, 이후에 같은 고민을 하는 사람이 같은 시도를 반복하지 않아도 됩니다.
