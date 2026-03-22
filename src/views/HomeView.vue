<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'

// ─── HERO ──────────────────────────────────────────────────────
const hero = {
  kicker: 'Est. 2022 — Active 2026',
  headline: 'Building Digital',
  headlineAccent: 'Experiences',
  subtext: 'Architecting fluid interfaces through the lens of machine logic — where code meets editorial design.',
  ctaPrimary:   { label: 'View My Journey', href: '#timeline', icon: 'arrow_forward' },
  ctaSecondary: { label: 'Latest Work',     href: '#projects' },
}

const codeBlock = {
  filename: 'architect.v6.0.4.sh',
  lines: [
    { color: 'text-tertiary',    text: 'class Developer {'       },
    { color: 'text-on-surface',  text: '  constructor() {'       },
    { color: 'text-on-surface',  text: '    this.start = 2022;'  },
    { color: 'text-on-surface',  text: '    this.horizon = 2026;'},
    { color: 'text-on-surface',  text: '  }'                     },
    { color: 'text-on-surface',  text: '  async deploy() {'      },
    { color: 'text-primary',     text: '    await world.impact();'},
    { color: 'text-on-surface',  text: '  }'                     },
    { color: 'text-tertiary',    text: '}'                        },
  ],
}

// ─── TIMELINE ──────────────────────────────────────────────────
const timelineSection = {
  kicker:  'The Trajectory',
  heading: 'Evolution Spine',
}

const timelineItems = [
  {
    period:      '2026 — PEAK',
    periodClass: 'text-primary',
    title:       'Refactoring Policy Project',
    desc:        'Engineering a massive scale organizational refactor, reducing legacy technical debt by 60% through a new automated governance bridge.',
    tags:        ['TypeScript', 'Architecture'],
    side:        'left',
    nodeClass:   'bg-tertiary ring-4 ring-tertiary/20 shadow-[0_0_15px_rgba(76,215,246,0.4)]',
    dimClass:    '',
  },
  {
    period:      '2026 — INNOVATION',
    periodClass: 'text-primary',
    title:       'js-bridge Renewal',
    desc:        'Re-architecting the critical bridge between native runtimes and the V8 engine, achieving sub-millisecond latency for real-time data flows.',
    tags:        ['Runtime', 'Next.js'],
    side:        'right',
    nodeClass:   'bg-primary ring-4 ring-primary/20 shadow-[0_0_15px_rgba(192,193,255,0.4)]',
    dimClass:    '',
  },
  {
    period:      '2024 — EXPANSION',
    periodClass: 'text-on-surface-variant',
    title:       'Kinetic Component Library',
    desc:        'Built an open-source animation engine for React that focuses on fluid, non-linear physics for UI transitions.',
    tags:        [] as string[],
    side:        'left',
    nodeClass:   'bg-outline-variant ring-4 ring-outline-variant/10',
    dimClass:    'opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all',
  },
  {
    period:      '2022 — GENESIS',
    periodClass: 'text-on-surface-variant',
    title:       'The First Commit',
    desc:        'Embarked on the journey with a deep dive into the fundamentals of the DOM and CSS rendering engines.',
    tags:        [] as string[],
    side:        'right',
    nodeClass:   'bg-outline-variant/50 ring-4 ring-outline-variant/5',
    dimClass:    'opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all',
  },
]

// ─── PROJECTS ──────────────────────────────────────────────────
const projectsSection = {
  kicker:  'Featured Work',
  heading: 'Selected Artifacts',
  status:  'Building for the future',
}

const featuredProjects = [
  {
    tag:      'Full Stack • 2026',
    tagClass: 'text-primary',
    title:    'Policy Refactor Dashboard',
    desc:     'Real-time analytical interface tracking codebase migrations across distributed teams.',
    cta:      'Deep Dive',
    ctaIcon:  'arrow_right_alt',
    gradient: 'from-primary/20 via-surface-container to-tertiary/10',
    large:    true,
  },
  {
    tag:      'Renewal • 2026',
    tagClass: 'text-tertiary',
    title:    'js-bridge UI',
    desc:     'Dynamic configuration portal for native-JS interfacing.',
    cta:      'View Live',
    ctaIcon:  'open_in_new',
    gradient: 'from-secondary/20 via-surface-container to-primary/10',
    large:    false,
  },
]

const bentoItems = [
  { icon: 'api',   iconClass: 'text-primary',            title: 'Automated Governance', desc: 'Systematic linting and architectural enforcement at the CI level.' },
  { icon: 'bolt',  iconClass: 'text-tertiary',           title: 'Latency Optimizer',    desc: 'Profiling and purging redundant render cycles in complex DOM trees.' },
  { icon: 'token', iconClass: 'text-on-surface-variant', title: 'Design Tokens V2',     desc: 'Unified style primitives synchronized between Figma and Tailwind.' },
]

// ─── CTA ───────────────────────────────────────────────────────
const ctaSection = {
  headline:       'Ready to build the',
  headlineAccent: 'Next Era?',
  body:           'I am currently seeking collaborations on forward-thinking digital products and architectural shifts for late 2026.',
  primaryBtn:   { label: 'Initiate Connection', href: 'mailto:hello@kinetic.arch' },
  secondaryBtn: { label: 'Download Manifest',   href: '#', icon: 'download' },
}
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface font-sans">
    <AppNav />

    <main class="pt-24">

      <!-- ─── HERO ───────────────────────────────────────────────── -->
      <section class="relative min-h-[520px] flex items-center px-8 max-w-7xl mx-auto overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <!-- Left: 8 cols -->
          <div class="lg:col-span-8 z-10">
            <span class="font-mono text-tertiary uppercase tracking-widest text-sm mb-4 block" style="text-shadow: 0 0 15px rgba(76,215,246,0.4)">
              {{ hero.kicker }}
            </span>
            <h1 class="font-sans text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              {{ hero.headline }}<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">{{ hero.headlineAccent }}</span>
            </h1>
            <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
              {{ hero.subtext }}
            </p>
            <div class="flex flex-wrap gap-4">
              <a
                :href="hero.ctaPrimary.href"
                class="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded font-mono font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
              >
                {{ hero.ctaPrimary.label }}
                <span class="material-symbols-outlined text-sm">{{ hero.ctaPrimary.icon }}</span>
              </a>
              <a
                :href="hero.ctaSecondary.href"
                class="border border-outline-variant/20 text-primary px-8 py-4 rounded font-mono font-bold uppercase tracking-wider hover:bg-surface-container-high transition-all"
              >
                {{ hero.ctaSecondary.label }}
              </a>
            </div>
          </div>

          <!-- Right: 4 cols — Code block (desktop) -->
          <div class="lg:col-span-4 relative hidden lg:block">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div class="relative z-10 border border-outline-variant/20 p-2 rounded-xl bg-surface-container-low/40 backdrop-blur-md">
              <div class="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/10">
                <div class="w-2 h-2 rounded-full bg-error" />
                <div class="w-2 h-2 rounded-full bg-secondary" />
                <div class="w-2 h-2 rounded-full bg-tertiary" />
                <span class="font-mono text-[10px] text-outline ml-4 uppercase tracking-tighter">{{ codeBlock.filename }}</span>
              </div>
              <div class="p-6 font-mono text-xs leading-relaxed space-y-1">
                <p v-for="(line, i) in codeBlock.lines" :key="i" :class="line.color">
                  <span class="text-outline mr-3">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span class="whitespace-pre">{{ line.text }}</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Mobile: Code block (compact) -->
          <div class="lg:hidden">
            <div class="border border-outline-variant/20 p-2 rounded-xl bg-surface-container-low/40 backdrop-blur-md">
              <div class="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/10">
                <div class="w-2 h-2 rounded-full bg-error" />
                <div class="w-2 h-2 rounded-full bg-secondary" />
                <div class="w-2 h-2 rounded-full bg-tertiary" />
                <span class="font-mono text-[10px] text-outline ml-4 uppercase tracking-tighter">{{ codeBlock.filename }}</span>
              </div>
              <div class="p-6 font-mono text-xs leading-relaxed space-y-1">
                <p v-for="(line, i) in codeBlock.lines" :key="i" :class="line.color">
                  <span class="text-outline mr-3">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span class="whitespace-pre">{{ line.text }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── TIMELINE ───────────────────────────────────────────── -->
      <section class="py-16 px-8 max-w-7xl mx-auto relative" id="timeline">
        <div class="flex flex-col items-center mb-24">
          <span class="font-mono text-tertiary text-xs tracking-widest uppercase mb-2">{{ timelineSection.kicker }}</span>
          <h2 class="font-sans text-4xl font-bold tracking-tighter uppercase">{{ timelineSection.heading }}</h2>
        </div>

        <div class="relative">
          <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-outline-variant/30" />

          <div class="space-y-32">
            <div
              v-for="item in timelineItems"
              :key="item.title"
              class="relative flex items-center group"
              :class="[
                item.side === 'left' ? 'justify-start md:justify-end md:pr-1/2' : 'justify-start md:pl-1/2',
                item.dimClass,
              ]"
            >
              <div
                class="md:w-1/2 ml-14 md:ml-0"
                :class="item.side === 'left' ? 'md:pr-16 text-left md:text-right' : 'md:pl-16'"
              >
                <span class="font-mono text-sm font-bold tracking-widest mb-1 block" :class="item.periodClass">
                  {{ item.period }}
                </span>
                <h3 class="font-sans text-2xl font-bold mb-4 tracking-tight">{{ item.title }}</h3>
                <p
                  class="text-on-surface-variant leading-relaxed max-w-md"
                  :class="item.side === 'left' ? 'ml-auto' : ''"
                >
                  {{ item.desc }}
                </p>
                <div
                  v-if="item.tags.length"
                  class="mt-4 flex flex-wrap gap-2"
                  :class="item.side === 'left' ? 'justify-start md:justify-end' : ''"
                >
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="bg-surface-container-lowest border border-outline-variant/20 px-3 py-1 text-[10px] font-mono text-tertiary uppercase"
                  >{{ tag }}</span>
                </div>
              </div>
              <div
                class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full"
                :class="item.nodeClass"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ─── PROJECTS ───────────────────────────────────────────── -->
      <section class="py-16 px-8 max-w-7xl mx-auto" id="projects">
        <div class="flex justify-between items-end mb-16">
          <div>
            <span class="font-mono text-tertiary text-xs tracking-widest uppercase mb-2 block">{{ projectsSection.kicker }}</span>
            <h2 class="font-sans text-4xl font-bold tracking-tighter uppercase">{{ projectsSection.heading }}</h2>
          </div>
          <div class="hidden md:block">
            <p class="font-mono text-xs text-outline tracking-tight uppercase">
              Current Status: <span class="text-tertiary">{{ projectsSection.status }}</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Featured project cards -->
          <div
            v-for="project in featuredProjects"
            :key="project.title"
            class="group relative overflow-hidden bg-surface-container-low rounded-xl"
            :class="project.large ? 'md:col-span-2' : ''"
          >
            <div
              class="w-full h-[450px] bg-gradient-to-br opacity-50 group-hover:opacity-70 transition-all duration-700"
              :class="project.gradient"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent p-8 flex flex-col justify-end">
              <span class="font-mono text-[10px] tracking-widest uppercase mb-2" :class="project.tagClass">{{ project.tag }}</span>
              <h3 class="font-sans font-bold mb-2" :class="project.large ? 'text-3xl' : 'text-2xl'">{{ project.title }}</h3>
              <p class="text-on-surface-variant text-sm max-w-md mb-6">{{ project.desc }}</p>
              <button
                class="w-fit flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all"
                :class="project.large ? 'border-b border-primary pb-1' : ''"
              >
                {{ project.cta }}
                <span class="material-symbols-outlined text-xs">{{ project.ctaIcon }}</span>
              </button>
            </div>
          </div>

          <!-- Bento items -->
          <div
            v-for="item in bentoItems"
            :key="item.title"
            class="group p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all"
          >
            <div class="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center mb-6" :class="item.iconClass">
              <span class="material-symbols-outlined">{{ item.icon }}</span>
            </div>
            <h3 class="font-sans text-lg font-bold mb-2">{{ item.title }}</h3>
            <p class="text-on-surface-variant text-xs leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ─── CTA ────────────────────────────────────────────────── -->
      <section class="py-16 px-8 max-w-7xl mx-auto">
        <div class="bg-gradient-to-br from-surface-container-low to-surface-container-lowest p-12 md:p-24 rounded-3xl border border-outline-variant/10 relative overflow-hidden text-center">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/5 blur-[100px] pointer-events-none" />

          <h2 class="font-sans text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none relative z-10">
            {{ ctaSection.headline }}<br>
            <span class="text-primary" style="text-shadow: 0 0 20px rgba(192,193,255,0.3)">{{ ctaSection.headlineAccent }}</span>
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-12 text-lg relative z-10">
            {{ ctaSection.body }}
          </p>
          <div class="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <a
              :href="ctaSection.primaryBtn.href"
              class="w-full md:w-auto px-10 py-5 bg-primary text-on-primary rounded font-mono font-bold uppercase tracking-widest hover:brightness-110 transition-all"
            >
              {{ ctaSection.primaryBtn.label }}
            </a>
            <a
              :href="ctaSection.secondaryBtn.href"
              class="font-mono text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group"
            >
              {{ ctaSection.secondaryBtn.label }}
              <span class="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform">{{ ctaSection.secondaryBtn.icon }}</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
