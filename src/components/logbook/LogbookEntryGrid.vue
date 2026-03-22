<script setup lang="ts">
import type { LogGridEntry } from '../../types/logbook'

withDefaults(defineProps<{ entry: LogGridEntry; last?: boolean }>(), { last: false })
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

      <!-- Cards grid -->
      <div
        :class="entry.side === 'left'
          ? 'md:pr-16 md:flex flex-col items-end order-2 md:order-1 ml-12 md:ml-0'
          : 'md:pl-16 ml-12 md:ml-0'"
      >
        <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">{{ entry.year }}</span>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div
            v-for="card in entry.cards"
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

      <!-- Year RIGHT (side === 'left' 일 때) -->
      <div v-if="entry.side === 'left'" class="hidden md:flex md:pl-16 order-1 md:order-2 items-baseline gap-4">
        <span class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">
          {{ entry.year }}
        </span>
      </div>

    </div>
  </section>
</template>
