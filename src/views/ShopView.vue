<template>
  <div>
    <!-- 店铺信息 -->
    <header>
      <div class="shopDetailBox">
        <!-- <div class="shopIma">
          <img
            src=""
            alt=""
            style="background: gray; width: 100px; height: 100px" />
        </div> -->
        <van-image
          width="100"
          height="100"
          class="shopImg"
          :src="shopImg"
          fit="cover"></van-image>
        <div class="shopDetail" style="margin-left: 10px">
          <h2 class="shopName">{{ shopName }}</h2>
          <span>公告：欢迎光临本店，很高兴为您服务。</span>
        </div>
      </div>
    </header>
    <main ref="mainbox">
      <!-- 左侧边栏导航 -->
      <van-sticky>
        <van-sidebar v-model="active" ref="sidebarNav" id="sideBarNav">
          <van-sidebar-item
            :title="item.category"
            v-for="item in categories"
            :key="item.id"
            @click="scollVerticalPosition($event)" />
        </van-sidebar>
      </van-sticky>

      <!-- 右餐品list -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div
          class="goodsCategoryWrap"
          v-for="item in categories"
          :key="item.id"
          :ref="`category${item.id}`">
          <h4>{{ item.category }}</h4>
          <FoodsItemSlot
            v-for="goods in typeGoods(item.id)"
            :key="goods.good_id"
            :goodsDetail="goods"
            :price="goods.good_price.n"
            @eventSelectSku="handlerSelectSku" />
        </div>
      </van-list>
      <!-- <FoodsDetails></FoodsDetails> -->
      <Sku-Component ref="skuCompent" />
    </main>
    <footer>
      <ShoppingCart class="shoppingCartBox" ref="ShoppingCart" />
      <van-goods-action class="settlementBar">
        <van-goods-action-icon
          icon="shopping-cart"
          color="#f46b45"
          @click="shopCart"
          :badge="getCartListBadge"
          class="footer" />
        <p>
          <span>{{ getTotalPrice }}</span>
        </p>
        <van-button
          color="#f46b45"
          text="立即结算"
          size="normal"
          round
          @click="onClickButton" />
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import FoodsItemSlot from '@/components/FoodsItemSlot.vue'
// import FoodsDetails from '@/components/FoodDetails.vue'
import SkuComponent from '@/components/SkuComponent.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
import { mapState, mapGetters } from 'vuex'
import require from '@/utils/axios'
export default {
  name: 'ShopView',
  components: {
    FoodsItemSlot,
    // FoodsDetails,
    SkuComponent,
    ShoppingCart,
  },

  data() {
    return {
      active: 0,
      shopName: '',
      shopImg: '',
      loading: false,
      finished: false,
      // showSku: false,
      // totalPrice: 20,
      // badge: 15,
      scrollTops: null,
      shopList: null,
      // skuData: null,
    }
  },

  computed: {
    ...mapState(['goodsList', 'categories']),
    ...mapGetters(['typeGoods', 'getCartListBadge', 'getTotalPrice']),
    /**
     * 获取tab标签对应盒子的scrolltop
     */
    scrollTop() {
      const c1 = this.$refs.category1[0].offsetTop
      const c2 = this.$refs.category2[0].offsetTop
      const c3 = this.$refs.category3[0].offsetTop
      const c4 = this.$refs.category4[0].offsetTop
      return [c1, c2, c3, c4]
    },
  },
  created() {
    this.init()
  },
  mounted() {
    // // 侦听滚动事件确保侧边导航在顶部
    window.addEventListener('scroll', this.handlerScroll)
    // this.handlerScroll()
    // console.log(this.$refs)
  },
  updated() {},
  methods: {
    init() {
      this.$store.dispatch('getAllgoodsAct')
      this.$store.dispatch('getAllcategoriesAct')
      this.getShopData()
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 5; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list.length >= 10) {
      //     this.finished = true
      //   }
      // }, 1000)
      setTimeout(() => {
        // this.loading = false
        this.finished = true
      }, 3000)
    },
    async getShopData() {
      try {
        const { data } = await require.get('users/getUser')
        this.$store.commit('shopDetailMut', data.nickname)
        this.shopName = data.nickname
        this.shopImg = data.user_img
      } catch (error) {
        console.log(error)
      }
    },
    shopCart() {
      const sc = this.$refs.ShoppingCart
      sc.toggleShow()
    },
    async onClickButton() {
      await this.$nextTick()
      if (this.getCartListBadge === 0) return this.$toast('你还未选择商品')
      this.$toast.loading({
        forbidClick: true,
        loadingType: 'spinner',
        duration: 500,
      })
      return setTimeout(() => {
        // const id = this.$route.params.id
        this.$router.push({
          // path: `/${id}/confirm`,
          name: 'OrderConfirmView',
          params: { select: true },
        })
      }, 500)
    },

    /**
     * 点击tab标签移动到对应位置
     */
    scollVerticalPosition(index) {
      const category = 'category' + (index + 1)
      const target = this.$refs[category][0]
      window.scrollTo({
        top: target.offsetTop,
        // behavior: 'smooth',  //  平滑模式
      })
    },

    /**
     *  滚动高度位置对应tab标签
     */
    handlerScroll() {
      const href = 'http://localhost:8080/#/'
      if (window.location.href !== href) return 0
      const tops = this.scrollTop
      if (window.scrollY < tops[1] / 2) this.active = 0
      else if (window.scrollY < (tops[2] / 4) * 3) this.active = 1
      else if (window.scrollY < (tops[3] / 4) * 3) this.active = 2
      else if (window.scrollY > (tops[3] / 4) * 3) this.active = 3
    },
    /**
     * 控制展示sku
     */
    handlerSelectSku(target) {
      this.$store.commit('goodsDataMut', target) //  传入当前选中的目标的对象
      const sku = this.$refs.skuCompent.$children[0] //  获取个人组件实例里的sku组件
      sku.resetSelectedSku() // 调用重置初始化
      sku.show = true //  展示
    },
  },
}
</script>
<style lang="less" scoped="scoped">
@safeBottom: 80px;
header {
  height: 25vh;
  margin-bottom: 12vh;
  background-image: linear-gradient(
    to bottom,
    #ff3700,
    #eea849,
    rgba(0, 0, 0, 0)
  );
}
.shopDetailBox {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 94%;
  padding: 5px;
  top: 60%;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
}
main {
  display: grid;
  grid-template-columns: 1fr 3.333fr;
}
/deep/.van-sticky--fixed {
  z-index: -1;
}
/deep/.van-sidebar {
  display: inline-block;
  position: relative;
  top: 0;
  height: 100vh;
  background-color: #f7f8fa;
}
/deep/.van-list {
  display: inline-block;
  width: 100%;
  margin-bottom: @safeBottom;
}
footer {
  position: fixed;
  bottom: 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px 10px 0 0;
  height: 75px;
  width: 100%;
  z-index: 999;
}
/deep/.van-goods-action {
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  height: 75px;
}
/deep/.van-goods-action-icon__icon {
  font-size: 30px;
}
/deep/.van-goods-action-icon {
  background-color: initial;
}
/deep/.settlementBar {
  z-index: 2045;
  border-radius: 10px 10px 0 0;
}
/deep/.shoppingCartBox {
  margin-bottom: 50px;
  padding-bottom: 30px;
}
</style>
