<script setup lang="ts">
import AppNav from '../components/AppNav.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-surface text-on-surface font-sans">
    <AppNav />

    <main class="pt-32 pb-24 px-6 max-w-7xl mx-auto">

      <!-- ─── HEADER ──────────────────────────────────────────── -->
      <header class="mb-24">
        <span class="font-mono text-tertiary text-xs tracking-widest uppercase mb-4 block">System Chronology</span>
        <h1 class="font-sans text-4xl md:text-8xl font-black tracking-tighter leading-none mb-8">
          ENGINEERING<br/>
          LOGBOOK
        </h1>
        <p class="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          A technical record of architectural pivots, system migrations, and platform deployments.
          Scaled for high-activity cycles and multi-project parallelization.
        </p>
      </header>

      <!-- ─── TIMELINE ────────────────────────────────────────── -->
      <div class="relative">
        <!-- Central Spine: left-4 on mobile, center on desktop -->
        <div
          class="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px"
          style="background: linear-gradient(to bottom, transparent, #464554 5%, #464554 95%, transparent)"
        />

        <!-- ── 2026: Basic entry, content LEFT / year RIGHT ──── -->
        <section class="group relative mb-32">
          <div class="grid md:grid-cols-2 gap-12 items-start">
            <!-- Content: LEFT -->
            <div class="md:text-right md:pr-16 order-2 md:order-1 ml-12 md:ml-0">
              <!-- Mobile year label -->
              <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">2026</span>
              <div class="inline-flex items-center gap-2 mb-2 md:flex-row-reverse">
                <span class="material-symbols-outlined text-primary text-sm">terminal</span>
                <span class="font-mono text-primary text-xs tracking-widest uppercase font-bold">Planned Refactoring</span>
              </div>
              <h3 class="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                js-bridge Renewal
              </h3>
              <p class="text-on-surface-variant mb-6 leading-relaxed max-w-lg md:ml-auto">
                Complete modernization of the native bridge architecture for zero-latency cross-platform communication.
              </p>
              <div class="flex md:justify-end flex-wrap gap-2">
                <div class="bg-surface-container-lowest border border-outline-variant/20 px-3 py-1 flex items-center gap-2 rounded">
                  <span class="material-symbols-outlined text-[10px] text-on-surface-variant">commit</span>
                  <span class="text-[10px] font-mono uppercase tracking-tighter text-on-surface-variant">feat: core-bridge-v2</span>
                </div>
              </div>
            </div>
            <!-- Node -->
            <div class="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 z-10">
              <div class="w-3 h-3 bg-surface border-2 border-primary rounded-full ring-4 ring-primary/5 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300" />
            </div>
            <!-- Year: RIGHT (desktop only) -->
            <div class="hidden md:flex md:pl-16 order-1 md:order-2 items-baseline gap-4">
              <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">2026</span>
            </div>
          </div>
        </section>

        <!-- ── 2025: Progress bar, year LEFT / content RIGHT ─── -->
        <section class="group relative mb-32">
          <div class="grid md:grid-cols-2 gap-12 items-start">
            <!-- Year: LEFT (desktop only) -->
            <div class="hidden md:flex md:pr-16 flex-row-reverse items-baseline gap-4">
              <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">2025</span>
            </div>
            <!-- Node -->
            <div class="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 z-10">
              <div class="w-3 h-3 bg-surface border-2 border-primary rounded-full ring-4 ring-primary/5 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300" />
            </div>
            <!-- Content: RIGHT -->
            <div class="md:pl-16 ml-12 md:ml-0">
              <!-- Mobile year label -->
              <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">2025</span>
              <div class="inline-flex items-center gap-2 mb-2">
                <span class="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                <span class="font-mono text-primary text-xs tracking-widest uppercase font-bold">Platform Deployment</span>
              </div>
              <h3 class="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                Creators Site Launch
              </h3>
              <p class="text-on-surface-variant mb-6 leading-relaxed max-w-lg">
                Implementation of real-time Redis analytics and a complete Settings Page refactor using specialized UI components.
              </p>
              <!-- Progress bar card -->
              <div class="bg-surface-container-low p-4 rounded border border-outline-variant/10 max-w-sm">
                <div class="flex justify-between items-start mb-2">
                  <span class="material-symbols-outlined text-primary text-xl">monitoring</span>
                  <span class="text-[10px] font-mono text-on-surface-variant uppercase">Real-time Analytics Engine</span>
                </div>
                <div class="w-full bg-outline-variant/10 h-1 mt-1 rounded-full overflow-hidden">
                  <div class="bg-primary h-full w-[94%]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 2024: 2×2 glass card grid, cards LEFT / year RIGHT -->
        <section class="group relative mb-32">
          <div class="grid md:grid-cols-2 gap-12 items-start">
            <!-- Cards: LEFT -->
            <div class="md:pr-16 md:flex flex-col items-end order-2 md:order-1 ml-12 md:ml-0">
              <!-- Mobile year label -->
              <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">2024</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div
                  v-for="card in [
                    { category: 'System Ops', title: 'Maintenance of my-indie', desc: 'Post-launch stability phase, optimizing server costs and handling peak user concurrency spikes.' },
                    { category: 'Network', title: 'Domain Migration (my-profile)', desc: 'Strategic migration of user profiles to a unified namespace, resolving legacy DNS bottlenecks.' },
                    { category: 'Integration', title: 'Service Integration (Lounge)', desc: 'Deep-linking social microservices into the core gaming hub for seamless community interaction.' },
                    { category: 'Gamification', title: 'Quest Feature', desc: 'Deployment of the dynamic mission engine with real-time progress tracking and rewards.' },
                  ]"
                  :key="card.title"
                  class="p-5 rounded-lg border-l-2 border-primary/40 hover:border-primary transition-all"
                  style="background: rgba(32,31,31,0.4); backdrop-filter: blur(12px); border-top: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);"
                >
                  <div class="font-mono text-[9px] text-primary mb-2 uppercase tracking-tighter">{{ card.category }}</div>
                  <h4 class="text-sm font-bold uppercase mb-2 tracking-tight">{{ card.title }}</h4>
                  <p class="text-[11px] text-on-surface-variant leading-tight">{{ card.desc }}</p>
                </div>
              </div>
            </div>
            <!-- Node -->
            <div class="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 z-10">
              <div class="w-3 h-3 bg-surface border-2 border-primary rounded-full ring-4 ring-primary/5 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300" />
            </div>
            <!-- Year: RIGHT (desktop only) -->
            <div class="hidden md:flex md:pl-16 order-1 md:order-2 items-baseline gap-4">
              <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">2024</span>
            </div>
          </div>
        </section>

        <!-- ── 2023: List format, year LEFT / list RIGHT ──────── -->
        <section class="group relative mb-32">
          <div class="grid md:grid-cols-2 gap-12 items-start">
            <!-- Year: LEFT (desktop only) -->
            <div class="hidden md:flex md:pr-16 flex-row-reverse items-baseline gap-4">
              <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">2023</span>
            </div>
            <!-- Node -->
            <div class="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 z-10">
              <div class="w-3 h-3 bg-surface border-2 border-primary rounded-full ring-4 ring-primary/5 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300" />
            </div>
            <!-- List: RIGHT -->
            <div class="md:pl-16 ml-12 md:ml-0">
              <!-- Mobile year label -->
              <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">2023</span>
              <div class="space-y-6">
                <!-- Item 1 -->
                <div class="relative flex flex-col gap-1 border-l-2 border-outline-variant/30 pl-6 py-2">
                  <div class="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-outline-variant" />
                  <span class="font-mono text-primary text-[10px] tracking-widest uppercase font-bold">Front-end Overhaul</span>
                  <h3 class="text-2xl font-bold tracking-tight">Website Revamp</h3>
                  <p class="text-on-surface-variant text-sm max-w-md">Complete visual and UX restructure of the primary landing hub using modern tailwind standards.</p>
                </div>
                <!-- Item 2 -->
                <div class="relative flex flex-col gap-1 border-l-2 border-outline-variant/30 pl-6 py-2">
                  <div class="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-outline-variant" />
                  <span class="font-mono text-primary text-[10px] tracking-widest uppercase font-bold">Operations</span>
                  <h3 class="text-2xl font-bold tracking-tight">Game Release Plan Refresh</h3>
                  <p class="text-on-surface-variant text-sm max-w-md">Standardizing CI/CD workflows for multi-tenant game deployments across global nodes.</p>
                </div>
                <!-- Item 3: highlighted with terminal snippet -->
                <div class="relative flex flex-col gap-1 border-l-2 border-primary/50 pl-6 py-4 bg-primary/5 rounded-r-lg">
                  <div class="absolute left-[-5px] top-6 w-2 h-2 rounded-full bg-primary" />
                  <span class="font-mono text-primary text-[10px] tracking-widest uppercase font-bold">Major Release</span>
                  <h3 class="text-2xl font-bold tracking-tight">my-indie Launch</h3>
                  <div class="mt-3 p-3 bg-surface-container-highest rounded font-mono text-[10px] border border-outline-variant/20">
                    <div class="text-tertiary mb-1"># prod-deploy-successful</div>
                    <div class="flex gap-2">
                      <span class="text-primary">$</span>
                      <span class="text-on-surface-variant">sh deploy-main.sh --tag=v1.0.0-gold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ── 2022: Basic entry, content LEFT / year RIGHT ───── -->
        <section class="group relative">
          <div class="grid md:grid-cols-2 gap-12 items-start">
            <!-- Content: LEFT -->
            <div class="md:text-right md:pr-16 ml-12 md:ml-0">
              <!-- Mobile year label -->
              <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">2022</span>
              <div class="inline-flex items-center gap-2 mb-2 md:flex-row-reverse">
                <span class="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                <span class="font-mono text-primary text-xs tracking-widest uppercase font-bold">Technical Showcase</span>
              </div>
              <h3 class="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                Burning Beaver Event
              </h3>
              <p class="text-on-surface-variant mb-6 leading-relaxed max-w-lg md:ml-auto">
                Lead architect for the event's technical showcase, establishing core architectural principles.
              </p>
              <div class="inline-flex flex-wrap md:justify-end gap-2">
                <span class="px-2 py-1 bg-surface-container border border-outline-variant/30 text-[9px] font-mono uppercase text-on-surface-variant rounded">Event.Management</span>
                <span class="px-2 py-1 bg-surface-container border border-outline-variant/30 text-[9px] font-mono uppercase text-on-surface-variant rounded">Legacy.Architecture</span>
              </div>
            </div>
            <!-- Node -->
            <div class="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 z-10">
              <div class="w-3 h-3 bg-surface border-2 border-primary rounded-full ring-4 ring-primary/5 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300" />
            </div>
            <!-- Year: RIGHT (desktop only) -->
            <div class="hidden md:flex md:pl-16 items-baseline gap-4">
              <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">2022</span>
            </div>
          </div>
        </section>
      </div>

      <!-- ─── BENTO FOOTER ────────────────────────────────────── -->
      <section class="mt-48 grid md:grid-cols-4 gap-6">
        <!-- Future Perspective: spans 2 cols -->
        <div class="md:col-span-2 bg-surface-container-low p-10 rounded border border-white/5 relative overflow-hidden group">
          <div class="relative z-10">
            <div class="font-mono text-primary text-[10px] uppercase font-bold tracking-widest mb-4">Strategic Vision</div>
            <h4 class="text-2xl font-black tracking-tight mb-4 uppercase">Future Perspective</h4>
            <p class="text-on-surface-variant leading-relaxed max-w-md text-sm">
              Approaching 2026 with an uncompromising focus on system resilience. The transition from
              product-focused launches to infrastructure-level renewals defines the next chapter of
              engineering excellence.
            </p>
          </div>
          <span class="material-symbols-outlined absolute -bottom-8 -right-8 text-surface-container-highest text-[10rem] opacity-20 group-hover:rotate-45 transition-transform duration-500">architecture</span>
        </div>

        <!-- Core Tech -->
        <div class="bg-surface-container-high p-8 rounded border border-white/5 flex flex-col justify-between">
          <div>
            <span class="material-symbols-outlined text-primary mb-6 text-3xl block">memory</span>
            <h4 class="text-lg font-bold tracking-tight mb-2 uppercase">Core Tech</h4>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="bg-surface-container-lowest px-2 py-1 text-[9px] font-mono border border-outline-variant/20 uppercase rounded">React/Next.js</span>
            <span class="bg-surface-container-lowest px-2 py-1 text-[9px] font-mono border border-outline-variant/20 uppercase rounded">Rust</span>
            <span class="bg-surface-container-lowest px-2 py-1 text-[9px] font-mono border border-outline-variant/20 uppercase rounded">PostgreSQL</span>
            <span class="bg-surface-container-lowest px-2 py-1 text-[9px] font-mono border border-outline-variant/20 uppercase rounded">AWS/K8s</span>
          </div>
        </div>

        <!-- 05+ stat -->
        <div class="bg-primary/5 p-8 rounded border border-primary/20 flex flex-col justify-center items-center text-center">
          <div class="text-4xl font-black text-primary mb-1">05+</div>
          <div class="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">Years of Architectural Evolution</div>
          <button class="mt-6 font-mono text-[10px] text-primary uppercase border-b border-primary/30 hover:border-primary transition-all">
            Download Full Log
          </button>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
