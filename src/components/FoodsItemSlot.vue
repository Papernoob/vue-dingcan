<template>
  <div class="foodBox">
    <van-image width="100" :src="`${imgsrc}`" fit="cover" />
    <van-cell :title="`${name}`" :label="labelText">
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
      id: this.goodsDetail.good_id,
      name: this.goodsDetail.good_name,
      imgsrc: this.goodsDetail.good_img,
      value: 1,
    }
  },
  computed: {
    labelText: function () {
      let type = ''
      if (this.type) {
        switch (this.type) {
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
        return type + '￥' + this.price
      }
      return '￥' + this.price
    },
  },
  methods: {
    SelectSku() {
      this.$emit('eventSelectSku', this.goodsDetail)
    },
  },
  props: ['goodsDetail', 'price', 'type'],
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
