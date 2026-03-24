# 모노레포에 Storybook 세팅하기 — PostCSS, Tailwind, 사내 디자인 시스템까지

> **작업 기간**: 2025년 2월
>
> **기술 스택**: Storybook, Vue 3, Tailwind CSS, PostCSS, stove-ui

---

## 배경

신규 프로젝트 `social-showcase`는 `creator-center`와 `pc-sdk` 두 패키지를 가진 pnpm 모노레포 구조였습니다.
컴포넌트 개발 환경으로 Storybook을 도입하기로 했고, 두 패키지가 같은 `.storybook` 설정을 공유할 수 있도록 루트에 설정 파일을 두는 방향으로 시작했습니다.

간단할 것 같았던 세팅에서 두 가지 큰 문제가 기다리고 있었습니다.

---

## 문제

### 1. Storybook에서 Tailwind가 적용되지 않음

로컬 개발 서버(`pnpm serve`)에서는 Tailwind CSS가 정상 동작했지만, Storybook을 실행하면 모든 Tailwind 스타일이 사라졌습니다.

원인은 Storybook이 웹앱과 **완전히 독립된 빌드 환경**으로 실행된다는 데 있었습니다.

Nuxt나 Vite 기반 웹앱은 PostCSS를 내장하고 있어 `tailwindcss`를 PostCSS 플러그인으로 자동 인식합니다.
그러나 Storybook은 자체 빌드 파이프라인을 가지고 있어, PostCSS를 명시적으로 연결하지 않으면 Tailwind를 전혀 처리하지 않습니다.

```
# 요약:
웹앱 (Nuxt/Vite) → PostCSS 내장 → tailwindcss 자동 처리  ✅
Storybook         → 독립 빌드   → PostCSS 별도 연결 필요  ❌
```

### 2. postcss.config.js 플러그인 이름 오류

PostCSS 설정을 추가하는 과정에서 예상치 못한 오류가 발생했습니다.

```js
// 기존 레퍼런스(indie-mc-components) 방식을 그대로 적용
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

```
Error: It looks like you're trying to use tailwindcss directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package,
so to continue using Tailwind CSS with PostCSS you'll need to install
@tailwindcss/postcss and update your PostCSS configuration.
```

Tailwind CSS v4부터 PostCSS 플러그인이 `@tailwindcss/postcss`라는 별도 패키지로 분리된 것이 원인이었습니다.
기존 레퍼런스가 v3 기준으로 작성되어 있어 그대로 따라가면 오류가 발생하는 상황이었고,
`@tailwindcss/postcss`로 바꾸면 이번엔 v4 방식 전반으로의 마이그레이션이 필요해 범위가 너무 커졌습니다.

---

## 해결

### PostCSS 연결 + Tailwind v3으로 버전 고정

Storybook에 Tailwind를 적용하기 위해 `@storybook/addon-postcss`를 도입했습니다.

```js
// .storybook/main.js
const config = {
  stories: ['../packages/creator-center/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          // addon-postcss 내부에 postcss 7 peer dep이 있어
          // 현재 사용 중인 8 버전 구현체를 명시적으로 지정
          implementation: require('postcss'),
        },
      },
    },
  ],
};
```

`@storybook/addon-postcss`가 내부적으로 PostCSS 7을 peer dependency로 요구하는 이슈가 있어서,
`postcssLoaderOptions`에 PostCSS 8 구현체를 명시적으로 지정해야 했습니다.

`@tailwindcss/postcss` 방식은 v4 전반으로의 마이그레이션을 요구해 범위를 벗어났기 때문에,
**Tailwind v3으로 버전을 고정하고 기존 방식을 유지**하는 것으로 결정했습니다.

```js
// postcss.config.js — v3 방식으로 유지
module.exports = {
  plugins: {
    tailwindcss: {},   // v3에서는 이 방식이 정상 동작
    autoprefixer: {},
  },
};
```

`.storybook` 폴더는 루트에 배치해 두 패키지가 공유하도록 하고,
각 패키지의 `package.json`에서 `-c` 옵션으로 루트 설정을 참조하게 했습니다.

```json
// packages/creator-center/package.json
{
  "scripts": {
    "storybook": "storybook dev -p 6006 -c ../../.storybook"
  }
}
```

### 사내 디자인 시스템 stove-ui 연동

Storybook에서 사내 디자인 시스템 `stove-ui`를 사용하기 위한 추가 세팅이 필요했습니다.

**1. private registry 등록**

`stove-ui`는 사내 npm 레지스트리에 배포되어 있어 `.npmrc`에 레지스트리를 추가해야 설치할 수 있습니다.

```ini
# .npmrc
@stove-ui:registry=https://registry.sginfra.net
```

**2. tailwindConfig 상속**

`stove-ui`는 자체 Tailwind 설정(`tailwindConfig`)을 제공합니다.
이를 상속받아 쓰지 않으면 stove-ui 컴포넌트에 정의된 색상, 폰트, 간격 토큰이 Tailwind purge로 모두 제거됩니다.

```js
// tailwind.config.js
import { tailwindConfig } from '@stove-ui/vue/tailwind-config';

export default {
  ...tailwindConfig, // stove-ui 기본 설정 상속
  plugins: [...tailwindConfig.plugins, require('@tailwindcss/typography')],
  content: [
    './app/layouts/**/*.{html,css,vue,js,ts,jsx,tsx,mdx}',
    // ...
    // stove-ui 빌드 산출물도 포함해야 토큰 purge 방지
    './node_modules/@stove-ui/vue/dist/**/*.mjs',
    '../../.storybook/**/*.{html,css,vue,js,ts,jsx,tsx,mdx}',
  ],
};
```

**3. Vue 플러그인 등록**

Storybook은 Vue 앱이 아니기 때문에 `stove-ui`를 플러그인으로 별도 등록해야 합니다.
Storybook의 `setup` 함수를 활용해 Vue 앱에 플러그인을 주입했습니다.

```ts
// .storybook/preview.ts
import { setup } from '@storybook/vue3';
import StoveUI from '@stove-ui/vue';
import '@stove-ui/vue/dist/style.css';

setup((app) => {
  app.use(StoveUI);
});
```

---

## 결과

| 항목 | 세팅 전 | 세팅 후 |
|------|---------|---------|
| Tailwind 스타일 | Storybook에서 미적용 | 정상 적용 |
| stove-ui 컴포넌트 | 사용 불가 | 정상 렌더링 |
| 설정 공유 | — | 루트 `.storybook`으로 두 패키지 공유 |
| Tailwind 버전 | v4 시도 후 오류 | v3 고정 (호환성 확보) |

---

## 배운 점

**Storybook이 독립 빌드 환경이라는 사실을 체감했습니다.** 웹앱에서 당연하게 되던 것들 — PostCSS 처리, Vue 플러그인, 디자인 시스템 토큰 — 을 Storybook에서는 하나하나 명시적으로 연결해야 합니다.

**레퍼런스 코드에는 버전 맥락이 있습니다.** 기존 코드를 참조할 때 Tailwind v3 방식을 v4 환경에서 그대로 쓰다가 오류를 만났습니다. 빠르게 변하는 생태계에서는 레퍼런스 코드의 작성 시점과 버전을 함께 확인하는 것이 중요합니다.
