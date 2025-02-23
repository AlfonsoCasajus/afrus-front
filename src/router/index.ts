import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/compradores',
    },
    {
      path: '/productos',
      name: 'products',
      component: () => import('../modules/products/views/ProductsView.vue'),
    },
    {
      path: '/compradores',
      name: 'buyers',
      component: () => import('../modules/buyers/views/BuyersView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
