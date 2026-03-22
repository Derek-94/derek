<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
import ProjectCard from '../components/ProjectCard.vue'
import type { Project } from '../types/project'

const projects: Project[] = [
  {
    id: 1,
    title: 'my-profile',
    tag: 'Data Visualization',
    year: '2026',
    category: 'new-build',
    stack: ['React', 'Tailwind', 'D3.js'],
    desc: 'Interactive data visualization dashboard with custom D3 rendering pipeline. Reduced unnecessary re-renders by 40% through virtualization and memoization strategies.',
    metric: '↓ 40% re-renders',
    cta: 'View Technical Breakdown',
    ctaIcon: 'arrow_right_alt',
    size: 'large',
  },
  {
    id: 2,
    title: 'creators site',
    tag: 'Performance',
    year: '2025',
    category: 'refactor',
    stack: ['Next.js', 'TypeScript'],
    desc: 'Domain migration and performance overhaul supporting 50,000+ dynamic routes. Implemented ISR and edge caching to achieve sub-100ms TTFB globally.',
    metric: '50,000+ dynamic routes',
    cta: 'View Live',
    ctaIcon: 'open_in_new',
    size: 'normal',
  },
  {
    id: 3,
    title: 'js-bridge Renewal',
    tag: 'Systems',
    year: '2026',
    category: 'refactor',
    stack: ['Node.js', 'PostgreSQL', 'TypeScript'],
    desc: 'Legacy system migration replacing a brittle native-JS bridge. Reduced cross-layer latency by 65% through batched IPC and a custom serialization protocol.',
    metric: '↓ 65% latency',
    cta: 'Explore Source',
    ctaIcon: 'code',
    size: 'normal',
  },
  {
    id: 4,
    title: 'Atmospheric UI Engine',
    tag: 'Architecture',
    year: '2024',
    category: 'new-build',
    stack: ['React', 'WebGL', 'Motion'],
    desc: 'Physics-based animation engine for high-fidelity portfolio interfaces. Non-linear spring interpolation with GPU-accelerated compositing layer.',
    metric: '60fps guaranteed',
    cta: 'Explore Source',
    ctaIcon: 'arrow_right_alt',
    size: 'large',
  },
]

const challenges = [
  {
    icon: 'construction',
    title: 'Legacy Codebase Refactoring',
    desc: 'Systematic approach to modernizing brittle systems — dependency graph analysis, incremental migration, and zero-downtime cutover strategies.',
    tags: ['TypeScript', 'Architecture', 'CI/CD'],
  },
  {
    icon: 'public',
    title: 'Global Domain Migration Orchestration',
    desc: 'Coordinating DNS cutover, CDN re-configuration, and database replication across multi-region infrastructure with rollback contingencies.',
    tags: ['DevOps', 'Next.js', 'Edge'],
  },
]
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface">
    <AppNav />

    <!-- ─── HERO ───────────────────────────────────────────────── -->
    <section class="pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <span class="font-mono text-tertiary text-sm tracking-widest uppercase mb-4 block">Selected Artifacts</span>
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h1 class="font-sans text-4xl md:text-8xl font-black tracking-tighter text-on-surface">
            Featured<br />Projects
          </h1>
          <p class="text-on-surface-variant text-base leading-relaxed max-w-md lg:text-right">
            High-performance engineering challenges focused on scalability,
            precise UI execution, and modern architectural patterns.
          </p>
        </div>
      </div>
    </section>

    <!-- ─── PROJECT GRID ───────────────────────────────────────── -->
    <section class="pb-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
          />
        </div>
      </div>
    </section>

    <!-- ─── ENGINEERING CHALLENGES ─────────────────────────────── -->
    <section class="py-section bg-surface-container-low">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <div class="mb-12">
          <span class="font-mono text-tertiary text-sm tracking-widest uppercase mb-4 block">Deep Dives</span>
          <h2 class="font-sans text-4xl lg:text-5xl font-black tracking-tighter text-on-surface">
            Engineering Challenges
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="(c, i) in challenges"
            :key="i"
            class="bg-surface-container-high rounded-2xl p-6 lg:p-8 hover:bg-surface-container-highest transition-colors"
          >
            <span class="material-symbols-outlined text-tertiary text-3xl mb-5 block">{{ c.icon }}</span>
            <h3 class="font-sans text-xl font-semibold text-on-surface tracking-tight mb-3">{{ c.title }}</h3>
            <p class="text-on-surface-variant text-sm leading-relaxed mb-5">{{ c.desc }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="t in c.tags"
                :key="t"
                class="bg-surface-container-lowest font-mono text-tertiary text-xs px-2.5 py-1 rounded"
              >{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── CTA ────────────────────────────────────────────────── -->
    <section class="py-section">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <span class="font-mono text-tertiary text-sm tracking-widest uppercase mb-4 block">What's next</span>
        <h2 class="font-sans text-4xl lg:text-5xl font-black tracking-tighter text-on-surface mb-6">
          Want the full picture?
        </h2>
        <p class="text-on-surface-variant leading-relaxed mb-10 max-w-md mx-auto">
          Check the logbook for in-depth case studies and technical breakdowns.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <RouterLink
            to="/logbook"
            class="bg-gradient-primary text-on-primary font-medium px-8 py-3.5 rounded-md flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            Open Logbook
            <span class="material-symbols-outlined text-lg">menu_book</span>
          </RouterLink>
          <RouterLink
            to="/experience"
            class="ghost-border text-primary font-medium px-8 py-3.5 rounded-md flex items-center gap-2 hover:bg-surface-container-high transition-colors"
          >
            View Experience
            <span class="material-symbols-outlined text-lg">person</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
