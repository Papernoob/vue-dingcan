<template>
  <van-stepper slot="right-part" v-model="value" min="0"/>
</template>
<script>
export default {
  name: 'CounterComponent',
  data () {
    return {
      value: 1
    }
  }
}
</script>
