<script setup lang="ts">
import { computed, defineAsyncComponent, shallowRef, watch, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
import { posts } from '../posts/index'

const route = useRoute()
const router = useRouter()

const slug = computed(() => route.params.slug as string)
const postMeta = computed(() => posts.find(p => p.slug === slug.value))

const modules = import.meta.glob('../posts/*.md')
const PostContent = shallowRef<Component | null>(null)

watch(slug, (s) => {
  const key = `../posts/${s}.md`
  if (!modules[key]) {
    router.replace({ name: 'logbook' })
    return
  }
  PostContent.value = defineAsyncComponent(
    () => modules[key]() as Promise<{ default: Component }>
  )
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface font-sans">
    <AppNav />

    <main class="pt-32 pb-24 px-6 max-w-4xl mx-auto">

      <!-- 뒤로 버튼 -->
      <RouterLink
        to="/logbook"
        class="inline-flex items-center gap-2 font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-16 hover:text-primary transition-colors group"
      >
        <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        Logbook
      </RouterLink>

      <!-- 포스트 헤더 -->
      <header v-if="postMeta" class="mb-20">
        <span class="font-mono text-tertiary text-xs tracking-widest uppercase mb-4 block">Engineering Log</span>
        <h1 class="font-sans font-black tracking-tighter text-4xl md:text-6xl leading-none mb-10">
          {{ postMeta.title }}
        </h1>
        <div class="flex flex-wrap items-center gap-3">
          <span
            v-for="mr in postMeta.mrs"
            :key="mr"
            class="font-mono text-xs bg-surface-container-high border border-outline-variant/20 px-3 py-1.5 rounded text-tertiary"
          >{{ mr }}</span>
          <span class="font-mono text-xs text-on-surface-variant/50 px-1">{{ postMeta.date }}</span>
          <span
            v-for="tech in postMeta.techStack"
            :key="tech"
            class="font-mono text-xs bg-surface-container border border-outline-variant/20 px-3 py-1.5 rounded text-on-surface-variant uppercase"
          >{{ tech }}</span>
        </div>
      </header>

      <!-- MD 렌더링 영역 -->
      <div class="post-content">
        <component :is="PostContent" />
      </div>

    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* MD 파일의 h1 (제목)은 헤더에서 대신 표시하므로 숨김 */
.post-content :deep(h1) {
  display: none;
}

.post-content :deep(h2) {
  font-family: 'Inter', ui-sans-serif, system-ui;
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  color: #e5e2e1;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(70, 69, 84, 0.3);
}

.post-content :deep(h3) {
  font-family: 'Inter', ui-sans-serif, system-ui;
  font-weight: 900;
  letter-spacing: -0.02em;
  font-size: 1.25rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #e5e2e1;
}

.post-content :deep(p) {
  color: #c7c4d7;
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

.post-content :deep(strong) {
  color: #e5e2e1;
  font-weight: 700;
}

/* 코드 블록 */
.post-content :deep(pre) {
  background: #282a36;
  border: 1px solid rgba(98, 114, 164, 0.25);
  border-radius: 0.5rem;
  padding: 1.5rem;
  overflow-x: auto;
  margin-bottom: 2rem;
}

.post-content :deep(pre code) {
  font-family: 'Space Grotesk', ui-monospace, monospace;
  font-size: 0.8125rem;
  color: #f8f8f2;
  background: transparent;
  padding: 0;
  border-radius: 0;
}

/* 인라인 코드 */
.post-content :deep(code) {
  font-family: 'Space Grotesk', ui-monospace, monospace;
  font-size: 0.8125rem;
  color: #4cd7f6;
  background: #2a2a2a;
  padding: 0.15em 0.4em;
  border-radius: 0.25rem;
}

/* 블록쿼트 (파일 상단 메타데이터) */
.post-content :deep(blockquote) {
  background: #1c1b1b;
  border-left: 2px solid rgba(192, 193, 255, 0.3);
  border-radius: 0 0.375rem 0.375rem 0;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
}

.post-content :deep(blockquote p) {
  color: #c7c4d7;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  line-height: 1.6;
}

.post-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

/* 구분선 */
.post-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(70, 69, 84, 0.25);
  margin: 3rem 0;
}

/* 테이블 */
.post-content :deep(table) {
  width: 100%;
  margin-bottom: 2rem;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.post-content :deep(th) {
  font-family: 'Space Grotesk', ui-monospace, monospace;
  font-size: 0.6875rem;
  color: #c7c4d7;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 1px solid rgba(70, 69, 84, 0.3);
  text-align: left;
  font-weight: 600;
}

.post-content :deep(td) {
  padding: 0.75rem 1rem 0.75rem 0;
  border-bottom: 1px solid rgba(70, 69, 84, 0.12);
  color: #c7c4d7;
  vertical-align: top;
}

.post-content :deep(td code),
.post-content :deep(th code) {
  font-family: 'Space Grotesk', ui-monospace, monospace;
  font-size: 0.75rem;
  color: #4cd7f6;
  background: #2a2a2a;
  padding: 0.1em 0.35em;
  border-radius: 0.2rem;
}

/* 리스트 */
.post-content :deep(ul),
.post-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
  color: #c7c4d7;
}

.post-content :deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.7;
}

/* ── Syntax Highlighting — Dracula Theme ──────────────────── */
/* keywords: const, let, var, function, return, class, if, else, import, export, type, interface */
.post-content :deep(.hljs-keyword),
.post-content :deep(.hljs-operator) {
  color: #ff79c6;
}

/* TypeScript 타입명, 내장 식별자 */
.post-content :deep(.hljs-type),
.post-content :deep(.hljs-built_in),
.post-content :deep(.hljs-title.class_) {
  color: #8be9fd;
}

/* 함수명 */
.post-content :deep(.hljs-title.function_) {
  color: #50fa7b;
}

/* 문자열 */
.post-content :deep(.hljs-string) {
  color: #f1fa8c;
}

/* 숫자 */
.post-content :deep(.hljs-number) {
  color: #bd93f9;
}

/* 주석 */
.post-content :deep(.hljs-comment) {
  color: #6272a4;
  font-style: italic;
}

/* 파라미터 */
.post-content :deep(.hljs-params) {
  color: #ffb86c;
}

/* 속성명, 변수 */
.post-content :deep(.hljs-attr),
.post-content :deep(.hljs-variable) {
  color: #f8f8f2;
}

/* 구두점 */
.post-content :deep(.hljs-punctuation) {
  color: #f8f8f2;
}
</style>
