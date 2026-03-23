# Design System: The Kinetic Architect

## 1. Overview & Creative North Star
The "Kinetic Architect" treats the browser as a high-end editorial canvas where code is high art. Blending debugger precision with boutique design agency sophistication. Prioritize **Atmospheric Depth** over flat UI.

Intentional asymmetry: code snippets (Monospace) may "bleed" off the grid, while large-scale headings (Sans-Serif) anchor the eye.

## 2. Colors & Surface Philosophy

**The "No-Line" Rule:** 1px solid borders are PROHIBITED for sectioning. Define boundaries via tonal shifts only.

**Surface Hierarchy:**
- Level 0 (Background): `surface` (#131313)
- Level 1 (Sub-sections): `surface_container_low` (#1c1b1b)
- Level 2 (Active Elements): `surface_container_high` (#2a2a2a)

**Glass & Gradient Rule:** Floating nav = `secondary_container` at 40% opacity + `backdrop-blur: 20px`.

**Signature Textures:** Primary CTAs use linear-gradient from `primary` (#c0c1ff) to `primary_container` (#8083ff) at 135deg.

## 3. Typography: Editorial Precision

**The Narrative (Inter / `font-sans`):**
- Headlines: `font-sans font-black tracking-tighter` (letter-spacing: -0.02em)
- Large display sizes: `text-6xl md:text-8xl` or `text-5xl md:text-7xl`

**The Logic (Space Grotesk / `font-mono`):**
- Labels and technical metadata: all caps, `text-tertiary` (#4cd7f6), `tracking-widest`
- Pattern: `font-mono text-tertiary text-xs tracking-widest uppercase`

**Visual Hierarchy Pattern:**
```
<span class="font-mono text-tertiary text-xs tracking-widest uppercase mb-4 block">Kicker Label</span>
<h1 class="font-sans font-black tracking-tighter ...">HEADLINE</h1>
```

## 4. Elevation & Depth

No drop shadows. Use **Tonal Layering** and **Ambient Glows** only.

- Lift a card: transition bg from `surface_container_low` to `surface_container_highest`
- Floating hover state: `box-shadow: 0 0 32px rgba(192,193,255,0.06)` (primary tint at 6%)
- **Ghost Border Fallback:** `outline_variant` (#464554) at 20% opacity — feels like a suggestion

## 5. Components

### Buttons
- **Primary:** `bg-gradient-primary text-on-primary rounded-md` — no border
- **Secondary:** transparent bg, ghost border, `text-primary`

### Project Timeline (Signature Component)
- **Spine:** `w-px bg-outline-variant/30`
- **Node:** `bg-tertiary rounded-full shadow-[0_0_15px_rgba(76,215,246,0.4)]`
- **Content:** Staggered left/right asymmetrically

## 6. Do's and Don'ts

### Do:
- `mb-28` or `py-24` spacing between major sections (≈7rem)
- Use `tertiary` (#4cd7f6) ONLY for code, terminal labels, "live" indicators
- Tonal shifts to define section boundaries

### Don't:
- **DON'T** use `border-l-4` or any solid line borders for visual sectioning
- **DON'T** use `font-bold tracking-tight` for headlines — must be `font-black tracking-tighter`
- **DON'T** use undefined utility classes like `font-headline` or `font-label`
- **DON'T** use pure black (#000) or pure white (#FFF)
- **DON'T** use heavy shadows

---

## 7. Next Task: Logbook 상세 페이지 구현

### 배경
GitLab 사내망에서만 접근 가능한 MR 작업 이력을 포트폴리오로 공개하기 위해,
Logbook에 MD 기반 상세 페이지를 추가한다.

### 결정 사항
- MD 파일 위치: `src/posts/*.md`
- 라우트: `/logbook/:slug`
- 렌더링 방식: `vite-plugin-md` 사용 (`.md` → Vue 컴포넌트로 import)
- UX: 팝업 X, 별도 상세 페이지 O

### 구현 체크리스트
- [ ] `vite-plugin-md` 설치 및 `vite.config.ts` 설정
- [ ] `src/router/index.ts` 에 `/logbook/:slug` 라우트 추가
- [ ] `src/views/LogbookDetailView.vue` 생성 (위 디자인 시스템 준수)
- [ ] `src/views/LogbookView.vue` 카드에 상세 페이지 링크 연결
- [ ] (선택) `src/posts/index.ts` 로 포스트 메타데이터 관리

### 현재 포스트
- `src/posts/game-terms-init-refactor.md`
  - 내용: 게임 약관 초기화 로직 리팩토링 (Orchestrator Pattern + Strategy Pattern)
  - MR !427: 416줄 단일 함수 → Context Pattern + 4개 Service 분리
  - MR !447: 200줄 switch-case → Strategy + Factory Pattern으로 분리
  - MR !458: Factory Eager → Lazy Initialization + Singleton 개선
