<template>
  <div>
    <!-- 店铺信息 -->
    <header>
      <div class="shopDetailBox">
         <div class="shopImage">
          <img src="" alt="" style="background:gray;width: 100px;height:100px;"/>
        </div>
        <div class="shopDetail">
          <h2 class="shopName">沙县小吃</h2>
          <span>公告：欢迎光临本店，很高兴为您服务。</span>
        </div>
      </div>
    </header>
    <main ref="mainbox">
    <!-- 左侧边栏导航 -->
      <van-sidebar v-model="active" ref="sidebarNav" id="sideBarNav">
        <van-sidebar-item title="类别1" />
        <van-sidebar-item title="类别2" />
        <van-sidebar-item title="类别3" />
      </van-sidebar>
    <!-- 右餐品list -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <FoodsItemSlot/>
      </van-list>
      <!-- <FoodsDetails></FoodsDetails> -->
      <Sku-Component :showOrNot="showSku"/>
    </main>
    <footer>
      <ShoppingCart class="shoppingCartBox"/>
      <van-goods-action class="settlementBar">
        <van-goods-action-icon icon="shopping-cart" color="#f46b45" @click="shopCart" :badge="`${badge}`" class="footer"/>
        <p>合计：<span>￥{{ totalPrice }}</span></p>
        <van-button
        color="#f46b45"
        text="立即结算"
        size="normal"
        round
        @click="onClickButton"/>
      </van-goods-action>
    </footer>
  </div>
</template>

<script>
import FoodsItemSlot from '@/components/FoodsItemSlot.vue'
// import FoodsDetails from '@/components/FoodDetails.vue'
import SkuComponent from '@/components/SkuComponent.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
export default {
  name: 'ShopView',
  components: {
    FoodsItemSlot,
    // FoodsDetails,
    SkuComponent,
    ShoppingCart
  },

  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      showSku: false,
      totalPrice: 20,
      badge: 15
    }
  },

  computed: {
  },
  mounted () { // 侦听滚动事件确保侧边导航在顶部
    window.addEventListener('scroll', this.handlerScroll)
  },
  methods: {
    handlerScroll () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
      const sideBarNav = this.$refs.sidebarNav.$el
      const offsetTop = this.$refs.mainbox.offsetTop
      if (scrollTop >= offsetTop) {
        sideBarNav.style.top = scrollTop - offsetTop + 'px'
      } else {
        sideBarNav.style.top = 0 + 'px'
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 10) {
          this.finished = true
        }
      }, 1000)
    },
    shopCart () {
    },
    onClickButton () {}
  }
}
</script>
<style lang="less" scoped="scoped">
  header{
    height: 25vh;
    margin-bottom: 12vh;
    background-image: linear-gradient(to bottom ,#ff3700,#eea849,rgba(0,0,0,0));
  }
  .shopDetailBox{
    display: flex;
    flex: 1;
    justify-content: space-around;
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
  main{
    display: flex;
    align-content: flex-start;
  }
  /deep/.van-sidebar{
    display: inline-block;
    position: relative;
    top: 0;
    height: 100vh;
    background-color: #f7f8fa;
  }
  /deep/.van-list{
    display: inline-block;
    height: 100vh;
    width: 100vw;
  }
  footer{
    position: fixed;
    bottom: 0;
    box-shadow:  0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 10px 10px 0 0;
    height: 75px;
    width: 100%;
  }
  /deep/.van-goods-action{
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    padding-right: 20px;
    height: 75px;
  }
  /deep/.van-goods-action-icon__icon{
    font-size: 30px;
  }
  /deep/.van-goods-action-icon{
    background-color: initial;
  }
  /deep/.settlementBar{
    z-index: 2045;
    border-radius: 10px 10px 0 0;
  }
  /deep/.shoppingCartBox{
    margin-bottom: 50px;
    padding-bottom: 30px;
  }
</style>
