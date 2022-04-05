<template>
  <div>
    <!-- 顶部导航栏 -->
    <header>
      <van-nav-bar
        title="商家已接单"
        left-arrow
        @click-left="onClickLeft"
        color="#fff" />
    </header>
    <main>
      <!-- 取单号 -->
      <div class="orderNumberWrap">取餐号：{{ mealNum }}</div>
      <!-- 食物订单列表 -->
      <van-cell-group>
        <van-cell :title="shopName" icon="shop" />
        <div class="orderDetail wrap">
          <!-- 订单编号 -->
          <van-cell title="订单编号：" :label="nanoid" />
          <van-cell title="下单时间：" :label="orderCreatedTime" />
        </div>
      </van-cell-group>
      <!-- 订单信息 -->
      <van-card
        :num="item.selectedNum"
        :desc="`规格：${labelText(item.type)}`"
        :thumb="getGoodsDataById(item.id).good_img"
        v-for="item in cartItems"
        :key="item.skuid"
        class="orderDetail wrap">
        <template slot="title">
          <div style="margin-bottom: 10px">
            {{ getGoodsDataById(item.id).good_name }}
          </div>
        </template>
        <template slot="price">
          <span style="font-size: 16px; color: orangered">￥</span>
          <span style="font-size: 16px; color: orangered">{{
            item.price
          }}</span>
        </template>
      </van-card>
    </main>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import mixins from '@/utils/mixins'
export default {
  name: 'OrderingView',
  data() {
    return {
      cartItems: '',
      mealNum: '',
    }
  },
  mixins: [mixins],
  computed: {
    ...mapState(['nanoid', 'orderCreatedTime', 'shopName']),
    ...mapGetters(['getGoodsDataById']),
  },
  methods: {
    onClickLeft() {
      const id = this.$route.params.id
      this.$router.push(`/${id}/shop`)
    },
  },
  created() {
    this.cartItems = this.$route.params.cartItems
    this.mealNum = this.$route.params.number
  },
}
</script>
<style lang="less" scoped>
@h: 20vh;
@titleHeight: 46px;
@sideDistance: 10px;
@color-gray: #c8c9cc;
main {
  position: relative;
  min-height: 80vh;
  background-color: #f7f8fa;
}
.border-radius5 {
  border-radius: 5px;
}
.sideMargin {
  margin-left: @sideDistance;
  margin-right: @sideDistance;
}
/deep/.wrap {
  padding: 10px 16px;
  .border-radius5();
  margin-top: 5px;
  background-color: white;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
/deep/header {
  padding-top: constant(safe-area-inset-top); //兼容 IOS<11.2
  padding-top: env(safe-area-inset-top); //兼容 IOS>11.2
  height: @h;
  background-image: linear-gradient(to bottom, #ff3700, #eea849, #f7f8fa);
}
/deep/.van-nav-bar {
  background-color: transparent;
  &.van-hairline--bottom::after {
    border: none;
  }
  .van-icon {
    color: white;
  }
  .van-nav-bar__title {
    color: white;
  }
}
/deep/.orderNumberWrap {
  position: absolute;
  top: -65px;
  width: calc(100% - (2 * @sideDistance));
  height: @titleHeight;
  box-sizing: content-box;
  -webkit-box-sizing: content-box;
  background-color: white;
  font-size: 24px;
  font-weight: bolder;
  text-align: center;
  line-height: @titleHeight;
  .border-radius5();
  .sideMargin();
}
/deep/.foodOrderList div {
  padding: 3px;
}
.hairline::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  transform:scaley(.5) & {
    position: relative;
  }
}
/deep/.van-cell__label {
  font-size: 16px;
}
</style>
