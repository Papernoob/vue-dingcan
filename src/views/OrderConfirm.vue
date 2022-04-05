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
          <span style="font-size: 16px; color: orangered">{{
            item.price
          }}</span>
        </template>
      </van-card>
    </main>
    <footer>
      <van-goods-action>
        <van-cell :value="getTotalPrice" style="width: 35%; font-size: 16px" />
        <van-goods-action-button
          type="danger"
          text="立即支付"
          @click="orderConfirm" />
      </van-goods-action>
    </footer>
  </div>
</template>
<script>
import { nanoid } from 'nanoid'
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import mixins from '@/utils/mixins'
import require from '@/utils/axios'
export default {
  name: 'OrderConfirmView',
  components: {
  },
  mixins: [mixins],
  data() {
    return {}
  },
  computed: {
    ...mapState(['shopCartList']),
    ...mapGetters(['getGoodsDataById', 'getTotalPrice']),
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async orderConfirm() {
      //  提示符号
      this.$toast.loading({
        forbidClick: true,
        loadingType: 'spinner',
        // duration: 1000,
      })
      //  生成nanoid和时间
      const nid = nanoid()
      const createdTime = moment().format()

      //  发送结算请求 此处模拟异步
      const settlement = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const boolean = true // 控制是否成功结算
            // const boolean = false // 控制是否成功结算
            if (boolean) return resolve('success')
            return reject(new Error('fault'))
          }, 2000)
        })
      }
      try {
        // 暂存购物车内容通过router传送
        const goodsItems = [...this.shopCartList]
        await settlement()
        this.$store.commit('OrderingConfirmMut', {
          nanoid: nid,
          createdTime: createdTime,
        })
        const tid = this.$route.params.id
        const ordering = {
          nanoid: nid,
          createdTime: createdTime,
          cartItems: goodsItems,
          tableId: tid,
        }
        const { data } = await require.post('/api/orders', {
          ordering: ordering,
        })
        this.$router.push({
          name: 'OrderingView',
          query: { paid: 'hadpaid' },
          params: { cartItems: goodsItems, number: data },
        })
      } catch (error) {
        this.$toast('支付失败')
      }
    },
  },
}
</script>
<style lang="less" scoped>
/deep/main {
  padding: 50px 10px 60px 10px;
}
/deep/.van-card {
  font-size: 16px;
}
</style>
