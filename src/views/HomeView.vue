<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
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
              Est. 2022 — Active 2026
            </span>
            <h1 class="font-sans text-4xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              Building Digital <br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Experiences</span>
            </h1>
            <p class="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
              Architecting fluid interfaces through the lens of machine logic — where code meets editorial design.
            </p>
            <div class="flex flex-wrap gap-4">
              <a
                href="#timeline"
                class="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded font-mono font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2"
              >
                View My Journey
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
              <a
                href="#projects"
                class="border border-outline-variant/20 text-primary px-8 py-4 rounded font-mono font-bold uppercase tracking-wider hover:bg-surface-container-high transition-all"
              >
                Latest Work
              </a>
            </div>
          </div>

          <!-- Right: 4 cols — Code block -->
          <div class="lg:col-span-4 relative hidden lg:block">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div class="relative z-10 border border-outline-variant/20 p-2 rounded-xl bg-surface-container-low/40 backdrop-blur-md">
              <div class="flex items-center gap-2 px-4 py-2 border-b border-outline-variant/10">
                <div class="w-2 h-2 rounded-full bg-error" />
                <div class="w-2 h-2 rounded-full bg-secondary" />
                <div class="w-2 h-2 rounded-full bg-tertiary" />
                <span class="font-mono text-[10px] text-outline ml-4 uppercase tracking-tighter">architect.v6.0.4.sh</span>
              </div>
              <div class="p-6 font-mono text-xs leading-relaxed space-y-1">
                <p class="text-tertiary"><span class="text-outline">01</span> class Developer &#123;</p>
                <p class="text-on-surface"><span class="text-outline">02</span> &nbsp;&nbsp;constructor() &#123;</p>
                <p class="text-on-surface"><span class="text-outline">03</span> &nbsp;&nbsp;&nbsp;&nbsp;this.start = 2022;</p>
                <p class="text-on-surface"><span class="text-outline">04</span> &nbsp;&nbsp;&nbsp;&nbsp;this.horizon = 2026;</p>
                <p class="text-on-surface"><span class="text-outline">05</span> &nbsp;&nbsp;&#125;</p>
                <p class="text-on-surface"><span class="text-outline">06</span> &nbsp;&nbsp;async deploy() &#123;</p>
                <p class="text-primary"><span class="text-outline">07</span> &nbsp;&nbsp;&nbsp;&nbsp;await world.impact();</p>
                <p class="text-on-surface"><span class="text-outline">08</span> &nbsp;&nbsp;&#125;</p>
                <p class="text-tertiary"><span class="text-outline">09</span> &#125;</p>
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
                <span class="font-mono text-[10px] text-outline ml-4 uppercase tracking-tighter">architect.v6.0.4.sh</span>
              </div>
              <div class="p-6 font-mono text-xs leading-relaxed space-y-1">
                <p class="text-tertiary"><span class="text-outline">01</span> class Developer &#123;</p>
                <p class="text-on-surface"><span class="text-outline">02</span> &nbsp;&nbsp;constructor() &#123;</p>
                <p class="text-on-surface"><span class="text-outline">03</span> &nbsp;&nbsp;&nbsp;&nbsp;this.start = 2022;</p>
                <p class="text-on-surface"><span class="text-outline">04</span> &nbsp;&nbsp;&nbsp;&nbsp;this.horizon = 2026;</p>
                <p class="text-on-surface"><span class="text-outline">05</span> &nbsp;&nbsp;&#125;</p>
                <p class="text-on-surface"><span class="text-outline">06</span> &nbsp;&nbsp;async deploy() &#123;</p>
                <p class="text-primary"><span class="text-outline">07</span> &nbsp;&nbsp;&nbsp;&nbsp;await world.impact();</p>
                <p class="text-on-surface"><span class="text-outline">08</span> &nbsp;&nbsp;&#125;</p>
                <p class="text-tertiary"><span class="text-outline">09</span> &#125;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── TIMELINE ───────────────────────────────────────────── -->
      <section class="py-32 px-8 max-w-7xl mx-auto relative" id="timeline">
        <div class="flex flex-col items-center mb-24">
          <span class="font-mono text-tertiary text-xs tracking-widest uppercase mb-2">The Trajectory</span>
          <h2 class="font-sans text-4xl font-bold tracking-tighter uppercase">Evolution Spine</h2>
        </div>

        <div class="relative">
          <!-- Spine: left-4 on mobile (aligns with nodes), center on desktop -->
          <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-outline-variant/30" />

          <div class="space-y-32">
            <!-- 2026 PEAK — LEFT side content -->
            <div class="relative flex items-center justify-start md:justify-end md:pr-1/2 group">
              <div class="md:w-1/2 md:pr-16 text-left md:text-right ml-14 md:ml-0">
                <span class="font-mono text-primary text-sm font-bold tracking-widest mb-1 block">2026 — PEAK</span>
                <h3 class="font-sans text-2xl font-bold mb-4 tracking-tight">Refactoring Policy Project</h3>
                <p class="text-on-surface-variant leading-relaxed max-w-md ml-auto">
                  Engineering a massive scale organizational refactor, reducing legacy technical debt by 60% through a new automated governance bridge.
                </p>
                <div class="mt-4 flex flex-wrap gap-2 justify-start md:justify-end">
                  <span class="bg-surface-container-lowest border border-outline-variant/20 px-3 py-1 text-[10px] font-mono text-tertiary uppercase">TypeScript</span>
                  <span class="bg-surface-container-lowest border border-outline-variant/20 px-3 py-1 text-[10px] font-mono text-tertiary uppercase">Architecture</span>
                </div>
              </div>
              <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-tertiary ring-4 ring-tertiary/20 shadow-[0_0_15px_rgba(76,215,246,0.4)]" />
            </div>

            <!-- 2026 INNOVATION — RIGHT side content -->
            <div class="relative flex items-center justify-start md:pl-1/2 group">
              <div class="md:w-1/2 md:pl-16 ml-14 md:ml-0">
                <span class="font-mono text-primary text-sm font-bold tracking-widest mb-1 block">2026 — INNOVATION</span>
                <h3 class="font-sans text-2xl font-bold mb-4 tracking-tight">js-bridge Renewal</h3>
                <p class="text-on-surface-variant leading-relaxed max-w-md">
                  Re-architecting the critical bridge between native runtimes and the V8 engine, achieving sub-millisecond latency for real-time data flows.
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="bg-surface-container-lowest border border-outline-variant/20 px-3 py-1 text-[10px] font-mono text-tertiary uppercase">Runtime</span>
                  <span class="bg-surface-container-lowest border border-outline-variant/20 px-3 py-1 text-[10px] font-mono text-tertiary uppercase">Next.js</span>
                </div>
              </div>
              <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 shadow-[0_0_15px_rgba(192,193,255,0.4)]" />
            </div>

            <!-- 2024 EXPANSION — LEFT side content (faded) -->
            <div class="relative flex items-center justify-start md:justify-end md:pr-1/2 group opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
              <div class="md:w-1/2 md:pr-16 text-left md:text-right ml-14 md:ml-0">
                <span class="font-mono text-on-surface-variant text-sm font-bold tracking-widest mb-1 block">2024 — EXPANSION</span>
                <h3 class="font-sans text-2xl font-bold mb-4 tracking-tight">Kinetic Component Library</h3>
                <p class="text-on-surface-variant leading-relaxed max-w-md ml-auto">
                  Built an open-source animation engine for React that focuses on fluid, non-linear physics for UI transitions.
                </p>
              </div>
              <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-outline-variant ring-4 ring-outline-variant/10" />
            </div>

            <!-- 2022 GENESIS — RIGHT side content (more faded) -->
            <div class="relative flex items-center justify-start md:pl-1/2 group opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
              <div class="md:w-1/2 md:pl-16 ml-14 md:ml-0">
                <span class="font-mono text-on-surface-variant text-sm font-bold tracking-widest mb-1 block">2022 — GENESIS</span>
                <h3 class="font-sans text-2xl font-bold mb-4 tracking-tight">The First Commit</h3>
                <p class="text-on-surface-variant leading-relaxed max-w-md">
                  Embarked on the journey with a deep dive into the fundamentals of the DOM and CSS rendering engines.
                </p>
              </div>
              <div class="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-outline-variant/50 ring-4 ring-outline-variant/5" />
            </div>
          </div>
        </div>
      </section>

      <!-- ─── PROJECTS ───────────────────────────────────────────── -->
      <section class="py-32 px-8 max-w-7xl mx-auto" id="projects">
        <div class="flex justify-between items-end mb-16">
          <div>
            <span class="font-mono text-tertiary text-xs tracking-widest uppercase mb-2 block">Featured Work</span>
            <h2 class="font-sans text-4xl font-bold tracking-tighter uppercase">Selected Artifacts</h2>
          </div>
          <div class="hidden md:block">
            <p class="font-mono text-xs text-outline tracking-tight uppercase">
              Current Status: <span class="text-tertiary">Building for the future</span>
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Project 1: Large (2 cols) -->
          <div class="md:col-span-2 group relative overflow-hidden bg-surface-container-low rounded-xl">
            <div class="w-full h-[450px] bg-gradient-to-br from-primary/20 via-surface-container to-tertiary/10 opacity-50 group-hover:opacity-70 transition-all duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent p-8 flex flex-col justify-end">
              <span class="font-mono text-primary text-[10px] tracking-widest uppercase mb-2">Full Stack • 2026</span>
              <h3 class="font-sans text-3xl font-bold mb-2">Policy Refactor Dashboard</h3>
              <p class="text-on-surface-variant text-sm max-w-md mb-6">Real-time analytical interface tracking codebase migrations across distributed teams.</p>
              <button class="w-fit flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest border-b border-primary text-primary pb-1 group-hover:gap-4 transition-all">
                Deep Dive
                <span class="material-symbols-outlined text-xs">arrow_right_alt</span>
              </button>
            </div>
          </div>

          <!-- Project 2: Vertical (1 col) -->
          <div class="group relative overflow-hidden bg-surface-container-low rounded-xl">
            <div class="w-full h-[450px] bg-gradient-to-br from-secondary/20 via-surface-container to-primary/10 opacity-40 group-hover:opacity-60 transition-all duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-surface to-transparent p-8 flex flex-col justify-end">
              <span class="font-mono text-tertiary text-[10px] tracking-widest uppercase mb-2">Renewal • 2026</span>
              <h3 class="font-sans text-2xl font-bold mb-2">js-bridge UI</h3>
              <p class="text-on-surface-variant text-sm mb-6">Dynamic configuration portal for native-JS interfacing.</p>
              <button class="w-fit flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-primary group-hover:gap-3 transition-all">
                View Live
                <span class="material-symbols-outlined text-xs">open_in_new</span>
              </button>
            </div>
          </div>

          <!-- Small Bento: Automated Governance -->
          <div class="group p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all">
            <div class="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center mb-6 text-primary">
              <span class="material-symbols-outlined">api</span>
            </div>
            <h3 class="font-sans text-lg font-bold mb-2">Automated Governance</h3>
            <p class="text-on-surface-variant text-xs leading-relaxed">Systematic linting and architectural enforcement at the CI level.</p>
          </div>

          <!-- Small Bento: Latency Optimizer -->
          <div class="group p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all">
            <div class="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center mb-6 text-tertiary">
              <span class="material-symbols-outlined">bolt</span>
            </div>
            <h3 class="font-sans text-lg font-bold mb-2">Latency Optimizer</h3>
            <p class="text-on-surface-variant text-xs leading-relaxed">Profiling and purging redundant render cycles in complex DOM trees.</p>
          </div>

          <!-- Small Bento: Design Tokens V2 -->
          <div class="group p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-all">
            <div class="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center mb-6 text-on-surface-variant">
              <span class="material-symbols-outlined">token</span>
            </div>
            <h3 class="font-sans text-lg font-bold mb-2">Design Tokens V2</h3>
            <p class="text-on-surface-variant text-xs leading-relaxed">Unified style primitives synchronized between Figma and Tailwind.</p>
          </div>
        </div>
      </section>

      <!-- ─── CTA ────────────────────────────────────────────────── -->
      <section class="py-32 px-8 max-w-7xl mx-auto">
        <div class="bg-gradient-to-br from-surface-container-low to-surface-container-lowest p-12 md:p-24 rounded-3xl border border-outline-variant/10 relative overflow-hidden text-center">
          <!-- Ambient glows -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/5 blur-[100px] pointer-events-none" />

          <h2 class="font-sans text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none relative z-10">
            Ready to build the <br>
            <span class="text-primary" style="text-shadow: 0 0 20px rgba(192,193,255,0.3)">Next Era?</span>
          </h2>
          <p class="text-on-surface-variant max-w-xl mx-auto mb-12 text-lg relative z-10">
            I am currently seeking collaborations on forward-thinking digital products and architectural shifts for late 2026.
          </p>
          <div class="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <a
              href="mailto:hello@kinetic.arch"
              class="w-full md:w-auto px-10 py-5 bg-primary text-on-primary rounded font-mono font-bold uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Initiate Connection
            </a>
            <a
              href="#"
              class="font-mono text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group"
            >
              Download Manifest
              <span class="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform">download</span>
            </a>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
