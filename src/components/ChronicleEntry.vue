<script setup lang="ts">
import type { ChronicleEntry } from '../types/experience'

const props = defineProps<{ entry: ChronicleEntry }>()
const mobilePeriod = props.entry.periodMobile ?? props.entry.period
const iconSize = props.entry.placeholderIconSize ?? '5rem'
</script>

<template>
  <div class="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">

    <!-- Mobile node (항상 최상단) -->
    <div class="md:hidden flex items-center gap-4 mb-4">
      <div class="w-3 h-3 rounded-full bg-tertiary node-pulse"></div>
      <span class="font-mono text-tertiary text-xs font-bold tracking-widest uppercase">{{ mobilePeriod }}</span>
    </div>

    <!-- Image placeholder -->
    <div :class="entry.side === 'left' ? 'order-1 md:order-2' : 'order-1'">
      <div class="h-48 w-full bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
        <span class="material-symbols-outlined text-outline-variant/30" :style="{ fontSize: iconSize }">
          {{ entry.placeholderIcon }}
        </span>
      </div>
    </div>

    <!-- Desktop node (spine 중앙) -->
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
      <div class="w-4 h-4 rounded-full bg-tertiary border-4 border-surface-dim node-pulse"></div>
    </div>

    <!-- Text -->
    <div
      class="flex flex-col justify-center order-2"
      :class="entry.side === 'left' ? 'md:text-right md:order-1' : ''"
    >
      <span class="font-mono text-tertiary mb-2 font-bold tracking-widest hidden md:block">{{ entry.period }}</span>
      <h3 class="text-3xl font-bold tracking-tight text-on-surface mb-2">{{ entry.title }}</h3>
      <p class="text-primary font-medium mb-4">{{ entry.role }}</p>
      <p
        class="text-on-surface-variant leading-relaxed max-w-md"
        :class="{ 'md:ml-auto': entry.side === 'left' }"
      >
        {{ entry.desc }}
      </p>
    </div>

  </div>
</template>
