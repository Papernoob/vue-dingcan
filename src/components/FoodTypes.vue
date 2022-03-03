<template>
  <div>
    <h4>{{title}}</h4>
    <div class="selctionBox">
      <div class="selction selected">小份</div>
      <div class="selction">中份</div>
      <div class="selction">大份</div>
    </div>
  </div>
</template>
<style lang="less" scoped="scoped">
  /deep/h4{
    padding: 0 16px 0;
  }
  .selctionBox{
    display: flex;
    width:100%;
    justify-content: space-around;
  }
  .selction{
    width:25%;
    padding: 2px;
    background-color: #f2f3f5;
    text-align: center;
  }
  .selction.selected{
    background-color:floralwhite;
    color: orange;
  }
</style>
<script>
export default {
  name: 'FoodTypes',
  props: ['title']
}
</script>
