<template>
  <div>
    <!-- 店铺信息 -->
    <header>
      <div class="shopDetailBox">
         <div class="shopImage">
          <img src="" alt="" style="background:gray;width: 100px;height:100px;">
        </div>
        <div class="shopDetail">
          <h2 class="shopName">沙县小吃</h2>
          <span>公告：欢迎光临本店，很高兴为您服务。</span>
        </div>
      </div>
    </header>
    <main>
    <!-- 左侧边栏导航 -->
      <van-sidebar v-model="active" id="sidebarNav">
        <van-sidebar-item title="类别1" />
        <van-sidebar-item title="类别2" />
        <van-sidebar-item title="类别3" />
      </van-sidebar>
    <!-- 右餐品list -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ShopView',
  mounted () { // 侦听滚动事件确保侧边导航在顶部
    window.addEventListener('scroll', this.handlerScroll)
  },
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    handlerScroll () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
      const sideBarNav = document.getElementById('sidebarNav')
      const offsetTop = document.querySelector('main').offsetTop
      if (scrollTop >= offsetTop) {
        sideBarNav.style.top = scrollTop - offsetTop + 'px'
      } else {
        sideBarNav.style.top = 0 + 'px'
      }
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped="scoped">
  header{
    height: 25vh;
    margin-bottom: 5vh;
    background-image: linear-gradient(to bottom ,#f46b45,#eea849;);
  }
  .shopDetailBox{
    display: flex;
    flex: 1;
    justify-content: space-around;
    position: relative;
    width: 94%;
    padding: 5px;
    top: 60%;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    background-color: white;
  }
  main{
    display: flex;
    align-content: flex-start;
  }
  .van-sidebar{
    display: inline-block;
    position: relative;
    top: 0;
    height: 100vh;
  }
  .van-list{
    display: inline-block;
    height: 100vh;
    width: 100vw;
  }
</style>
