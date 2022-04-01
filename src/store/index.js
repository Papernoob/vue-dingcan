import Vue from 'vue'
import Vuex from 'vuex'
import require from '@/utils/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: '',
    goodsListCount: '',
    categories: '',
    goodsData: '',
  },
  getters: {
    typeGoods(state) {
      return type => state.goodsList.filter(item => item.good_category === type)
    },
    getlist(state) {
      return () => {
        const p = state.goodsData.good_price
        const a = []
        for (const key in p) {
          a.push(key)
        }
        return a
      }
    },
  },
  mutations: {
    allGoodsMut(state, value) {
      state.goodsList = value
      state.goodsListCount = value.length
    },
    allCategoriesMut(state, value) {
      state.categories = value
    },
    goodsDataMut(state, value) {
      state.goodsData = value
    },
  },
  actions: {
    getAllgoodsAct: async context => {
      try {
        const { data } = await require.get('/goods')
        /* data  该返回有两个属性goods和listcount */
        context.commit('allGoodsMut', data.goods)
      } catch (error) {
        console.log('出错')
        console.log(error)
      }
    },
    getAllcategoriesAct: async context => {
      try {
        const { data } = await require.get('/categories')
        /* data  该返回有两个属性goods和listcount */
        context.commit('allCategoriesMut', data.categories)
      } catch (error) {
        console.log('出错')
        console.log(error)
      }
    },
  },
  modules: {},
})
