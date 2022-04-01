import Vue from 'vue'
import Vuex from 'vuex'
import require from '@/utils/axios.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodsList: '',
    goodsListCount: '',
    categories: '',
    goodsData_img: '',
    goodsData_name: '',
    goodsData: '',
    price_s: '',
    price_n: '',
    price_l: '',
  },
  getters: {
    typeGoods(state) {
      return type => state.goodsList.filter(item => item.good_category === type)
    },
    getlist(state) {
      return () => {
        const p = state.goodsData.good_price
        const list = []
        for (const key in p) {
          if (p[key] !== '') {
            const price = Number.parseInt(p[key]) * 100
            const priceobj = {
              id: 'id_' + key + state.goodsData.good_id,
              s1: key,
              price: price,
              stock_num: 100,
            }
            list.push(priceobj)
          }
        }
        return list
        // return [
        //   {
        //     id: 'id_s' + state.goodsData.id,
        //     s1: 's',
        //     price: state.goodsData.price.s,
        //     stock_num: 100,
        //   },
        // ]
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
      state.goodsData_img = value.good_img
      state.goodsData_name = value.good_name
      state.price_s = value.good_price.s
      state.price_n = value.good_price.n
      state.price_l = value.good_price.l
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
