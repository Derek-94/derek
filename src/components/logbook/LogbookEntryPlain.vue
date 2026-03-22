<script setup lang="ts">
import type { LogPlainEntry } from '../../types/logbook'

withDefaults(defineProps<{ entry: LogPlainEntry; last?: boolean }>(), { last: false })
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
      <div
        :class="entry.side === 'left'
          ? 'md:text-right md:pr-16 ml-12 md:ml-0'
          : 'md:pl-16 ml-12 md:ml-0'"
      >
        <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">{{ entry.year }}</span>
        <div
          class="inline-flex items-center gap-2 mb-2"
          :class="{ 'md:flex-row-reverse': entry.side === 'left' }"
        >
          <span class="material-symbols-outlined text-primary text-sm">{{ entry.icon }}</span>
          <span class="font-mono text-primary text-xs tracking-widest uppercase font-bold">{{ entry.label }}</span>
        </div>
        <h3 class="text-3xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
          {{ entry.title }}
        </h3>
        <p
          class="text-on-surface-variant mb-6 leading-relaxed max-w-lg"
          :class="{ 'md:ml-auto': entry.side === 'left' }"
        >
          {{ entry.desc }}
        </p>
        <!-- Commit badge -->
        <div
          v-if="entry.commit"
          class="flex flex-wrap gap-2"
          :class="{ 'md:justify-end': entry.side === 'left' }"
        >
          <div class="bg-surface-container-lowest border border-outline-variant/20 px-3 py-1 flex items-center gap-2 rounded">
            <span class="material-symbols-outlined text-[10px] text-on-surface-variant">{{ entry.commit.icon }}</span>
            <span class="text-[10px] font-mono uppercase tracking-tighter text-on-surface-variant">{{ entry.commit.text }}</span>
          </div>
        </div>
        <!-- Tag badges -->
        <div
          v-if="entry.tags?.length"
          class="inline-flex flex-wrap gap-2"
          :class="{ 'md:justify-end': entry.side === 'left' }"
        >
          <span
            v-for="tag in entry.tags"
            :key="tag"
            class="px-2 py-1 bg-surface-container border border-outline-variant/30 text-[9px] font-mono uppercase text-on-surface-variant rounded"
          >{{ tag }}</span>
        </div>
      </div>

      <!-- Node -->
      <div class="absolute left-4 md:left-1/2 top-2 md:-translate-x-1/2 z-10">
        <div class="w-3 h-3 bg-surface border-2 border-primary rounded-full ring-4 ring-primary/5 group-hover:bg-primary transition-all duration-300 node-pulse-primary" />
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
