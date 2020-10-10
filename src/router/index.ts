import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Landing from '@/views/landing.vue'
import Scheduler from '@/views/scheduler.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/app',
    name: 'app',
    component: Scheduler,
    children: [
      {
        path: 'search',
        component: Landing
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
