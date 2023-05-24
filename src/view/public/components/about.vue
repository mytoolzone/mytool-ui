<template>
  <div class="modal">
    <el-row type="flex" justify="center" align="middle">
      <el-col
        class="modal-content"
        :lg="11"
        :md="11"
        :sm="20"
        :xl="20"
        :xs="20"
      >
        <span class="close" @click="close()">&times;</span>
        <h2 class="title">Mytool.zone</h2>
        <p class="content">
          Mytool.zone
          是一个全面的在线工具网站，提供了多种实用的工具和资源，包括文本处理、图像处理、代码编辑、加密解密、API
          接口等多个领域。这些工具和资源都是免费的，无需注册和下载，可以直接在网站上使用。
        </p>
        <p class="content">
          Mytool.zone是一个非常实用的在线工具网站，可以帮助用户轻松处理各种数据和文件，提高工作效率，同时也为用户节省了大量时间和精力。如果你需要处理一些数据或文件，可以尝试使用
          Mytool.zone 提供的工具和资源，相信你一定会有不错的使用体验。
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const showModal = ref(true)
    return {
      showModal
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #413f3f;
  margin: 13% auto;
  padding: 20px;
  border: 5px solid #4e4b4b;
  color: #fbed9f;
  /* width: 600px; */
  line-height: 1.8em;
  word-break: break-word;
  white-space: pre-line;
}
.title {
  text-align: center;
}
.content {
  width: 100%;
  text-indent: 2em;
}

.close {
  color: #aaaaaa;
  float: right;
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
