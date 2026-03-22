<script setup lang="ts">
import type { LogProgressEntry } from '../../types/logbook'

withDefaults(defineProps<{ entry: LogProgressEntry; last?: boolean }>(), { last: false })
</script>

<template>
  <section class="group relative" :class="{ 'mb-32': !last }">
    <div class="grid md:grid-cols-2 gap-12 items-start">

      <!-- Year LEFT (side === 'right' 일 때) -->
      <div v-if="entry.side === 'right'" class="hidden md:flex md:pr-16 flex-row-reverse items-baseline gap-4">
        <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">
          {{ entry.year }}
        </span>
      </div>

      <!-- Content -->
      <div :class="entry.side === 'left' ? 'md:pr-16 ml-12 md:ml-0' : 'md:pl-16 ml-12 md:ml-0'">
        <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">{{ entry.year }}</span>
        <div class="inline-flex items-center gap-2 mb-2">
          <span class="material-symbols-outlined text-primary text-sm">{{ entry.icon }}</span>
          <span class="font-mono text-primary text-xs tracking-widest uppercase font-bold">{{ entry.label }}</span>
        </div>
        <h3 class="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
          {{ entry.title }}
        </h3>
        <p class="text-on-surface-variant mb-6 leading-relaxed max-w-lg">
          {{ entry.desc }}
        </p>
        <!-- Progress bar card -->
        <div class="bg-surface-container-low p-4 rounded border border-outline-variant/10 max-w-sm">
          <div class="flex justify-between items-start mb-2">
            <span class="material-symbols-outlined text-primary text-xl">{{ entry.progress.icon }}</span>
            <span class="text-[10px] font-mono text-on-surface-variant uppercase">{{ entry.progress.label }}</span>
          </div>
          <div class="w-full bg-outline-variant/10 h-1 mt-1 rounded-full overflow-hidden">
            <div class="bg-primary h-full" :style="{ width: `${entry.progress.value}%` }" />
          </div>
        </div>
      </div>

      <!-- Node -->
      <div class="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 z-10">
        <div class="w-3 h-3 bg-surface border-2 border-primary rounded-full ring-4 ring-primary/5 group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300" />
      </div>

      <!-- Year RIGHT (side === 'left' 일 때) -->
      <div v-if="entry.side === 'left'" class="hidden md:flex md:pl-16 items-baseline gap-4">
        <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">
          {{ entry.year }}
        </span>
      </div>

    </div>
  </section>
</template>
