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

  width: 100%;

  padding: 0px;
  font-size: 16px;
  line-height: 1.5;
}

/* .modal-content {
  background-color: #413f3f;
  margin: 13% auto;
  padding: 20px;
  border: 5px solid #4e4b4b;
  color: #fbed9f;

  line-height: 1.8em;
  word-break: break-word;
  white-space: pre-line;
} */
/* .title {
  text-align: center;
}
.content {
  width: 100%;
  text-indent: 2em;
} */

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
