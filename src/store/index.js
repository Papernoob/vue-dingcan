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
    goodsData_id: '',
    goodsData: '',
    price_s: '',
    price_n: '',
    price_l: '',
    shopCartList: [],
    totalPrices: 0,
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
    getCartListBadge(state) {
      return state.shopCartList.length
    },
    getGoodsDataById(state) {
      return id => {
        const goods = state.goodsList.filter(item => item.good_id === id)
        return goods[0]
      }
    },
    getTotalPrice(state) {
      state.totalPrices = 0
      if (state.shopCartList.length === 0) return null
      for (let index = 0; index < state.shopCartList.length; index++) {
        state.totalPrices +=
          state.shopCartList[index].price *
          state.shopCartList[index].selectedNum
      }
      return '合计：￥' + state.totalPrices
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
      state.goodsData_id = value.good_id
      state.price_s = value.good_price.s
      state.price_n = value.good_price.n
      state.price_l = value.good_price.l
    },
    addShopCartMut(state, value) {
      // 数组为0直接添加 跳过啊下面操作
      console.log(value)
      if (state.shopCartList.length === 0) return state.shopCartList.push(value)
      const hasSame = state.shopCartList.find(item => {
        if (item.skuid === value.skuid) {
          item.selectedNum += value.selectedNum
          return item
        }
        return undefined
      })
      if (hasSame === undefined) return state.shopCartList.push(value)
    },
    CartGoodsPlusMut(state, value) {
      state.shopCartList.find(item => {
        if (item.skuid === value) {
          item.selectedNum++
        }
        return item
      })
    },

    CartGoodsMinusMut(state, value) {
      const list = state.shopCartList
      //  find函数默认返回符合条件对象或者undefined 此处不符合要求都返回undefined
      //  如果能找到相同skuid且数量不为1则减一且返回undefined
      //  skuid相同，不能再减才返回该对象
      const res = list.find(item => {
        if (item.skuid === value) {
          if (item.selectedNum === 1) {
            return item
          } else {
            item.selectedNum--
            return undefined
          }
        }
        return undefined
      })
      //  根据返回对象删除在shopList中自身
      if (res !== undefined) {
        state.shopCartList = list.filter(item => item.skuid !== res.skuid)
      }
    },
  },
  actions: {
    getAllgoodsAct: async context => {
      try {
        const { data } = await require.get('api/goods')
        /* data  该返回有两个属性goods和listcount */
        context.commit('allGoodsMut', data.goods)
      } catch (error) {
        console.log('出错')
        console.log(error)
      }
    },
    getAllcategoriesAct: async context => {
      try {
        const { data } = await require.get('/api/categories')
        /* data  该返回有两个属性goods和listcount */
        context.commit('allCategoriesMut', data.categories)
      } catch (error) {
        console.log('出错')
        console.log(error)
      }
    },
    addShopCartAct: (context, goods) => {
      const selectedSkuComb = goods.selectedSkuComb
      const price = Number.parseInt(selectedSkuComb.price) / 100
      const shopItem = {
        id: goods.goodsId,
        skuid: selectedSkuComb.id,
        type: selectedSkuComb.s1,
        price: price,
        selectedNum: goods.selectedNum,
      }
      context.commit('addShopCartMut', shopItem)
    },
    // CartGoodsPlusAct: (context, skuid) => {
    //   const list = context.state.shopCartList
    //   list.find((item, index) => {)
    // },
    // CartGoodsMinusAct: (context, skuid) => {},
  },
  modules: {},
})
