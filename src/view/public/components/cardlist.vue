<template>
  <el-row :gutter="20">
    <el-col
      :sm="24"
      :md="12"
      :lg="6"
      :xl="4"
      v-for="(item, index) in items"
      :key="index"
      @click="goToDetail(item.ID)"
    >
      <div class="card">
        <div>
          <div class="image-container">
            <a
              data-pswp-width="512"
              data-pswp-height="512"
              target="_blank"
              href="item.icon"
            >
              <img class="card-cover" v-lazy="item.icon" alt="card image" />
            </a>
          </div>
          <div class="content-container">
            <h2 class="ellipsis" :title="item.name">{{ item.name }}</h2>
            <p>{{ item.desc }}</p>
          </div>
        </div>
        <div class="tags">
          <span class="tag">{{ item.tags }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getIndexToolList } from '@/api/tools'

export default {
  data() {
    return {
      tag: '',
      keyword: '',
      items: []
    }
  },
  mounted() {
    this.tag = this.$route.query.tag
    this.getIndexToolList()
  },
  watch: {
    '$route.query.tag': function () {
      // 只要categoryId的值发生变化,这个方法就会被调用
      this.tag = this.$route.query.tag
      //重新调用请求数据的方法，刷新页面数据
      if (this.$route.name == 'Index') {
        this.getIndexToolList()
      }
    },
    '$route.query.keyword': function () {
      // 只要categoryId的值发生变化,这个方法就会被调用
      this.keyword = this.$route.query.keyword
      //重新调用请求数据的方法，刷新页面数据
      if (this.$route.name == 'Index') {
        this.getIndexToolList()
      }
    }
  },
  methods: {
    async getIndexToolList() {
      let toolList = await getIndexToolList({
        tags: this.tag,
        keyword: this.keyword
      })
      console.log('toolList', toolList)
      if (toolList.code == 0) {
        this.items = toolList.data.list
      }
    },
    goToDetail(toolId) {
      console.log('goToDetail', toolId)
      this.$router.push({ name: 'Detail', query: { id: toolId } })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
.el-col:last-child {
  margin-bottom: 0;
}

.card {
  background-color: #272929;
  color: #c6c9cf;

  height: 90px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  box-shadow: 1px 1px 8px rgba(20, 20, 20, 0.9);
  transition: all 0.1s ease-out;
}

.card:hover {
  transform: translate(0, -5px);
  color: #fafbfd;
  cursor: pointer;
}

.image-container {
  width: 48px;
  margin-right: 16px;
  float: left;
}

.card-cover {
  width: 100%;
  object-fit: cover;
  border-radius: 24px;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 6px;
}

p {
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 8px;
  height: 36px;
  overflow: hidden;
  display: block;
  color: #6c757d;
}

.tags {
  margin-top: auto;
}

.tag {
  display: inline-block;
  padding: 4px 16px;
  background-color: #181717;
  color: #6c757d;
  font-size: 12px;
  line-height: 1;
  margin-right: 8px;
  border-radius: 4px;
}
.tag:hover {
  color: #f6f9ff;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
