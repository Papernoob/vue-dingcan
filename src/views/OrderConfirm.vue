<template>
  <div>
    <header>
      <van-nav-bar
        title="订单详情"
        left-arrow
        fixed
        @click-left="onClickLeft"
        color="#fff" />
    </header>
    <main>
      <van-card
        :num="item.selectedNum"
        :desc="`规格：${labelText(item.type)}`"
        :thumb="getGoodsDataById(item.id).good_img"
        v-for="item in shopCartList"
        :key="item.skuid"
        class="orderDetailCard">
        <template slot="title">
          <div style="margin-bottom: 10px">
            {{ getGoodsDataById(item.id).good_name }}
          </div>
        </template>
        <template slot="price">
          <span style="font-size: 16px; color: orangered">￥</span>
          <span style="font-size: 16px; color: orangered">{{ item.price }}</span>
        </template>
      </van-card>
    </main>
    <footer>
      <van-goods-action>
        <van-cell :value="getTotalPrice" style="width: 35%;font-size:16px" />
        <van-goods-action-button
          type="danger"
          text="立即支付"
          @click="onClickButton" />
      </van-goods-action>
    </footer>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
// import FoodsItem from '@/components/FoodsItemSlot.vue'
export default {
  name: 'OrderConfirmView',
  components: {
    // FoodsItem,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['shopCartList']),
    ...mapGetters(['getGoodsDataById', 'getTotalPrice']),
    labelText() {
      return t => {
        let type = ''
        switch (t) {
          case 's':
            type = '小份'
            break
          case 'n':
            type = '正常'
            break
          case 'l':
            type = '大份'
            break
          default:
            break
        }
        return type
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
  },
}
</script>
<style lang="less" scoped>
/deep/main {
  padding: 10px 10px 60px 10px;
}
/deep/.van-card {
  font-size: 16px;
}
</style>
