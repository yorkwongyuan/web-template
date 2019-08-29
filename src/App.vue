<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  position: relative;
}
.globalLoading {
  .el-loading-spinner {
    font-size: 30px;
    padding-top: 13px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.8);
    .path {
      stroke: white;
    }
    .el-loading-text {
      font-size: 18px;
      color: white;
    }
  }
}
</style>
