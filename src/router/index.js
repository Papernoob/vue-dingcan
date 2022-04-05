import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from '@/views/ShopView.vue'
import Ordering from '@/views/Ordering.vue'
import OrderConfirm from '@/views/OrderConfirm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/1/shop',
    component: ShopView,
  },
  { path: '/:id/shop', component: ShopView, name: 'shop' },
  {
    path: '/:id/confirm',
    name: 'OrderConfirmView',
    component: OrderConfirm,
    beforeEnter: (to, from, next) => {
      const isSelected = to.params.select
      if (from.name !== 'shop') {
        next({ path: `/${to.params.id}/shop` })
      } else if (isSelected !== true) {
        next({ path: `/${to.params.id}/shop` })
      } else {
        next()
      }
    },
  },
  {
    path: '/:id/ordering',
    name: 'OrderingView',
    component: Ordering,
    beforeEnter: (to, from, next) => {
      // 模拟检查是否已支付
      const checkout = to.query.paid
      if (from.name !== 'OrderConfirmView') {
        next({ path: `/${to.params.id}/shop` })
      } else if (checkout !== 'hadpaid') {
        next({ path: `/${to.params.id}/shop` })
      } else {
        next()
      }
    },
  },
]

const router = new VueRouter({
  routes,
})

export default router
