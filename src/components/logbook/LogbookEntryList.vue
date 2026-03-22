<script setup lang="ts">
import type { LogListEntry } from '../../types/logbook'

withDefaults(defineProps<{ entry: LogListEntry; last?: boolean }>(), { last: false })
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

      <!-- List -->
      <div :class="entry.side === 'left' ? 'md:pr-16 ml-12 md:ml-0' : 'md:pl-16 ml-12 md:ml-0'">
        <span class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">{{ entry.year }}</span>
        <div class="space-y-6">
          <div
            v-for="item in entry.items"
            :key="item.title"
            class="relative flex flex-col gap-1 pl-6 py-2"
            :class="item.highlight
              ? 'border-l-2 border-primary/50 py-4 bg-primary/5 rounded-r-lg'
              : 'border-l-2 border-outline-variant/30'"
          >
            <div
              class="absolute left-[-5px] w-2 h-2 rounded-full"
              :class="[item.highlight ? 'top-6 bg-primary' : 'top-4 bg-outline-variant']"
            />
            <span class="font-mono text-primary text-[10px] tracking-widest uppercase font-bold">{{ item.label }}</span>
            <h3 class="text-2xl font-bold tracking-tight">{{ item.title }}</h3>
            <p class="text-on-surface-variant text-sm max-w-md">{{ item.desc }}</p>
            <!-- Terminal snippet (highlight 항목 전용) -->
            <div
              v-if="item.terminal"
              class="mt-3 p-3 bg-surface-container-highest rounded font-mono text-[10px] border border-outline-variant/20"
            >
              <div class="text-tertiary mb-1">{{ item.terminal.comment }}</div>
              <div class="flex gap-2">
                <span class="text-primary">$</span>
                <span class="text-on-surface-variant">{{ item.terminal.command }}</span>
              </div>
            </div>
          </div>
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
