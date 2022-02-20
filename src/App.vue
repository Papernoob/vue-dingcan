<template>
  <div>
     <!-- 占位符 -->
     <router-view>
     </router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
  // methods: {
  //   onClickIcon () {
  //     return this.$toast('点击图标')
  //   },
  //   onClickButton () {
  //     return this.$toast('点击按钮')
  //   }
  // }
  methods: {
    onClickLeft () {
      this.$toast('点击了返回')
    }
  }
}
</script>
