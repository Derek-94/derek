<script setup lang="ts">
import type { Skill } from '../types/experience'

defineProps<{ skill: Skill }>()
</script>

<template>
  <!-- Desktop card -->
  <div class="hidden md:block bg-surface-container-low p-8 rounded-lg group hover:bg-surface-container-high transition-all duration-300">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-3">
        <img :src="skill.iconUrl" :alt="skill.name" class="w-8 h-8" />
        <span class="font-mono font-bold text-lg">{{ skill.name }}</span>
      </div>
      <span class="text-tertiary font-mono text-sm">{{ skill.tag }}</span>
    </div>
    <div class="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
      <div class="h-full bg-primary rounded-full" :style="{ width: skill.pct + '%' }"></div>
    </div>
    <div class="mt-4 flex justify-between text-xs font-mono uppercase tracking-widest opacity-60">
      <span>Proficiency</span>
      <span>{{ skill.pct }}%</span>
    </div>
  </div>

  <!-- Mobile card -->
  <div class="md:hidden bg-surface-container-low p-4 rounded-lg border-l border-primary/20">
    <div class="flex justify-between items-center mb-3">
      <div class="flex items-center gap-3">
        <img :src="skill.iconUrl" :alt="skill.name" class="w-6 h-6" />
        <span class="font-mono text-sm font-bold tracking-wide">{{ skill.name }}</span>
      </div>
      <span class="font-mono text-[10px] text-tertiary">{{ skill.pct }}%</span>
    </div>
    <div class="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
      <div class="h-full bg-primary rounded-full" :style="{ width: skill.pct + '%' }"></div>
    </div>
  </div>
</template>
