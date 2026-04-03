import { createRouter, createWebHistory } from 'vue-router'
import ProductionSheetForm from '@/components/ProductionSheetForm.vue'

const routes = [
  {
    path: '/',
    redirect: '/production'
  },
  {
    path: '/production',
    name: 'Production',
    component: ProductionSheetForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
