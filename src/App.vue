<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>
<style lang="scss">
// 引入初始化样式
#app {
  background: #1a1b1d;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  font-weight: 400 !important;
}
.el-button {
  font-weight: 400 !important;
}
</style>
