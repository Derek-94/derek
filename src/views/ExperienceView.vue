<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'

const skills = [
  { name: 'Javascript', tag: 'ES2023+', pct: 95, iconUrl: 'https://skillicons.dev/icons?i=js' },
  { name: 'Typescript', tag: 'Strict Mode', pct: 90, iconUrl: 'https://skillicons.dev/icons?i=ts' },
  { name: 'Vue 3', tag: 'Composition', pct: 92, iconUrl: 'https://skillicons.dev/icons?i=vue' },
  { name: 'Nuxt 3', tag: 'SSR / Hybrid', pct: 88, iconUrl: 'https://skillicons.dev/icons?i=nuxt' },
  { name: 'Storybook', tag: 'Design Systems', pct: 85, iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg' },
  { name: 'Vitest', tag: 'Unit Testing', pct: 82, iconUrl: 'https://skillicons.dev/icons?i=vitest' },
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
          <span class="font-mono text-tertiary text-sm tracking-[0.2em] uppercase block mb-4">Core Identity</span>
          <h1 class="font-sans text-4xl md:text-8xl font-black tracking-tighter leading-none mb-8">
            ARCHITECTING <span class="text-primary">FLUID</span> EXPERIENCES.
          </h1>
          <p class="text-xl md:text-2xl text-on-surface-variant font-light leading-relaxed max-w-3xl">
            I am a Frontend Architect driven by technical precision and the poetry of clean code. My approach blends systematic engineering principles with a relentless focus on high-performance, user-centric interfaces.
          </p>
        </div>

        <!-- Right: Portrait -->
        <div class="md:col-span-4 flex justify-end">
          <div class="w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden relative group">
            <!-- Portrait placeholder -->
            <div class="w-full h-full flex items-center justify-center bg-surface-container-low">
              <span class="material-symbols-outlined text-outline-variant/30" style="font-size: 8rem;">person</span>
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ EXPERIENCE & EDUCATION TIMELINE (Chronicle) ═══ -->
    <section class="bg-surface-container-lowest py-24 mb-28">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Section label -->
        <div class="flex items-center gap-4 mb-16">
          <span class="font-mono text-tertiary text-sm tracking-[0.2em] uppercase">Chronicle</span>
          <div class="h-px flex-1 bg-outline-variant/20"></div>
        </div>

        <div class="relative">
          <!-- Central spine (desktop only) -->
          <div class="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 -translate-x-1/2 hidden md:block"></div>

          <div class="space-y-24">

            <!-- ── Entry 1: Smilegate (text LEFT, image RIGHT) ── -->
            <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">

              <!-- Mobile node -->
              <div class="md:hidden flex items-center gap-4 mb-4">
                <div class="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_15px_rgba(76,215,246,0.4)]"></div>
                <span class="font-mono text-tertiary text-xs font-bold tracking-widest uppercase">2022 — Present</span>
              </div>

              <!-- Text (left) -->
              <div class="md:text-right flex flex-col justify-center order-2 md:order-1">
                <span class="font-mono text-tertiary mb-2 font-bold tracking-widest hidden md:block">2022 — PRESENT</span>
                <h3 class="text-3xl font-bold tracking-tight text-on-surface mb-2">Smilegate</h3>
                <p class="text-primary font-medium mb-4">Frontend Developer</p>
                <p class="text-on-surface-variant leading-relaxed md:ml-auto max-w-md">
                  Architecting large-scale gaming platforms and refactoring complex legacy codebases into modern, user-centric web services. Focus on scalability and high-concurrency performance.
                </p>
              </div>

              <!-- Desktop node -->
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                <div class="w-4 h-4 rounded-full bg-tertiary shadow-[0_0_15px_rgba(76,215,246,0.4)] border-4 border-surface-dim"></div>
              </div>

              <!-- Image (right) -->
              <div class="order-1 md:order-2">
                <div class="h-48 w-full bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
                  <span class="material-symbols-outlined text-outline-variant/30" style="font-size: 5rem;">videogame_asset</span>
                </div>
              </div>
            </div>

            <!-- ── Entry 2: Hyundai Autoever (image LEFT, text RIGHT) ── -->
            <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">

              <!-- Mobile node -->
              <div class="md:hidden flex items-center gap-4 mb-4">
                <div class="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_15px_rgba(76,215,246,0.4)]"></div>
                <span class="font-mono text-tertiary text-xs font-bold tracking-widest uppercase">2020 — 2021</span>
              </div>

              <!-- Image (left) -->
              <div class="order-1">
                <div class="h-48 w-full bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
                  <span class="material-symbols-outlined text-outline-variant/30" style="font-size: 5rem;">directions_car</span>
                </div>
              </div>

              <!-- Desktop node -->
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                <div class="w-4 h-4 rounded-full bg-tertiary shadow-[0_0_15px_rgba(76,215,246,0.4)] border-4 border-surface-dim"></div>
              </div>

              <!-- Text (right) -->
              <div class="flex flex-col justify-center order-2">
                <span class="font-mono text-tertiary mb-2 font-bold tracking-widest hidden md:block">2020 — EARLY 2021</span>
                <h3 class="text-3xl font-bold tracking-tight text-on-surface mb-2">Hyundai Autoever</h3>
                <p class="text-primary font-medium mb-4">Frontend Developer</p>
                <p class="text-on-surface-variant leading-relaxed max-w-md">
                  Developed enterprise-grade automotive web solutions and corporate platforms, integrating real-time telemetry data into intuitive dashboard interfaces.
                </p>
              </div>
            </div>

            <!-- ── Entry 3: University (text LEFT, icon RIGHT) ── -->
            <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">

              <!-- Mobile node -->
              <div class="md:hidden flex items-center gap-4 mb-4">
                <div class="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_15px_rgba(76,215,246,0.4)]"></div>
                <span class="font-mono text-tertiary text-xs font-bold tracking-widest uppercase">2014 — 2020</span>
              </div>

              <!-- Text (left) -->
              <div class="md:text-right flex flex-col justify-center order-2 md:order-1">
                <span class="font-mono text-tertiary mb-2 font-bold tracking-widest hidden md:block">2014 — 2020</span>
                <h3 class="text-3xl font-bold tracking-tight text-on-surface mb-2">University Education</h3>
                <p class="text-primary font-medium mb-4">B.S. Computer Science</p>
                <p class="text-on-surface-variant leading-relaxed md:ml-auto max-w-md">
                  Mastering the foundational principles of engineering, data structures, and algorithmic efficiency. Focused on the intersection of human-computer interaction and systems design.
                </p>
              </div>

              <!-- Desktop node -->
              <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
                <div class="w-4 h-4 rounded-full bg-tertiary shadow-[0_0_15px_rgba(76,215,246,0.4)] border-4 border-surface-dim"></div>
              </div>

              <!-- Icon placeholder (right) -->
              <div class="order-1 md:order-2">
                <div class="h-48 w-full bg-surface-container-low rounded-lg flex items-center justify-center">
                  <span class="material-symbols-outlined text-outline-variant/30" style="font-size: 8rem;">school</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ═══ TECHNICAL EXPERTISE / TOOLKIT ═══ -->
    <section class="max-w-7xl mx-auto px-6 lg:px-8 mb-28">

      <!-- Section header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span class="font-mono text-tertiary text-sm tracking-[0.2em] uppercase block mb-4">Toolkit</span>
          <h2 class="font-sans text-4xl md:text-5xl font-black tracking-tighter">
            TECHNICAL <span class="text-primary">STACK.</span>
          </h2>
        </div>
        <div class="max-w-md">
          <p class="text-on-surface-variant">A curated selection of technologies I leverage to build robust, scalable, and delightful frontend architectures.</p>
        </div>
      </div>

      <!-- Desktop: 3-col grid -->
      <div class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-surface-container-low p-8 rounded-lg group hover:bg-surface-container-high transition-all duration-300"
        >
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-3">
              <img
                :src="skill.iconUrl"
                :alt="skill.name"
                class="w-8 h-8"
              />
              <span class="font-mono font-bold text-lg">{{ skill.name }}</span>
            </div>
            <span class="text-tertiary font-mono text-sm">{{ skill.tag }}</span>
          </div>
          <div class="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" :style="{ width: skill.pct + '%' }"></div>
          </div>
          <div class="mt-4 flex justify-between text-xs font-mono uppercase tracking-widest opacity-60">
            <span>Proficiency</span>
            <span>{{ skill.pct }}%</span>
          </div>
        </div>
      </div>

      <!-- Mobile: single column with skillicon -->
      <div class="md:hidden space-y-4">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-surface-container-low p-4 rounded-lg border-l border-primary/20"
        >
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-3">
              <img
                :src="skill.iconUrl"
                :alt="skill.name"
                class="w-6 h-6"
              />
              <span class="font-mono text-sm font-bold tracking-wide">{{ skill.name }}</span>
            </div>
            <span class="font-mono text-[10px] text-tertiary">{{ skill.pct }}%</span>
          </div>
          <div class="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
            <div class="h-full bg-primary rounded-full" :style="{ width: skill.pct + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>
