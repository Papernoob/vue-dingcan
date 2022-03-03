<template class="cartWrap">
  <van-action-sheet v-model="show" closeable close-icon='cross' title="面条">
    <FoodsItemSlot>
        <van-stepper slot="selectSku" v-model="value" min="1"/>
    </FoodsItemSlot>
  </van-action-sheet>
</template>
<script>
import FoodsItemSlot from '@/components/FoodsItemSlot.vue'
export default {
  name: 'shoppingCart',
  components: {
    FoodsItemSlot
  },
  data () {
    return {
      show: true,
      value: 0
    }
  }
}
</script>
<style lang="less" scoped>
  /deep/.cartWrap{
    margin-bottom: 75px;
  }
</style>
