import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
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
  ],
})
