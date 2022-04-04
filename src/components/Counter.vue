<template>
  <van-stepper
    slot="right-part"
    v-model="value"
    min="0"
    @plus="onPlusClick"
    @minus="onMinusClick" />
</template>
<script>
export default {
  name: 'CounterComponent',
  data() {
    return {
      value: this.num,
    }
  },
  props: ['num'],
  methods: {
    onPlusClick() {
      // console.log('增加')
      this.$emit('eventPlusBtnClick')
    },
    onMinusClick() {
      this.$emit('eventMinusBtnClick')
    },
  },
  watch: {
    num(newVal) {
      this.value = newVal
    },
  },
}
</script>
