<template>
  <span
    class="t-suspend-button"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    ref="remove"
    :style="`left: ${oLeft}px; top: ${oTop}px;`"
  >
    <div
      class="yuanqiu"
      @click="onClickLogo"
      @touchstart="handleTouchStart(1000)"
      @touchend="handleTouchEnd"
    >
      <img src="https://tools.mytool.zone/logo.png" />
    </div>
  </span>

  <Dialog :dialogVisible="dialogVisible" @close="handleTouchStart"></Dialog>
</template>

<script>
import { mapState } from 'vuex'
import Dialog from './dialog.vue'
export default {
  data() {
    return {
      oLeft: '',
      oTop: '',
      $vm: null, // 悬浮按钮
      moving: false, // 移动状态
      oW: null, // 悬钮距离
      oH: null,
      htmlWidth: null, // 页面宽度
      htmlHeight: null,
      bWidth: null, // 悬钮宽度
      bHeight: null,
      click: false, // 是否是点击
      dialogVisible: false
    }
  },
  mounted() {
    this.$refs.remove.addEventListener(
      'touchmove',
      (e) => {
        if (e.cancelable) {
          e.preventDefault()
        }
      },
      { passive: false }
    )
  },
  methods: {
    // 移动触发
    onTouchStart(e) {
      e = e.touches[0]
      this.click = true

      this.oW = e.clientX - this.$refs.remove.getBoundingClientRect().left
      this.oH = e.clientY - this.$refs.remove.getBoundingClientRect().top
      // console.log('e.clientX宽', e.clientX, 'e.clientY高', e.clientY)
      // console.log(
      //   '移动宽',
      //   this.$refs.remove.getBoundingClientRect().left,
      //   '移动高',
      //   this.$refs.remove.getBoundingClientRect().top
      // )
      this.htmlWidth = document.documentElement.clientWidth
      this.htmlHeight = document.documentElement.clientHeight
      // console.log('body宽', this.htmlWidth, 'body高', this.htmlHeight)
      this.bWidth = this.$refs.remove.offsetWidth
      this.bHeight = this.$refs.remove.offsetHeight
      // console.log('a宽', this.oW, 'a高', this.oH)
      let oLeft = e.clientX - this.oW
      let oTop = e.clientY - this.oH
      this.oLeft = oLeft
      this.oTop = oTop

      this.moving = true
    },
    // 移动结束
    onTouchEnd(e) {
      this.moving = false

      this.$refs.remove.class + ' t-suspend-button-animate'

      // 左侧距离
      let oLeft = this.oLeft
      if (oLeft < (this.htmlWidth - this.bWidth) / 2) {
        oLeft = 0
      } else {
        oLeft = this.htmlWidth - this.bWidth
      }

      // if (this.click) {
      //   this.props.onClick();
      // }
      // }
      // if (oTop < 0) {
      //   oTop = 0;
      // } else if (oTop > this.htmlHeight - this.bHeight) {
      //   oTop = this.htmlHeight - this.bHeight;
      // }

      this.oLeft = oLeft
    },
    // 开始移动
    onTouchMove(e) {
      this.$refs.remove.class = 't-suspend-button'
      this.moving && this.onMove(e)
    },
    // 移动中
    onMove(e) {
      e = e.touches[0]
      this.click = false

      // 左侧距离
      let oLeft = e.clientX - this.oW
      let oTop = e.clientY - this.oH
      console.log('移动左距离', oLeft, '移动上距离', oTop)
      if (oLeft < 0) {
        oLeft = 0
      } else if (oLeft > this.htmlWidth - this.bWidth) {
        oLeft = this.htmlWidth - this.bWidth
      }
      if (oTop < 0) {
        oTop = 0
      } else if (oTop > this.htmlHeight - this.bHeight) {
        oTop = this.htmlHeight - this.bHeight
      }

      this.oLeft = oLeft
      this.oTop = oTop
    },
    onClickLogo() {
      this.$store.commit('setIsCollapse', {
        isBlooen: !this.isCollapse
      })
    },
    // 长按事件
    handleTouchStart(time) {
      this.pressTimer = setTimeout(() => {
        this.dialogVisible = !this.dialogVisible
        console.log(this.dialogVisible)
      }, time)
      this.showHint = true
    },
    // 长按结束
    handleTouchEnd() {
      clearTimeout(this.pressTimer)
      this.showHint = false
    }
  },
  computed: {
    ...mapState(['isCollapse'])
  },
  components: {
    Dialog
  }
}
</script>

<style lang="scss">
.t-suspend-button {
  position: fixed;
  bottom: 105px;
  right: 9px;
  width: 48px;
  height: 48px;
  border-radius: 2rem;
  z-index: 9999999999;
  background: #fff;
}

.t-suspend-button img {
  width: 100%;
  height: 100%;
}

.t-suspend-button-animate {
  transition-duration: 0.4s;
}
.yuanqiu {
  z-index: 99999;
  width: 48px;
  height: 48px;
  img {
    width: 100%;
    height: 100%;
  }
}

.Dialog {
  width: 100%;
  height: 100%;
  background: red;
}
</style>
