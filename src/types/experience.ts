export interface ChronicleEntry {
  /** 데스크탑 기간 텍스트 (텍스트 컬럼 안에 표시) */
  period: string
  /** 모바일 기간 텍스트. 생략하면 period 와 동일하게 표시 */
  periodMobile?: string
  /** 텍스트가 위치하는 쪽 */
  side: 'left' | 'right'
  title: string
  role: string
  desc: string
  /** Material Symbols 아이콘 이름 (이미지 플레이스홀더) */
  placeholderIcon: string
  /** 플레이스홀더 아이콘 크기. 기본값: '5rem' */
  placeholderIconSize?: string
}

export interface Skill {
  name: string
  tag: string
  pct: number
  iconUrl: string
}
