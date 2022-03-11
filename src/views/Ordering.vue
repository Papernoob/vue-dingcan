<template>
  <div>
    <!-- 顶部导航栏 -->
    <header>
      <van-nav-bar
        title="商家已接单"
        left-arrow
        @click-left="onClickLeft"
        color="#fff"
      />
    </header>
    <main>
      <!-- 取单号 -->
      <div class="orderNumberWrap">取餐号：66</div>
      <!-- 食物订单列表 -->
      <van-cell-group>
        <van-cell title="店家名" icon="shop"/>
        <van-cell>
          <foods-item-slot>
            <!-- <p slot="right-part">￥20</p> -->
            <!-- <template #right-part>
              <p>￥20</p>
            </template> -->
            <template slot="right-part">
              <span style="font-size:16px">数量x1</span>
              <span style="color:black">￥20</span>
            </template>
          </foods-item-slot>
        </van-cell>
      </van-cell-group>
      <!-- <div class="foodOrderList wrap">
        <div class="van-hairline--bottom">商店名字</div>
        <div> 食物列表</div>
      </div> -->
      <!-- 订单信息 -->
      <div class="orderDetail wrap">
        <!-- 订单编号 -->
        <span>订单编号111111</span>
        <!-- 下单时间 -->
      </div>
    </main>
  </div>
</template>
<script>
import FoodsItemSlot from '@/components/FoodsItemSlot.vue'
export default {
  name: 'OrderingView',
  components: {
    FoodsItemSlot
  },
  data () {
    return {
    }
  },

  methods: {
    onClickLeft () {}
  }
}
</script>
<style lang="less" scoped>
  @h:20vh;
  @titleHeight:46px;
  @sideDistance:10px;
  @color-gray:#c8c9cc;
  main{
    position: relative;
    height:calc(100vh - 46px);
    background-color: #f7f8fa;
    // margin-top: calc((@h - @titleHeight) * -1);
    }
  .border-radius5{
    border-radius: 5px;
  }
  .sideMargin{
    margin-left: @sideDistance;
    margin-right: @sideDistance;
  }
  /deep/.wrap{
    .sideMargin();
    .border-radius5();
    margin-top: 5px;
    padding: 3px;
    background-color: white;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  /deep/header{
    padding-top: constant(safe-area-inset-top);//兼容 IOS<11.2
    padding-top: env(safe-area-inset-top);//兼容 IOS>11.2
    height: @h;
    // margin-bottom: calc((@h - @titleHeight) * -1);
    background-image: linear-gradient(to bottom ,#ff3700,#eea849,#f7f8fa);
  }
  /deep/.van-nav-bar{
    background-color: transparent;
    &.van-hairline--bottom::after{
      border: none;
    }
    .van-icon{
      color: white;
    }
    .van-nav-bar__title{
      color: white;
    }
  }
  /deep/.orderNumberWrap{
    position: absolute;
    top: -65px;
    width: calc(100% - (2 * @sideDistance));
    height: @titleHeight;
    box-sizing: content-box;
    -webkit-box-sizing:content-box;
    background-color: white;
    font-size: 24px;
    font-weight: bolder;
    text-align: center;
    line-height: @titleHeight;
    .border-radius5();
    .sideMargin();
  }
  /deep/.foodOrderList div{
    padding: 3px;
  }
  .hairline::after{
    position:absolute;
    box-sizing:border-box;content:' ';
    pointer-events:none;
    right:16px;bottom:0;
    left:16px;
    border-bottom:1px solid #ebedf0;
    transform:scaleY(.5)
    &{
      position: relative;
    }
  }

</style>
