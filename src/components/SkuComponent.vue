<template>
  <van-sku
    v-model="show"
    :sku="skuData"
    :goods="goods"
    :goods-id="goodsData_id"
    :quota="0"
    :quota-used="0"
    :show-soldout-sku="false"
    :hide-stock="true"
    :initial-sku="initialSku"
    show-add-cart-btn
    reset-stepper-on-hide
    @add-cart="onAddCartClicked">
    <!-- 自定义 sku-header-price -->
    <template v-slot:sku-body-top>
      <van-image :src="goodsData_img" width="100%" fit="cover" />
    </template>

    <!-- 自定义 sku actions -->
    <template #sku-actions="props">
      <div class="van-sku-actions">
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
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      show: false,
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
      initialSku: {
        s1: 'n',
        selectedNum: 1,
      },
    }
  },
  computed: {
    ...mapState([
      'goodsData_img',
      'price_s',
      'price_n',
      'price_l',
      'goodsData_id',
    ]),
    ...mapGetters(['getlist']),
    skuData() {
      return {
        tree: this.tree,
        list: this.getlist(),
        price: this.price_n,
        stock_num: 100,
        none_sku: false,
        hide_stock: false,
      }
    },
    goods() {
      const imgsrc = this.goodsData_img
      return { picture: imgsrc }
    },
  },
  props: {},
  methods: {
    onAddCartClicked(target) {
      this.$store.dispatch('addShopCartAct', target)
      const sku = this.$children[0]
      sku.show = false
    },
  },
}
</script>
