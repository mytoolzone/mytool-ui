<template>
  <div class="warp" v-show="dialogVisible">
    <span class="close" @click="close()">&times;</span>
    <iframe
      src="https://chat.mytool.zone/"
      width="100%"
      height="100%"
      style="border: none"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean
  },
  mounted() {
    console.log(this.dialogVisible, 'dialogVisibles')
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.warp {
  position: fixed;
  left: 0;
  top: 0;
  // overflow: auto;
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 999999999999999;
}
.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
