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
