<script setup lang="ts">
import type { Project } from '../types/project'

defineProps<{ project: Project }>()
</script>

<template>
  <div
    class="group bg-surface-container-high rounded-2xl overflow-hidden hover:bg-surface-container-highest transition-colors cursor-pointer"
    :class="project.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''"
  >
    <!-- Thumbnail -->
    <div
      class="w-full overflow-hidden"
      :class="project.size === 'large' ? 'h-52 lg:h-64' : 'h-44 lg:h-52'"
    >
      <img
        v-if="project.thumbnail"
        :src="project.thumbnail"
        :alt="project.title"
        class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
      />
      <div
        v-else
        class="w-full h-full bg-gradient-to-br from-primary/10 via-surface-container to-tertiary/10 flex items-center justify-center relative"
      >
        <div
          class="absolute inset-0 opacity-20"
          style="background-image: linear-gradient(rgba(192,193,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(192,193,255,0.15) 1px, transparent 1px); background-size: 32px 32px;"
        />
        <span class="font-mono text-xs text-on-surface-variant relative z-10">[ {{ project.title }} ]</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 lg:p-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <span class="font-mono text-tertiary text-xs tracking-widest">{{ project.year }}</span>
          <span class="font-mono text-on-surface-variant text-xs">// {{ project.tag }}</span>
        </div>
        <span class="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1 rounded">
          {{ project.metric }}
        </span>
      </div>

      <h2 class="font-sans text-xl lg:text-2xl font-semibold text-on-surface tracking-tight mb-3">
        {{ project.title }}
      </h2>
      <p class="text-on-surface-variant text-sm leading-relaxed mb-5">
        {{ project.desc }}
      </p>

      <!-- Stack tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="s in project.stack"
          :key="s"
          class="bg-surface-container-lowest font-mono text-tertiary text-xs px-2.5 py-1 rounded hover:bg-secondary-container transition-colors"
        >{{ s }}</span>
      </div>

      <!-- CTA -->
      <a
        v-if="project.ctaUrl"
        :href="project.ctaUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 text-primary font-mono text-sm group-hover:gap-3 transition-all"
      >
        {{ project.cta }}
        <span class="material-symbols-outlined text-base">{{ project.ctaIcon }}</span>
      </a>
      <button
        v-else
        class="flex items-center gap-2 text-primary font-mono text-sm group-hover:gap-3 transition-all"
      >
        {{ project.cta }}
        <span class="material-symbols-outlined text-base">{{ project.ctaIcon }}</span>
      </button>
    </div>
  </div>
</template>
