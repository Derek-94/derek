// ── Plain (2026, 2022) ────────────────────────────────────────
export interface LogPlainEntry {
  type: 'plain'
  year: string
  /** content 가 왼쪽이면 'left', 오른쪽이면 'right' */
  side: 'left' | 'right'
  /** true면 연도 숫자 컬럼을 렌더링하지 않음 (같은 year 엔트리가 연속될 때 사용) */
  hideYear?: boolean
  icon: string
  label: string
  title: string
  desc: string
  /** git 커밋 배지 (선택) */
  commit?: { icon: string; text: string }
  /** 태그 배지 목록 (선택) */
  tags?: string[]
  /** desc 아래에 렌더링할 포스트 카드 목록 (선택) */
  cards?: LogGridCard[]
}

// ── Progress (2025) ───────────────────────────────────────────
export interface LogProgressEntry {
  type: 'progress'
  year: string
  side: 'left' | 'right'
  /** true면 연도 숫자 컬럼을 렌더링하지 않음 (같은 year 엔트리가 연속될 때 사용) */
  hideYear?: boolean
  icon: string
  label: string
  title: string
  desc: string
  /**
   * 진행률 카드
   * - value: 0–100 (%)
   */
  progress: {
    icon: string
    label: string
    value: number
  }
}

// ── Grid (2024) ───────────────────────────────────────────────
export interface LogGridCard {
  category: string
  title: string
  desc: string
  /** 포스트 slug — 있으면 클릭 가능한 링크 카드로 렌더링 */
  slug?: string
}

export interface LogGridEntry {
  type: 'grid'
  year: string
  side: 'left' | 'right'
  /** true면 연도 숫자 컬럼을 렌더링하지 않음 */
  hideYear?: boolean
  cards: LogGridCard[]
}

// ── List (2023) ───────────────────────────────────────────────
export interface LogListItem {
  label: string
  title: string
  desc: string
  /**
   * true → border-primary/50 + bg-primary/5 하이라이트 스타일
   */
  highlight?: boolean
  /**
   * highlight 항목에 표시할 터미널 스니펫 (선택)
   */
  terminal?: { comment: string; command: string }
}

export interface LogListEntry {
  type: 'list'
  year: string
  side: 'left' | 'right'
  items: LogListItem[]
}

// ── Discriminated union ────────────────────────────────────────
export type LogEntry = LogPlainEntry | LogProgressEntry | LogGridEntry | LogListEntry
