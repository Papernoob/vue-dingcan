<template class="cartWrap">
  <van-action-sheet
    v-model="show"
    closeable
    close-icon="cross"
    title="已选物品">
    <FoodsItemSlot
      v-for="item in shopCartList"
      :key="item.skuid"
      :goodsDetail="getGoodsDataById(item.id)"
      :price="item.price"
      :type="item.type">
      <Counter
        slot="right-part"
        :num="item.selectedNum"
        @eventPlusBtnClick="handlerPlusBtnClick(item.skuid)"
        @eventMinusBtnClick="handlerMinusBtnClick(item.skuid)" />
    </FoodsItemSlot>
  </van-action-sheet>
</template>
<script>
import FoodsItemSlot from '@/components/FoodsItemSlot.vue'
import Counter from '@/components/Counter.vue'
import { mapState, mapGetters } from 'vuex'
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
  computed: {
    ...mapState(['shopCartList']),
    ...mapGetters(['getGoodsDataById']),
  },
  methods: {
    toggleShow() {
      this.show ? (this.show = false) : (this.show = true)
    },
    handlerPlusBtnClick(id) {
      this.$store.commit('CartGoodsPlusMut', id)
    },
    handlerMinusBtnClick(id) {
      this.$store.commit('CartGoodsMinusMut', id)
    },
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
  bottom: -10px;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
