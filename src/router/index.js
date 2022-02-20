import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from '@/views/ShopView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ShopView',
    component: ShopView
  }
]

const router = new VueRouter({
  routes
})

export default router
