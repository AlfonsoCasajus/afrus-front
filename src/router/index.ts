import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../modules/products/views/ProductsView.vue'),
    },
    {
      path: '/productos',
      name: 'products',
      component: () => import('../modules/products/views/ProductsView.vue'),
    },
    {
      path: '/compradores',
      name: 'about',
      component: () => import('../modules/buyers/views/BuyersView.vue'),
    },
  ],
})

export default router
