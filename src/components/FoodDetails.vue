<template>
  <van-action-sheet v-model="show" closeable close-icon="cross" title="面条">
    <div class="content">
      <van-image
        width="100%"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
        fit="cover" />
      <template>
        <FoodTypes title="份量" />
        <FoodTypes title="口味"></FoodTypes>
      </template>
    </div>
  </van-action-sheet>
</template>
<script>
import FoodTypes from '@/slot/FoodTypes.vue'

export default {
  data() {
    return {
      show: true,
    }
  },
  components: {
    FoodTypes,
  },
  methods: {},
}
</script>

<style lang="less" scoped="scoped">
</style>
