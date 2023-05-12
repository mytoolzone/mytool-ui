<template>
  <div class="wrapper">
    <nav class="navbar">
      <top></top>
    </nav>

    <div class="container">
      <nav class="sidebar">
        <sidebar @chooseMenu="chooseMenu"></sidebar>
      </nav>

      <div class="main-content" :class="{ 'mobile-content': isMobileFlag }">
        <!-- 这里是页面主要内容 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Top from './components/header.vue'
import Sidebar from './components/sidebar.vue'
import Search from './components/search.vue'
import Cardlist from './components/cardlist.vue'
import { isMobile } from '@/utils/page.js'
import { mapState } from 'vuex'

export default {
  name: 'MyPage',
  components: {
    Sidebar,
    Search,
    Cardlist,
    Top
  },
  data() {
    return {
      isMobileFlag: false
    }
  },
  computed: {
    ...mapState(['isCollapse'])
  },
  mounted() {
    this.isMobileFlag = isMobile()
    console.log(this.isCollapse)
  },
  methods: {
    chooseMenu(tag) {
      console.log('index -- chooseMenu', tag)
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}

.navbar {
  background-color: #fff;
  width: 100%;
  height: 48px;
  position: fixed;
  z-index: 1000;
}

.sidebar {
  height: 100vh;
  margin: 0px;
  padding-top: 48px;
}

.main-content {
  height: calc(100vh - 60px);
  width: calc(100vw - 150px);
  margin: 0px;
  background-color: #1a1b1d;
  padding-top: 60px;
  font-size: 24px;
  line-height: 1.5;
  color: #2f3542;
  overflow-y: scroll;
}

.main-content::-webkit-scrollbar {
  width: 2px;
}

.main-content::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: #4f5050;
  height: 60px !important;
}
.main-content::-webkit-scrollbar-thumb:hover {
  border-radius: 2px;
  background: #ef3842;
}
.main-content::-webkit-scrollbar-track-piece {
  background-color: #3d3b3b !important;
  border-radius: 2px;
}

.mobile-content {
  /* display: flex; */
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  overflow-y: scroll;
}
.container {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
}
</style>
