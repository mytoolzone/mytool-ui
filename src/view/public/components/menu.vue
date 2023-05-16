<template>
  <el-menu
    active-text-color="#EFEFEF"
    background-color="#272929"
    class="el-menu-vertical-demo mymenu-top"
    :style="{
      height: isMobileFlag ? '100vh' : 'calc(100vh - 130px)',
      'overflow-y': isMobileFlag ? 'hidden' : ' scroll'
    }"
    default-active="1-1"
    text-color="#BFC2C8"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isMobileFlag"
  >
    <el-menu-item
      v-for="(tag, index) in tags"
      :index="tag.value"
      @click="chooseMenu(tag)"
    >
      <el-icon><setting /> </el-icon>
      <span v-show="isMobileFlag" style="font-style: normal">
        {{ tag.label }}
      </span>
      <template #title v-show="!isMobileFlag">
        <span v-show="!isMobileFlag">
          {{ tag.label }}
        </span>
      </template>
    </el-menu-item>
  </el-menu>

  <el-menu
    active-text-color="#EFEFEF"
    background-color="#272929"
    class="el-menu-vertical-demo mymenu-bottom"
    default-active="1-1"
    text-color="#BFC2C8"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="about" @click="openAbout()">
      <el-icon><ChatRound /> </el-icon>
      <span style="font-style: normal"> 关于我们 </span>
    </el-menu-item>
    <el-menu-item index="node" @click="openTellUs()">
      <el-icon><setting /> </el-icon>
      <span style="font-style: normal"> 留言交流 </span>
    </el-menu-item>
  </el-menu>
  <about v-show="isOpenAbout" @close="isOpenAbout = false"></about>
  <tellus v-show="isOpenTellUs" @close="isOpenTellUs = false"></tellus>
</template>

<script>
import About from './about.vue'
import Tellus from './tellus.vue'
import { isMobile } from '@/utils/page.js'

export default {
  name: 'Menu',
  components: {
    About,
    Tellus
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isOpenAbout: false,
      isOpenTellUs: false,
      isMobileFlag: false
    }
  },
  mounted() {
    this.isMobileFlag = isMobile()
    // console.log(this.propName)
  },
  methods: {
    openAbout() {
      this.isOpenAbout = true
    },
    openTellUs() {
      this.isOpenTellUs = true
    },
    chooseMenu(menu) {
      console.log('chooseMenu', menu)
      if (menu.fn) {
        menu.fn()
        return
      }
      let key = menu.value
      this.$emit('chooseMenu', key)
      this.$router.push({ name: 'Index', query: { tag: key } })
      this.isMenuFlag = !this.isMenuFlag
      this.$emit('collapse')
    }
  }
}
</script>

<style scoped>
.mymenu-top {
  width: 100%;
  flex: 8;
  height: 100vh;
  /* height: calc(100vh - 130px); */
  margin-bottom: 110px;

  border-right: none;
}
.mymenu-top::-webkit-scrollbar {
  width: 5px;
}

.mymenu-top::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background: #4f5050;
  height: 60px !important;
}
.mymenu-top::-webkit-scrollbar-thumb:hover {
  border-radius: 2px;
  background: #ef3842;
}
.mymenu-top::-webkit-scrollbar-track-piece {
  background-color: #3d3b3b !important;
  border-radius: 2px;
}

.mymenu-bottom {
  border-top: 1px solid #383d3f !important;
  border-right: none;
  height: 120px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 150px;
}
.mymenu-bottom .el-menu-item span,
.mymenu-top .el-menu-item span {
  font-size: 16px;
}
</style>
