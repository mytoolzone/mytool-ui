<template>
  <el-row class="recommendations" justify="center" align="middle">
    <el-col :sm="24" :md="24" :lg="17" :xl="17" :offset="offsetTwo">
      <!-- {{ offsets }} -->
      <h2>推荐列表</h2>
    </el-col>
  </el-row>
  <el-row class="scroll-container" justify="center" align="middle">
    <el-col
      :xs="7"
      :sm="8"
      :md="8"
      :lg="4"
      :xl="4"
      :offset="offsetOne"
      v-for="(item, index) in items"
      :key="index"
      @click="goToDetail(item.ID)"
      class="items"
    >
      <img v-lazy="item.icon" alt="" :class="imgMobile" />
      <h3 :class="h3Mobile">{{ item.name }}</h3>
      <p>{{ item.desc }}</p>
    </el-col>
  </el-row>
</template>

<script>
import { getRecommendToolList } from '@/api/tools'
import { isMobile } from '@/utils/page.js'
export default {
  data() {
    return {
      items: [], // 推荐列表数据
      currentIndex: 0, // 当前显示项的索引
      itemWidth: 300, // 每个项的宽度
      offsetValue: 0
    }
  },

  mounted() {
    getRecommendToolList().then((res) => {
      if (res.code == 0) {
        this.items = res.data.list
      }
    })
  },
  computed: {
    offsetTwo() {
      if (isMobile()) {
        return 0
      } else {
        return 2
      }
    },
    offsetOne() {
      if (isMobile()) {
        return 1
      } else {
        return 2
      }
    },
    imgMobile() {
      return isMobile() ? 'img-Mobile' : ''
    },
    h3Mobile() {
      return isMobile() ? 'h3-Mobile' : ''
    }
  },
  methods: {
    goToPrev() {
      // 向前滚动一项
      this.currentIndex = Math.max(this.currentIndex - 1, 0)
    },
    goToNext() {
      // 向后滚动一项
      this.currentIndex = Math.min(this.currentIndex + 1, this.items.length - 1)
    },
    goToDetail(toolId) {
      console.log('goToDetail', toolId)
      this.$router.push({ name: 'Detail', query: { id: toolId } })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommendations {
  // max-width: 800px;
  margin: 0 auto;

  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: left;
    color: rgb(124, 150, 209);
  }

  .scroll-container {
    overflow-x: hidden;
    position: relative;
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    justify-content: center;

    .control-button {
      width: 15px;
      height: 15px;
      background-color: #f2f2f2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
      cursor: pointer;

      &:hover {
        background-color: #e6e6e6;
      }

      i {
        font-size: 16px;
        color: #333;
      }
    }
  }
}

.items {
  cursor: pointer;
  text-align: center;
  .img-Mobile {
    width: 60%;
  }
  .h3-Mobile {
    font-size: 12px;
  }
  h3 {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 0px;
    color: rgb(152, 237, 14);
  }

  p {
    height: 45px;
    overflow: hidden;
    color: rgb(102, 108, 119);
    text-align: initial;
  }
}
</style>
