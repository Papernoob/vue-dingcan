<template>
  <div class="foodBox">
    <van-image width="100" :src="`${imgsrc}`" fit="cover" />
    <van-cell :title="`${name}`" :label="`￥${price.n}`">
      <!-- todo 点击选规格显示 -->
      <slot name="right-part">
        <van-button round type="warning" size="mini" @click="SelectSku"
          >选规格</van-button
        >
      </slot>
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'FoodsComponent',
  data() {
    return {
      name: this.goodsDetail.good_name,
      imgsrc: this.goodsDetail.good_img,
      price: this.goodsDetail.good_price,
      // goodsdata = goodsDetail,
      // imgsrc:
      //   'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/211736/6/11442/105720/61ea62a9E8e701498/feb0e03812ca0780.jpg!q70.dpg.webp',
      value: 1,
    }
  },
  methods: {
    SelectSku() {
      this.$emit('eventSelectSku', this.goodsDetail)
    },
  },
  props: ['goodsDetail'],
}
</script>
<style lang="less" scoped>
.foodBox {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  min-height: 80px;
}
/deep/.van-cell {
  padding: 0 10px 0;
}
/deep/.van-image {
  padding: 5px;
  align-self: center;
}
/deep/img {
  border-radius: 5px;
}
/deep/.van-cell {
  flex: auto;
  font-size: 20px;
}
/deep/.van-cell__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/deep/.van-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
/deep/.van-cell__label {
  color: orangered;
  font-size: 18px;
}
</style>
