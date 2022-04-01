<template class="cartWrap">
  <van-action-sheet
    v-model="show"
    closeable
    close-icon="cross"
    title="已选物品">
    <FoodsItemSlot>
      <Counter slot="right-part" />
    </FoodsItemSlot>
    <FoodsItemSlot>
      <Counter slot="right-part" />
    </FoodsItemSlot>
    <FoodsItemSlot>
      <Counter slot="right-part" />
    </FoodsItemSlot>
  </van-action-sheet>
</template>
<script>
import FoodsItemSlot from '@/components/FoodsItemSlot.vue'
import Counter from '@/components/Counter.vue'
export default {
  name: 'shoppingCart',
  components: {
    FoodsItemSlot,
    Counter,
  },
  data() {
    return {
      show: false,
      value: 0,
    }
  },
}
</script>
<style lang="less" scoped>
/deep/.cartWrap {
  margin-bottom: 75px;
}
/deep/.foodBox {
  position: relative;
}
/deep/.foodBox::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 16px;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
