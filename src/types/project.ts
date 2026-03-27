/**
 * 프로젝트 카테고리
 * - new-build  : 신규 서비스 구축
 * - refactor   : 기존 시스템 리팩토링 / 마이그레이션
 * - design     : 디자인 개편 / UI 오버홀
 */
export type ProjectCategory = 'new-build' | 'refactor' | 'design'

export interface Project {
  id: number
  title: string
  tag: string
  year: string
  category: ProjectCategory
  stack: string[]
  desc: string
  metric: string
  cta: string
  ctaIcon: string
  /**
   * 그리드에서 카드의 시각적 크기
   * - `'large'`  : md:col-span-2 (2열 차지), thumbnail h-52 lg:h-64
   * - `'normal'` : 1열 차지,               thumbnail h-44 lg:h-52
   */
  size: 'large' | 'normal'
  /** public/thumbnails/ 경로의 이미지. 없으면 그라디언트 placeholder */
  thumbnail?: string
  /** CTA 버튼 클릭 시 이동할 URL */
  ctaUrl?: string
}
