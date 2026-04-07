export interface PostMeta {
  slug: string
  title: string
  date: string
  mrs?: string[]
  techStack: string[]
  desc: string
}

export const posts: PostMeta[] = [
  {
    slug: 'js-bridge-dx-improvement',
    title: 'DX를 설계한다 — BridgeLogger와 전역 디버그 객체',
    date: '2026년 4월',
    techStack: ['TypeScript', 'WebView2', 'Android WebView', 'iOS WKWebView'],
    desc: '기능 완성 이후 웹-네이티브 디버깅 환경을 설계한 과정. BridgeLogger로 콘솔에서 요청/응답 흐름을 추적하고, simulateCallback으로 팀 간 책임 경계를 즉시 검증할 수 있게 한 전역 디버그 객체.',
  },
  {
    slug: 'js-bridge-platform-integration',
    title: '3개 플랫폼, 1개 API — 브릿지 통신 방식 설계',
    date: '2026년 4월',
    techStack: ['TypeScript', 'WebView2', 'Android WebView', 'iOS WKWebView'],
    desc: 'PCSDK·AOS·IOS의 서로 다른 통신 방식(postMessage/invoke/messageHandlers)을 AbstractJSBridge로 추상화하고, Self-registration 패턴으로 플랫폼을 확장 가능하게 설계한 과정.',
  },
  {
    slug: 'js-bridge-sdk-design',
    title: '6개 디자인 패턴으로 멀티플랫폼 TypeScript SDK 설계하기',
    date: '2026년 4월',
    techStack: ['TypeScript', 'WebView2', 'Android WebView', 'iOS WKWebView'],
    desc: 'Facade·Builder·Bridge·Strategy·Adapter·Registry 6개 패턴을 조합해 멀티플랫폼 브릿지 SDK를 설계한 과정. requestId 기반 pending Map으로 비동기 요청-응답을 매칭하는 AbstractJSBridge 메커니즘 포함.',
  },
  {
    slug: 'kafun-no-kokyuu',
    title: '花粉の呼吸 — 꽃가루 + 날씨 코디 추천 앱',
    date: '2026년 3월',
    techStack: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Open-Meteo', 'Google Pollen API'],
    desc: '일본 꽃가루 시즌에 착안해 꽃가루 레벨과 기온을 조합한 코디 추천 모바일 웹앱. Google Pollen API · Open-Meteo 연동, 47도도부현 위치 선택기, 동적 OG 이미지까지.',
  },
  {
    slug: 'game-terms-init-refactor',
    title: '게임 약관 초기화 로직 리팩토링',
    date: '2025년 11월',
    techStack: ['TypeScript', 'RxJS', 'Vue'],
    desc: '416줄 단일 함수를 Orchestrator + 4 Services로 분리하고, 200줄 switch-case를 Strategy + Factory Pattern으로 개선한 리팩토링.',
  },
  {
    slug: 'renewal-simplify-routing-refactor',
    title: '라우팅 로직 리팩토링: 순수 함수 분리',
    date: '2025년 11월',
    mrs: ['!461'],
    techStack: ['TypeScript', 'Vue Router'],
    desc: '108줄 if-else 라우팅 로직을 조건/데이터/콜백으로 분리하여 26줄의 선언적 코드로 개선.',
  },
  {
    slug: 'storybook-monorepo-setup',
    title: '모노레포에 Storybook 세팅하기',
    date: '2025년 2월',
    mrs: ['!23', '!28'],
    techStack: ['Storybook', 'Vue 3', 'Tailwind CSS', 'PostCSS', 'stove-ui'],
    desc: '모노레포 루트에 Storybook을 세팅하며 겪은 PostCSS 독립 환경 문제, Tailwind v3 버전 고정, 사내 디자인 시스템 연동까지.',
  },
  {
    slug: 'storybook-nuxt-auto-imports',
    title: 'Nuxt3 Auto Imports를 Storybook에서 — 4번의 시도와 결론',
    date: '2025년 3월',
    mrs: ['!86', '!91'],
    techStack: ['Nuxt 3', 'Storybook', 'TypeScript'],
    desc: 'Nuxt Auto Imports를 Storybook에서 사용하기 위한 4가지 접근 시도와 실패, 그리고 모노레포 루트 설정을 포기하게 된 결론.',
  },
]
