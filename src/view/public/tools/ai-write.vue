<template>
  <div class="tool-form-body">
    <h2>Ai写作</h2>
    <el-form>

      <el-form-item class="form-item" label="作文题目：">
        <el-input v-model="form.compositionTitle" placeholder="请输入作文题目"></el-input>
      </el-form-item>

      <el-form-item class="form-item" label="作文字数：">
        <el-input v-model="form.compositionWordNumber" placeholder="请输入作文字数"></el-input>
      </el-form-item>


      <el-form-item class="form-item" label="作文提纲：">
        <el-input v-model="form.compositionOutline" placeholder="请输入作文提纲"></el-input>
      </el-form-item>

      <div class="form-item">
        <el-button
          type="primary"
          @click="submitForm"
          v-loading.fullscreen.lock="loading"
          >提交</el-button
        >
        <el-button @click="resetForm">重置</el-button>
      </div>
    </el-form>
    <div>
      <h2>Ai安排结果</h2>
      <div class="ai-result">
        <pre width="50">
          {{ aiAnswer }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { ElLoading } from 'element-plus'

export default {
  name: 'TravelForm',
  setup() {
    const form = ref({
      compositionTitle: '我的妈妈',
      compositionWordNumber: '500',
      compositionOutline: '外貌描写',
      hotels: [],
      loading: ref(true)
    })

    const aiAnswer = ref('')

    const submitForm = () => {
      console.log('submitForm', form.value)
      let val = form.value
      let input = `请制定一个作文题目为 ${val.compositionTitle}作文字数${val.compositionWordNumber}的作文，写${val.compositionOutline}的`
      // console.log(input)
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      setTimeout(() => {
        loading.close()
      }, 60000)
      axios
        .get(
          'http://chatai.chatai.1127451475362062.ap-southeast-1.fc.devsapp.net/?q=' +
            input
        )
        .then((res) => {
          console.log('res ', res, res.data.choices[0].message.content)
          if (res.status == 200) {
            aiAnswer.value = res.data.choices[0].message.content
            loading.close()
          }
        })
    }

    const resetForm = () => {
      form.value = {
        compositionTitle: '',
        compositionWordNumber: '',
        transportation: ''
      }
    }

    return {
      form,
      submitForm,
      resetForm,
      aiAnswer
    }
  }
}
</script>

<style scoped>
.tool-form-body {
  max-width: 800px;
  padding: 15px;
  margin: 0 auto;
}

.form-item {
  margin-bottom: 20px;
}

label {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.ai-result {
  width: 770px;
}
pre {
  padding: 15px;
  border: 1px solid #fff;
  min-height: 100px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
