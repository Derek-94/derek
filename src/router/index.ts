import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: (_to, _from, savedPosition) => {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/about',
      name: 'experience',
      component: () => import('../views/ExperienceView.vue'),
    },
    {
      path: '/logbook',
      name: 'logbook',
      component: () => import('../views/LogbookView.vue'),
    },
    {
      path: '/logbook/:slug',
      name: 'logbook-detail',
      component: () => import('../views/LogbookDetailView.vue'),
    },
  ],
})
