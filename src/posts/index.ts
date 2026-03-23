export interface PostMeta {
  slug: string
  title: string
  date: string
  mrs: string[]
  techStack: string[]
  desc: string
}

export const posts: PostMeta[] = [
  {
    slug: 'game-terms-init-refactor',
    title: '게임 약관 초기화 로직 리팩토링',
    date: '2025년 11월',
    mrs: ['!427', '!447', '!458'],
    techStack: ['TypeScript', 'RxJS', 'Angular'],
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
]
