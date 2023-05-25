<template>
  <div class="modal">
    <el-row>
      <el-col class="modal-content" :lg="7" :md="7" :sm="20" :xl="20" :xs="20">
        <span class="close" @click="close">&times;</span>
        <h2 class="title">留言反馈</h2>
        <form @submit.prevent="submitForm" class="form">
          <div>
            <label for="name">姓名：</label>
            <el-input v-model="form.name" placeholder="请输入姓名" />
          </div>
          <div>
            <label for="email">邮箱：</label>
            <el-input
              class="input"
              type="email"
              v-model="form.email"
              placeholder="请输入邮箱"
            />
          </div>
          <div>
            <label for="message">留言：</label>
            <el-input
              v-model="form.message"
              :rows="2"
              type="textarea"
              placeholder="请输入留言"
            />
          </div>
          <el-button type="primary" class="submit">提交</el-button>
        </form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref } from 'vue'
import { createIndexComment } from '@/api/comments'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.form)
      var content = `name:${this.form.name},email:${this.form.email},content:${this.form.message}`
      createIndexComment({ content: content }).then((res) => {
        if ((res.code = 0)) {
          alert('感谢您的宝贵意见')
        }
      })
      this.close()
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #413f3f;
  margin: 15% auto;
  padding: 20px;
  border: 5px solid #4e4b4b;

  color: #fbed9f;

  line-height: 1.8em;
  word-break: break-word;
  white-space: pre-line;
}
.title {
  text-align: center;
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

.input {
  width: 100%;
  height: 25px;
  border: none;
}
textarea.input {
  min-height: 120px;
}
.submit {
  margin-top: 20px;
  margin-left: 40%;
}
</style>
