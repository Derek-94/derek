<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { LogPlainEntry } from '../../types/logbook'
import type { LogListItem } from '../../types/logbook'

withDefaults(defineProps<{ entry: LogPlainEntry; last?: boolean }>(), { last: false })
</script>

<template>
  <section class="group relative" :class="{ 'mb-32': !last }">
    <div class="grid md:grid-cols-2 gap-12 items-start">

      <!-- Year LEFT (side === 'right' 일 때) -->
      <div v-if="entry.side === 'right'" class="hidden md:flex md:pr-16 flex-row-reverse items-baseline gap-4">
        <span v-if="!entry.hideYear" class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">
          {{ entry.year }}
        </span>
      </div>

      <!-- Content -->
      <div
        :class="entry.side === 'left'
          ? 'md:text-right md:pr-16 ml-12 md:ml-0'
          : 'md:pl-16 ml-12 md:ml-0'"
      >
        <span v-if="!entry.hideYear" class="md:hidden font-black text-4xl tracking-tighter text-on-surface/40 mb-3 block">{{ entry.year }}</span>
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
        <!-- Post cards -->
        <div v-if="entry.cards?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
          <RouterLink
            v-for="card in entry.cards.filter(c => c.slug)"
            :key="card.title"
            :to="`/logbook/${card.slug}`"
            class="group/card relative p-5 rounded-lg border-l-2 border-primary/40 hover:border-primary transition-all cursor-pointer block text-left"
            style="background: rgba(32,31,31,0.4); backdrop-filter: blur(12px); border-top: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);"
          >
            <div class="font-mono text-[9px] text-primary mb-2 uppercase tracking-tighter">{{ card.category }}</div>
            <h4 class="text-sm font-bold uppercase mb-2 tracking-tight group-hover/card:text-primary transition-colors">{{ card.title }}</h4>
            <p class="text-[11px] text-on-surface-variant leading-tight mb-4">{{ card.desc }}</p>
            <div class="flex items-center gap-1 font-mono text-[9px] text-primary/60 group-hover/card:text-primary transition-colors uppercase tracking-widest">
              <span>Read Post</span>
              <span class="group-hover/card:translate-x-1 transition-transform inline-block">→</span>
            </div>
          </RouterLink>
          <div
            v-for="card in entry.cards.filter(c => !c.slug)"
            :key="card.title"
            class="p-5 rounded-lg border-l-2 border-primary/40 transition-all"
            style="background: rgba(32,31,31,0.4); backdrop-filter: blur(12px); border-top: 1px solid rgba(255,255,255,0.05); border-right: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05);"
          >
            <div class="font-mono text-[9px] text-primary mb-2 uppercase tracking-tighter">{{ card.category }}</div>
            <h4 class="text-sm font-bold uppercase mb-2 tracking-tight">{{ card.title }}</h4>
            <p class="text-[11px] text-on-surface-variant leading-tight">{{ card.desc }}</p>
          </div>
        </div>

        <!-- List items -->
        <div v-if="entry.items?.length" class="space-y-4 mb-6">
          <component
            :is="item.slug ? RouterLink : 'div'"
            v-for="item in entry.items"
            :key="item.title"
            :to="item.slug ? `/logbook/${item.slug}` : undefined"
            class="relative flex flex-col gap-1 py-2"
            :class="[
              entry.side === 'left' ? 'pr-6' : 'pl-6',
              item.highlight
                ? (entry.side === 'left' ? 'border-r-2 border-primary/50 py-4 bg-primary/5 rounded-l-lg' : 'border-l-2 border-primary/50 py-4 bg-primary/5 rounded-r-lg')
                : (entry.side === 'left' ? 'border-r-2 border-outline-variant/30' : 'border-l-2 border-outline-variant/30'),
              item.slug ? 'cursor-pointer hover:border-primary transition-colors group/item' : '',
            ]"
          >
            <div
              class="absolute w-2 h-2 rounded-full transition-colors"
              :class="[
                entry.side === 'left' ? 'right-[-5px]' : 'left-[-5px]',
                item.highlight ? 'top-6 bg-primary' : 'top-4 bg-outline-variant',
                item.slug ? 'group-hover/item:bg-primary' : '',
              ]"
            />
            <span class="font-mono text-primary text-[10px] tracking-widest uppercase font-bold">{{ item.label }}</span>
            <h4 class="text-lg font-bold tracking-tight" :class="{ 'group-hover/item:text-primary transition-colors': item.slug }">{{ item.title }}</h4>
            <p class="text-on-surface-variant text-sm max-w-md whitespace-pre-line" :class="{ 'md:ml-auto': entry.side === 'left' }">{{ item.desc }}</p>
          </component>
        </div>

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
        <span v-if="!entry.hideYear" class="text-7xl md:text-9xl font-black text-on-surface/10 tracking-tighter leading-none select-none group-hover:text-on-surface/30 transition-opacity">
          {{ entry.year }}
        </span>
      </div>

    </div>
  </section>
</template>
