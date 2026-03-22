<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
import LogbookEntryPlain    from '../components/logbook/LogbookEntryPlain.vue'
import LogbookEntryProgress from '../components/logbook/LogbookEntryProgress.vue'
import LogbookEntryGrid     from '../components/logbook/LogbookEntryGrid.vue'
import LogbookEntryList     from '../components/logbook/LogbookEntryList.vue'
import type { LogEntry } from '../types/logbook'

// ─── HEADER ────────────────────────────────────────────────────
const header = {
  kicker:  'System Chronology',
  headline: ['ENGINEERING', 'LOGBOOK'],
  subtext: 'A technical record of architectural pivots, system migrations, and platform deployments. Scaled for high-activity cycles and multi-project parallelization.',
}

// ─── TIMELINE ENTRIES ──────────────────────────────────────────
const logEntries: LogEntry[] = [
  // ── 2026: plain, content LEFT ──────────────────────────────
  {
    type:  'plain',
    year:  '2026',
    side:  'left',
    icon:  'terminal',
    label: 'Planned Refactoring',
    title: 'js-bridge Renewal',
    desc:  'Complete modernization of the native bridge architecture for zero-latency cross-platform communication.',
    commit: { icon: 'commit', text: 'feat: core-bridge-v2' },
  },

  // ── 2025: progress, content RIGHT ──────────────────────────
  {
    type:  'progress',
    year:  '2025',
    side:  'right',
    icon:  'rocket_launch',
    label: 'Platform Deployment',
    title: 'Creators Site Launch',
    desc:  'Implementation of real-time Redis analytics and a complete Settings Page refactor using specialized UI components.',
    progress: {
      icon:  'monitoring',
      label: 'Real-time Analytics Engine',
      value: 94,
    },
  },

  // ── 2024: grid, content LEFT ───────────────────────────────
  {
    type: 'grid',
    year: '2024',
    side: 'left',
    cards: [
      {
        category: 'System Ops',
        title:    'Maintenance of my-indie',
        desc:     'Post-launch stability phase, optimizing server costs and handling peak user concurrency spikes.',
      },
      {
        category: 'Network',
        title:    'Domain Migration (my-profile)',
        desc:     'Strategic migration of user profiles to a unified namespace, resolving legacy DNS bottlenecks.',
      },
      {
        category: 'Integration',
        title:    'Service Integration (Lounge)',
        desc:     'Deep-linking social microservices into the core gaming hub for seamless community interaction.',
      },
      {
        category: 'Gamification',
        title:    'Quest Feature',
        desc:     'Deployment of the dynamic mission engine with real-time progress tracking and rewards.',
      },
    ],
  },

  // ── 2023: list, content RIGHT ──────────────────────────────
  {
    type: 'list',
    year: '2023',
    side: 'right',
    items: [
      {
        label: 'Front-end Overhaul',
        title: 'Website Revamp',
        desc:  'Complete visual and UX restructure of the primary landing hub using modern tailwind standards.',
      },
      {
        label: 'Operations',
        title: 'Game Release Plan Refresh',
        desc:  'Standardizing CI/CD workflows for multi-tenant game deployments across global nodes.',
      },
      {
        label:     'Major Release',
        title:     'my-indie Launch',
        desc:  'Standardizing CI/CD workflows for multi-tenant game deployments across global nodes.',
        highlight: true,
        terminal:  {
          comment: '# prod-deploy-successful',
          command: 'sh deploy-main.sh --tag=v1.0.0-gold',
        },
      },
    ],
  },

  // ── 2022: plain, content LEFT ──────────────────────────────
  {
    type:  'plain',
    year:  '2022',
    side:  'left',
    icon:  'auto_awesome',
    label: 'Technical Showcase',
    title: 'Burning Beaver Event',
    desc:  'Lead architect for the event\'s technical showcase, establishing core architectural principles.',
    tags:  ['Event.Management', 'Legacy.Architecture'],
  },
]

// ─── BENTO FOOTER ──────────────────────────────────────────────
const bento = {
  vision: {
    label: 'Strategic Vision',
    title: 'Future Perspective',
    desc:  'Approaching 2026 with an uncompromising focus on system resilience. The transition from product-focused launches to infrastructure-level renewals defines the next chapter of engineering excellence.',
    icon:  'architecture',
  },
  coreTech: {
    icon:  'memory',
    title: 'Core Tech',
    tags:  ['React/Next.js', 'Rust', 'PostgreSQL', 'AWS/K8s'],
  },
  stat: {
    value: '05+',
    label: 'Years of Architectural Evolution',
    cta:   'Download Full Log',
  },
}
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface font-sans">
    <AppNav />

    <main class="pt-32 pb-24 px-6 max-w-7xl mx-auto">

      <!-- ─── HEADER ──────────────────────────────────────────── -->
      <header class="mb-24">
        <span class="font-mono text-tertiary text-sm tracking-widest uppercase mb-4 block">{{ header.kicker }}</span>
        <h1 class="font-sans text-4xl md:text-8xl font-black tracking-tighter leading-none mb-8">
          {{ header.headline[0] }}<br/>
          {{ header.headline[1] }}
        </h1>
        <p class="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          {{ header.subtext }}
        </p>
      </header>

      <!-- ─── TIMELINE ────────────────────────────────────────── -->
      <div class="relative">
        <!-- Central Spine -->
        <div
          class="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
          style="background: linear-gradient(to bottom, transparent, #464554 5%, #464554 95%, transparent)"
        />

        <template v-for="(entry, i) in logEntries" :key="entry.year">
          <LogbookEntryPlain
            v-if="entry.type === 'plain'"
            :entry="entry"
            :last="i === logEntries.length - 1"
          />
          <LogbookEntryProgress
            v-else-if="entry.type === 'progress'"
            :entry="entry"
            :last="i === logEntries.length - 1"
          />
          <LogbookEntryGrid
            v-else-if="entry.type === 'grid'"
            :entry="entry"
            :last="i === logEntries.length - 1"
          />
          <LogbookEntryList
            v-else-if="entry.type === 'list'"
            :entry="entry"
            :last="i === logEntries.length - 1"
          />
        </template>
      </div>

      <!-- ─── BENTO FOOTER ────────────────────────────────────── -->
      <section class="mt-48 grid md:grid-cols-4 gap-6">
        <!-- Future Perspective: spans 2 cols -->
        <div class="md:col-span-2 bg-surface-container-low p-10 rounded border border-white/5 relative overflow-hidden group">
          <div class="relative z-10">
            <div class="font-mono text-primary text-[10px] uppercase font-bold tracking-widest mb-4">{{ bento.vision.label }}</div>
            <h4 class="text-2xl font-black tracking-tight mb-4 uppercase">{{ bento.vision.title }}</h4>
            <p class="text-on-surface-variant leading-relaxed max-w-md text-sm">{{ bento.vision.desc }}</p>
          </div>
          <span class="material-symbols-outlined absolute -bottom-8 -right-8 text-surface-container-highest text-[10rem] opacity-20 group-hover:rotate-45 transition-transform duration-500">{{ bento.vision.icon }}</span>
        </div>

        <!-- Core Tech -->
        <div class="bg-surface-container-high p-8 rounded border border-white/5 flex flex-col justify-between">
          <div>
            <span class="material-symbols-outlined text-primary mb-6 text-3xl block">{{ bento.coreTech.icon }}</span>
            <h4 class="text-lg font-bold tracking-tight mb-2 uppercase">{{ bento.coreTech.title }}</h4>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in bento.coreTech.tags"
              :key="tag"
              class="bg-surface-container-lowest px-2 py-1 text-[9px] font-mono border border-outline-variant/20 uppercase rounded"
            >{{ tag }}</span>
          </div>
        </div>

        <!-- Stat -->
        <div class="bg-primary/5 p-8 rounded border border-primary/20 flex flex-col justify-center items-center text-center">
          <div class="text-4xl font-black text-primary mb-1">{{ bento.stat.value }}</div>
          <div class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">{{ bento.stat.label }}</div>
          <button class="mt-6 font-mono text-[10px] text-primary uppercase border-b border-primary/30 hover:border-primary transition-all">
            {{ bento.stat.cta }}
          </button>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
