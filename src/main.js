import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  Vant,
  render: h => h(App),
}).$mount('#app')
