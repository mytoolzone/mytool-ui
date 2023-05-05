<template>
  <el-header class="layout-header" height="48px">
    <div class="logo" @click="onClickLogo">
      <img src="https://tools.mytool.zone/logo.png" alt="Logo" />
      <ul>
        <li v-for="(item, index) in navItems" :key="index">
          <a
            :href="item.link"
            @mouseover="handleMouseover(navItems.length - index - 1)"
          >
            {{ item.text }}
            <span v-show="navItems.length - index - 1 === activeIndex">▼</span>
          </a>
        </li>
      </ul>
      <el-icon v-if="isMobileFlag"><Expand /></el-icon>
    </div>

    <div style="flex: 1"></div>
    <el-space class="me">
      <div class="right-item">
        <div @click="collections" style="margin-right: 10px">我的收藏</div>
        <div @click="gotoPerson">
          <el-icon><User /></el-icon> 我的
        </div>
      </div>
    </el-space>
  </el-header>
</template>
<script>
import { isMobile } from '@/utils/page.js'

export default {
  data() {
    return {
      isMobileFlag: false,
      navItems: [
        { text: 'AiTool', link: '#/?tag=ai', icon: 'icon-home' }
        { text: '快命令', link: '#/user/userCmds', icon: 'icon-cog' },
        { text: '收藏', link: '#/user/collect', icon: 'icon-cog' },
        { text: '我的', link: '#/layout/person', icon: 'icon-gift' },
      ],
      activeIndex: -1
    }
  },
  mounted() {
    this.isMobileFlag = isMobile()
  },

  methods: {
    handleMouseover(index) {
      this.activeIndex = index
    },
    collections() {
      this.$router.push({
        name: 'Collections'
      })
    },
    gotoPerson() {
      this.$router.push({
        name: 'Safe'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-header {
  display: flex;
  align-items: center;
  color: #fff;
  background-color: #272929;
}
.logo {
  position: relative;
  display: flex;
  align-items: center;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  img {
    display: inline-block;
    height: 40px;
    vertical-align: middle;
  }
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  li {
    margin: 0 20px;

    a {
      color: #c6c9cf;
      text-decoration: none;
      position: relative;

      i {
        font-size: 18px;
        margin-right: 5px;
      }

      span {
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        opacity: 0;
        transition: all 0.3s ease-in-out;
      }

      &:hover span,
      &:focus span {
        bottom: -20px;
        opacity: 1;
      }
    }
  }
}

.right-item {
  cursor: pointer;
  padding: 0 12px;
  height: 48px;
  display: flex;
  align-items: center;
  .me {
    flex: 1;
    text-align: right;
    vertical-align: baseline;
    margin-right: 20px;
    line-height: 80px;
    color: #fff;
    font-size: 16px;
    width: 100px;
    div {
      display: inline-block;
      cursor: pointer;
    }
    div:last-child {
      margin-left: 20px;
    }
  }
}
</style>
