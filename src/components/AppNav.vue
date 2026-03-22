<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Logbook', to: '/logbook' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass-nav' : 'bg-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-1.5">
          <span class="font-mono text-tertiary text-sm tracking-widest">›_</span>
          <span
            class="font-mono font-bold text-on-surface tracking-widest uppercase text-sm"
            style="text-shadow: 0 0 20px rgba(99, 102, 241, 0.45)"
          >DEREK</span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="font-mono text-sm transition-colors relative pb-1.5"
            :class="route.path === link.to
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'"
          >
            {{ link.label }}
            <span
              v-if="route.path === link.to"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tertiary shadow-[0_0_8px_rgba(76,215,246,0.7)]"
            />
          </RouterLink>
          <a
            href="mailto:hello@kinetic.arch"
            class="bg-gradient-primary text-on-primary text-sm font-medium px-5 py-2 rounded-md transition-opacity hover:opacity-90"
          >Hire Me</a>
        </div>

        <!-- Mobile Hamburger -->
        <button
          class="md:hidden text-on-surface-variant hover:text-on-surface p-2"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          aria-label="Toggle menu"
        >
          <div class="w-5 flex flex-col gap-1.5">
            <span
              class="block h-px bg-current transition-all duration-300"
              :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
            />
            <span
              class="block h-px bg-current transition-all duration-300"
              :class="isMobileMenuOpen ? 'opacity-0' : ''"
            />
            <span
              class="block h-px bg-current transition-all duration-300"
              :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            />
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden glass-nav border-t border-outline-variant/20"
      >
        <div class="px-6 py-6 flex flex-col gap-5">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="font-mono text-sm transition-colors flex items-center gap-2"
            :class="route.path === link.to
              ? 'text-primary'
              : 'text-on-surface-variant hover:text-on-surface'"
            @click="isMobileMenuOpen = false"
          >
            <span
              class="w-1 h-1 rounded-full transition-all duration-300"
              :class="route.path === link.to
                ? 'bg-tertiary shadow-[0_0_8px_rgba(76,215,246,0.7)]'
                : 'bg-transparent'"
            />
            {{ link.label }}
          </RouterLink>
          <a
            href="mailto:hello@kinetic.arch"
            class="bg-gradient-primary text-on-primary text-sm font-medium px-5 py-2.5 rounded-md text-center"
            @click="isMobileMenuOpen = false"
          >Hire Me</a>
        </div>
      </div>
    </Transition>
  </nav>
</template>
