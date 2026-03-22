<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
import ChronicleEntry from '../components/ChronicleEntry.vue'
import SkillCard from '../components/SkillCard.vue'
import type { ChronicleEntry as ChronicleEntryType, Skill } from '../types/experience'

// ─── HERO ──────────────────────────────────────────────────────
const hero = {
  kicker:         'Core Identity',
  headlineMain:   'ARCHITECTING',
  headlineAccent: 'FLUID',
  headlineSuffix: 'EXPERIENCES.',
  subtext: 'I am a Frontend Architect driven by technical precision and the poetry of clean code. My approach blends systematic engineering principles with a relentless focus on high-performance, user-centric interfaces.',
  placeholderIcon: 'person',
}

// ─── CHRONICLE ─────────────────────────────────────────────────
const chronicle: ChronicleEntryType[] = [
  {
    period:       '2022 — PRESENT',
    periodMobile: '2022 — Present',
    side:         'left',
    title:        'Smilegate',
    role:         'Frontend Developer',
    desc:         'Architecting large-scale gaming platforms and refactoring complex legacy codebases into modern, user-centric web services. Focus on scalability and high-concurrency performance.',
    placeholderIcon: 'videogame_asset',
  },
  {
    period:       '2020 — EARLY 2021',
    periodMobile: '2020 — 2021',
    side:         'right',
    title:        'Hyundai Autoever',
    role:         'Frontend Developer',
    desc:         'Developed enterprise-grade automotive web solutions and corporate platforms, integrating real-time telemetry data into intuitive dashboard interfaces.',
    placeholderIcon: 'directions_car',
  },
  {
    period:          '2014 — 2020',
    side:            'left',
    title:           'University Education',
    role:            'B.S. Computer Science',
    desc:            'Mastering the foundational principles of engineering, data structures, and algorithmic efficiency. Focused on the intersection of human-computer interaction and systems design.',
    placeholderIcon:     'school',
    placeholderIconSize: '8rem',
  },
]

// ─── SKILLS ────────────────────────────────────────────────────
const toolkitSection = {
  kicker:  'Toolkit',
  heading: 'TECHNICAL',
  headingAccent: 'STACK.',
  subtext: 'A curated selection of technologies I leverage to build robust, scalable, and delightful frontend architectures.',
}

const skills: Skill[] = [
  { name: 'Javascript', tag: 'ES2023+',        pct: 95, iconUrl: 'https://skillicons.dev/icons?i=js' },
  { name: 'Typescript', tag: 'Strict Mode',    pct: 90, iconUrl: 'https://skillicons.dev/icons?i=ts' },
  { name: 'Vue 3',      tag: 'Composition',    pct: 92, iconUrl: 'https://skillicons.dev/icons?i=vue' },
  { name: 'Nuxt 3',     tag: 'SSR / Hybrid',   pct: 88, iconUrl: 'https://skillicons.dev/icons?i=nuxt' },
  { name: 'Storybook',  tag: 'Design Systems', pct: 85, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg' },
  { name: 'Vitest',     tag: 'Unit Testing',   pct: 82, iconUrl: 'https://skillicons.dev/icons?i=vitest' },
]
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface">
    <AppNav />

    <!-- ═══ HERO / PROFESSIONAL NARRATIVE ═══ -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">

        <!-- Left: Text -->
        <div class="md:col-span-8">
          <span class="font-mono text-tertiary text-sm tracking-widest uppercase block mb-4">{{ hero.kicker }}</span>
          <h1 class="font-sans text-4xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            {{ hero.headlineMain }} <span class="text-primary">{{ hero.headlineAccent }}</span> {{ hero.headlineSuffix }}
          </h1>
          <p class="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed max-w-3xl">
            {{ hero.subtext }}
          </p>
        </div>

        <!-- Right: Portrait -->
        <div class="md:col-span-4 flex justify-end">
          <div class="w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden relative group">
            <div class="w-full h-full flex items-center justify-center bg-surface-container-low">
              <span class="material-symbols-outlined text-outline-variant/30" style="font-size: 8rem;">{{ hero.placeholderIcon }}</span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CHRONICLE ═══ -->
    <section class="bg-surface-container-lowest py-24 mb-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <div class="flex items-center gap-4 mb-16">
          <span class="font-mono text-tertiary text-sm tracking-widest uppercase">Chronicle</span>
          <div class="h-px flex-1 bg-outline-variant/20"></div>
        </div>

        <div class="relative">
          <!-- Central spine (desktop only) -->
          <div class="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 -translate-x-1/2 hidden md:block"></div>

          <div class="space-y-24">
            <ChronicleEntry
              v-for="entry in chronicle"
              :key="entry.title"
              :entry="entry"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TECHNICAL EXPERTISE / TOOLKIT ═══ -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 mb-28">

      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span class="font-mono text-tertiary text-sm tracking-widest uppercase block mb-4">{{ toolkitSection.kicker }}</span>
          <h2 class="font-sans text-4xl md:text-5xl font-black tracking-tighter">
            {{ toolkitSection.heading }} <span class="text-primary">{{ toolkitSection.headingAccent }}</span>
          </h2>
        </div>
        <div class="max-w-md">
          <p class="text-on-surface-variant">{{ toolkitSection.subtext }}</p>
        </div>
      </div>

      <!-- Desktop: 3-col grid / Mobile: single col — 둘 다 같은 컴포넌트, 내부에서 분기 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkillCard
          v-for="skill in skills"
          :key="skill.name"
          :skill="skill"
        />
      </div>
    </section>

    <AppFooter />
  </div>
</template>
