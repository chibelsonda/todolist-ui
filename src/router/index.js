import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/layout/Default.vue'),
      children: [
        {
          path: '/tasks',
          name: 'Tasks',
          meta: {
            label: 'Tasks', 
          }, 
          component: () => import('@/views/TaskView.vue'),
        },
      ]
    },
  ],
})

export default router
