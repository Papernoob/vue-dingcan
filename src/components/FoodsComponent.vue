<template>
  <div class="foodBox">
    <van-image width="100" height="100" :src="`${imgsrc}`" fit="cover" />
    <van-cell title="面条" label="￥20">
      <van-stepper v-model="value" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'FoodsComponent',
  data () {
    return {
      imgsrc: 'https://img10.360buyimg.com/mobilecms/s360x360_jfs/t1/211736/6/11442/105720/61ea62a9E8e701498/feb0e03812ca0780.jpg!q70.dpg.webp',
      value: 0
    }
  }
}
</script>
<style lang="less" scoped>
.foodBox{
  display: flex;
}
/deep/.van-image{
  padding: 5px;
}
/deep/img{
  border-radius: 5px;
}
/deep/.van-cell{
  flex: auto;
  width: 50%;
  font-size: 20px;
}
/deep/.van-cell__title{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/deep/.van-cell__value{
  display: flex;
  flex-direction: column;
  justify-content: end;
}
/deep/.van-cell__label{
  color:orangered;
  font-size: 18px;
}
</style>
