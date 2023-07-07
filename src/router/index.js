import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/Layout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/Home/index.vue')
        },
        {
          path: 'category/:id',
          name: 'category',
          component: () => import('../views/Category/index.vue')
        },
        {
          path: 'category/sub/:id',
          name: 'subCategory',
          component: () => import('../views/SubCategory/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue')
    },
    
  ],
  // 路由滚动行为定制
  scrollBehavior () {
    return {
      top: 0
    }
  }
})

export default router
