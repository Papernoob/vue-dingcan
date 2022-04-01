<template>
  <van-sku
    v-model="show"
    :sku="sku"
    :goods="goods"
    :goods-id="goodsId"
    :quota="0"
    :quota-used="0"
    :show-soldout-sku="false"
    show-add-cart-btn
    reset-stepper-on-hide
    @add-cart="onAddCartClicked">
    <!-- 自定义 sku-header-price -->
    <template v-slot:sku-body-top>
      <van-image
        :src="goodsData.good_img"
        width="100%"
        fit="cover" />
    </template>

    <!-- 自定义 sku actions -->
    <template #sku-actions="props">
      <div class="van-sku-actions">
        <!-- <van-button square size="large" type="warning" @click="onPointClicked">
          积分兑换
        </van-button> -->
        <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
        <van-button
          square
          size="large"
          type="danger"
          @click="props.skuEventBus.$emit('sku:addCart')">
          加入购物车
        </van-button>
      </div>
    </template>
  </van-sku>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      show: false,
      goodsId: 123,
      shopid: 233,
      sku: {
        tree: [
          {
            k: '分量', // skuKeyName：规格类目名称
            k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: 's', // skuValueId：规格值 id
                name: '小份', // skuValueName：规格值名称
                // imgUrl: 'https://img01.yzcdn.cn/vant/cat.jpeg', // 规格类目图片，只有第一个规格类目可以定义图片
                // previewImgUrl: 'https://img01.yzcdn.cn/vant/cat.jpeg'// 用于预览显示的规格类目图片
              },
              {
                id: 'n', // skuValueId：规格值 id
                name: '正常', // skuValueName：规格值名称
              },
              {
                id: 'l', // skuValueId：规格值 id
                name: '大份', // skuValueName：规格值名称
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: 's', // 规格类目 k_s 为 s1 的对应规格值 id
            // s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId
            s1: 'n', // 规格类目 k_s 为 s1 的对应规格值 id
            // s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
          // {
          //   id: 2259, // skuId
          //   s1: '3', // 规格类目 k_s 为 s1 的对应规格值 id
          //   // s2: '2', // 规格类目 k_s 为 s2 的对应规格值 id
          //   price: 0, // 价格（单位分）
          //   stock_num: 1 // 当前 sku 组合对应的库存
          // }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 110, // 商品总库存
        // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 数据结构见下方文档
        picture: 'https://img01.yzcdn.cn/vant/cat.jpeg',
      },
      // skuData: {
      //   // 商品 id
      //   goodsId: '946755',
      //   // 留言信息
      //   messages: {
      //     message_0: '12',
      //     message_1: ''
      //   },
      //   // 选择的商品数量
      //   selectedNum: 1,
      //   // 选择的 sku 组合
      //   selectedSkuComb: {
      //     id: 2257,
      //     price: 100,
      //     s1: '30349',
      //     s2: '1193',
      //     s3: '0',
      //     stock_num: 111
      //   }
      // }
    }
  },
  computed: {
    ...mapState(['goodsData']),
  },
  props: {},
  methods: {
    onAddCartClicked(e) {
      console.log(e)
      const a = JSON.stringify(e)
      console.log(a)
    },
    gaibian() {
      console.log(this.sku.list)
    },
  },
}
</script>
