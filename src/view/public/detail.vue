<template>
  <div class="article">
    <el-row type="flex" justify="center" align="middle">
      <el-col :sm="22" :md="22" :lg="3" :xl="3" :class="imageFlag">
        <div :class="siteico">
          <img :src="article.icon" alt="Article Image" />
          <div class="tool-actions" @click="collect">
            <el-tooltip
              :content="isCollect ? '取消收藏' : '加入收藏'"
              placement="top"
              effect="light"
            >
              <el-icon v-if="isCollect"><StarFilled /></el-icon>
              <el-icon v-else><Star /></el-icon>
            </el-tooltip>
          </div>
        </div>
      </el-col>
      <el-col :sm="22" :md="22" :lg="10" :xl="10" :class="contentFlag">
        <h1>{{ article.name }}</h1>
        <div class="info">
          <span
            >访问地址:
            <a
              :href="toolPackage.apiUrl"
              target="_blank"
              style="color: #62ebf4"
            >
              {{ toolPackage.apiUrl }}</a
            ></span
          >

          <div class="tags">
            <span>{{ article.tags }}</span>
            <!-- <span v-for="(tag, index) in article.tags" :key="index">{{ tag }}</span> -->
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
      <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="15" class="body">
        {{ article.desc }}
      </el-col>
    </el-row>

    <div v-if="article.attr == 'innnerComponent'" style="display: block">
      <async-component
        :innerComp="toolPackage.uiData"
        style="display: block"
      ></async-component>
    </div>

    <Floating v-show="isMobileFlag"></Floating>

    <el-row v-if="article.attr == 'iframe'" justify="center" align="middle">
      <el-col
        class="workbench"
        :class="{ max: isMaxWorkbench }"
        :sm="22"
        :md="22"
        :lg="15"
        :xl="15"
      >
        <el-row>
          <el-col :span="5" @click="expandWorkbench" class="btn">
            放大功能区
          </el-col>
          <el-col :span="5" @click="reduceWorkbench" class="btn">
            缩小功能区
          </el-col>
        </el-row>
        <iframe :src="toolPackage.apiUrl" width="100%" height="480px"> </iframe>
      </el-col>
    </el-row>

    <el-row v-if="article.attr == 'iframe'" justify="center" align="middle">
      <el-col
        class="workbench"
        :class="{ max: isMaxWorkbench }"
        :sm="22"
        :md="22"
        :lg="15"
        :xl="15"
      >
        <div class="readme" v-html="toolPackage.readme"></div>
      </el-col>
    </el-row>

    <recommends></recommends>
  </div>
</template>

<script>
import Recommends from './components/recommend.vue'
import AsyncComponent from './tools/async-component.vue'
import { findIndexTool, getRecommendToolList } from '@/api/tools'
import { findIndexToolPackage } from '@/api/toolPackage'
import { isMobile } from '@/utils/page.js'
import {
  createUserCollectTools,
  deleteUserCollectTools,
  findUserCollectTool
} from '@/api/userCollectTools'
import { useUserStore } from '@/pinia/modules/user'
import Floating from './components/floating.vue'
export default {
  components: {
    Recommends,
    AsyncComponent,
    Floating
  },
  data() {
    return {
      article: {},
      toolPackage: {},
      id: 0,
      isMaxWorkbench: false,
      isCollect: false
    }
  },
  computed: {
    imageFlag() {
      return isMobile() ? 'image-container-mobile ' : 'image-container  '
    },
    contentFlag() {
      return isMobile() ? 'content-container-mobile' : 'content-container'
    },
    siteico() {
      return isMobile() ? 'siteico-mobile' : 'siteico'
    }
  },
  watch: {
    '$route.query.id': function () {
      // 只要categoryId的值发生变化,这个方法就会被调用
      this.id = this.$route.query.id
      //重新调用请求数据的方法，刷新页面数据
      if (this.$route.name == 'Detail') {
        this.load()
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.load()
    this.isMobileFlag = isMobile()
  },
  methods: {
    expandWorkbench() {
      console.log('expandWorkbench')
      this.isMaxWorkbench = true
    },
    reduceWorkbench() {
      console.log('reduceWorkbench')
      this.isMaxWorkbench = false
    },
    load() {
      findIndexTool({ ID: this.id }).then((res) => {
        if (res.code == 0) {
          this.article = res.data.retools
          console.log('---', this.article)
        }
      })

      findIndexToolPackage({ ID: this.id }).then((res) => {
        if (res.code == 0) {
          this.toolPackage = res.data.retoolPackage
          console.log('---toolPackage', this.toolPackage)
        }
      })

      findUserCollectTool({ toolId: parseInt(this.id) }).then((res) => {
        console.log('res ==>', res)
        if (res.data.reuserCollectTools.ID > 0) {
          this.isCollect = true
        } else {
          this.isCollect = false
        }
      })
    },
    collect() {
      const userStore = useUserStore()

      if (!this.isCollect) {
        createUserCollectTools({ toolId: parseInt(this.id) })
      } else {
        deleteUserCollectTools({ toolId: parseInt(this.id) })
      }
      this.isCollect = !this.isCollect
    }
  }
}
</script>

<style lang="scss" scoped>

.article {
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding: 0px;
  font-size: 16px;
  line-height: 1.5;
  color: #f2f2f2;

  .siteico {
    background: #e6e8ed;
    position: relative;
    overflow: hidden;
    box-shadow: 0 30px 20px -20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    transition: background-color 0.3s;
    padding: 65px 20px;
    width: 100%;
  }
  .siteico-mobile {
    background: #cf8312;
    // background: rgb(10, 185, 156);
    position: relative;
    overflow: hidden;
    box-shadow: 0 30px 20px -20px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    padding: 18px 0px;
  }

  .image-container {
    img {
      min-width: 72px !important;
      position: absolute;
      top: 14%;
      left: 19%;
      border-radius: 50%;
      width: 98px;
    }
  }
  .image-container-mobile {
    img {
      margin: auto;
      display: block;
      border-radius: 50%;
      width: 90px;
    }
  }

  .content-container {
    margin-left: 70px;
  }
  .content-container,
  .content-container-mobile {
    h1 {
      font-size: 30px;
      margin-bottom: 10px;
      color: #1ef858; /* 明亮蓝色 */
    }

    p {
      margin-bottom: 20px;
      color: #333; /* 深灰色 */
    }

    .info {
      margin-top: 20px;
      color: #08de93; /* 灰色 */

      span {
        display: block;
        margin-bottom: 10px;
      }
      i {
        font-style: normal;
        margin-right: 5px;
        font-size: 16px;
      }
      .el-icon {
        vertical-align: text-top;
      }

      .tags {
        margin-top: 10px;

        span {
          display: inline-block;
          padding: 5px 10px;
          background-color: #333232;
          border-radius: 3px;
          margin-right: 10px;
          color: #971515; /* 深灰色 */
        }
      }
    }
  }

  .body {
    background-color: #272929;
    padding: 5px;
    border-radius: 15px;
    margin-bottom: 5px;
    font-size: 16px;
    min-height: 30px;
    color: #c2c7ca;
    line-height: 2em;
    text-indent: 2em;
  }

  .workbench {
    .btn {
      font-weight: 600;
      cursor: pointer;
      padding: 5px 0px;
      margin-right: 15px;
      text-align: center;
      background: #333232;
      color: #d94e0d;
    }
    iframe {
      border: none;
    }
  }

  .readme {
    color: #fff6dd;
    width: 100%;
    > img {
      max-width: 100%;
    }
    > h2 {
      //color: #84bdff;
      color: red !important;
    }
  }


  .max {
    position: fixed;
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: #272929;
    opacity: 0.99;
    iframe {
      height: calc(100vh - 80px);
    }
  }
  .tool-actions {
    color: #424446;
    backdrop-filter: blur(5px);
    background-color: rgba(250, 250, 250, 0.5);
    border-color: transparent;
    position: absolute;
    right: 15px;
    bottom: 10px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    .el-icon {
      font-size: 16px;
      margin-left: 10px;
      line-height: 35px;
      height: 35px;
    }
  }
}
</style>
