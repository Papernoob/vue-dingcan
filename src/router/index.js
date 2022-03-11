import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from '@/views/ShopView.vue'
import Ordering from '@/views/Ordering.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ShopView',
    component: ShopView
  },
  {
    path: '/ordering',
    name: 'OrderingView',
    component: Ordering
  }
]

const router = new VueRouter({
  routes
})

export default router
