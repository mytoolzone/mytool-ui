<template>
  <div class="mymenu-wrap">
    <div v-if="!isMobileFlag" class="sidebar">
      <Menus :tags="tags"></Menus>
    </div>

    <el-drawer
      class="el-drawers"
      v-model="isCollapse"
      direction="ltr"
      :size="150"
    >
      <template #header="{ close, titleId, titleClass }">
        <img class="titleimg" src="https://tools.mytool.zone/logo.png" alt="" />
      </template>
      <Menus :tags="tags" @collapse="collapse"></Menus>
    </el-drawer>
  </div>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'
import Menus from './menu.vue'
import { isMobile } from '@/utils/page.js'
import { useUserStore } from '@/pinia/modules/user'
import { mapState } from 'vuex'

export default {
  name: 'sidebar',
  components: {
    Menus
  },
  data() {
    return {
      isOpenAbout: false,
      isOpenTellUs: false,
      isMobileFlag: false,
      isMenuFlag: false,
      tags: []
    }
  },
  computed: {
    ...mapState(['isCollapse'])
  },
  watch: {
    $route: function (newRoute) {
      console.log('reouter watch', newRoute)
      this.setMenuContent(this.$route.name)
    }
  },
  mounted() {
    this.setMenuContent(this.$route.name)
    this.isMobileFlag = isMobile()
  },
  methods: {
    setMenuContent(page) {
      if (page == 'Person' || page == 'Safe') {
        this.tags = [
          { label: '修改密码', fn: this.changePwd },
          { label: '我的收藏', fn: this.gotoCollect },
          { label: '退出登陆', fn: this.logout }
        ]
      } else {
        this.tags = [
          {
            ID: 54,
            CreatedAt: '2023-04-11T21:50:12.743+08:00',
            UpdatedAt: '2023-04-15T13:50:54.612+08:00',
            label: 'AI写作',
            value: 'ai-writer',
            status: true,
            sort: 1,
            sysDictionaryID: 7
          },
          {
            ID: 55,
            CreatedAt: '2023-04-11T21:51:12.376+08:00',
            UpdatedAt: '2023-04-15T13:51:31.451+08:00',
            label: 'AI图像',
            value: 'ai-image',
            status: true,
            sort: 1,
            sysDictionaryID: 7
          },
          {
            ID: 56,
            CreatedAt: '2023-04-11T21:52:12.187+08:00',
            UpdatedAt: '2023-04-15T13:51:12.481+08:00',
            label: 'AI视频',
            value: 'ai-video',
            status: true,
            sort: 1,
            sysDictionaryID: 7
          },
          {
            ID: 57,
            CreatedAt: '2023-04-15T13:42:46.14+08:00',
            UpdatedAt: '2023-04-15T13:51:35.78+08:00',
            label: 'AI编程',
            value: 'ai-coding',
            status: true,
            sort: 1,
            sysDictionaryID: 7
          },
          {
            ID: 58,
            CreatedAt: '2023-04-15T13:49:47.63+08:00',
            UpdatedAt: '2023-04-15T13:51:04.97+08:00',
            label: 'AI训练',
            value: 'ai-training',
            status: true,
            sort: 1,
            sysDictionaryID: 7
          },
          {
            ID: 59,
            CreatedAt: '2023-04-15T13:52:33.583+08:00',
            UpdatedAt: '2023-04-15T13:52:57.097+08:00',
            label: 'AI翻译',
            value: 'ai-translation',
            status: true,
            sort: 1,
            sysDictionaryID: 7
          },
          {
            ID: 41,
            CreatedAt: '2023-04-01T12:11:34.536+08:00',
            UpdatedAt: '2023-04-15T13:50:25.454+08:00',
            label: '在线修图',
            value: 'onlineEditImage',
            status: true,
            sort: 2,
            sysDictionaryID: 7
          },
          {
            ID: 42,
            CreatedAt: '2023-04-01T12:12:59.162+08:00',
            UpdatedAt: '2023-04-15T13:55:43.631+08:00',
            label: '编码转换',
            value: 'json',
            status: true,
            sort: 2,
            sysDictionaryID: 7
          },
          {
            ID: 46,
            CreatedAt: '2023-04-01T20:35:59.725+08:00',
            UpdatedAt: '2023-04-15T13:53:44.834+08:00',
            label: '文档处理',
            value: 'word',
            status: true,
            sort: 2,
            sysDictionaryID: 7
          },
          {
            ID: 47,
            CreatedAt: '2023-04-01T20:36:15.018+08:00',
            UpdatedAt: '2023-04-15T13:54:17.564+08:00',
            label: '视频剪辑',
            value: 'video',
            status: true,
            sort: 2,
            sysDictionaryID: 7
          },
          {
            ID: 48,
            CreatedAt: '2023-04-01T20:37:36.846+08:00',
            UpdatedAt: '2023-04-15T13:53:25.936+08:00',
            label: '格式转换',
            value: 'docConvert',
            status: true,
            sort: 2,
            sysDictionaryID: 7
          },
          {
            ID: 51,
            CreatedAt: '2023-04-02T14:20:21.483+08:00',
            UpdatedAt: '2023-04-15T13:50:43.322+08:00',
            label: '低代码开发',
            value: 'lowCode',
            status: true,
            sort: 2,
            sysDictionaryID: 7
          },
          {
            ID: 60,
            CreatedAt: '2023-04-15T13:58:14.227+08:00',
            UpdatedAt: '2023-04-15T13:58:33.964+08:00',
            label: '图表分析',
            value: 'chart',
            status: true,
            sort: 3,
            sysDictionaryID: 7
          }
        ]
      }
    },

    changePwd() {
      this.$router.push({ name: 'Safe' })
    },
    gotoCollect() {
      this.$router.push({ name: 'Collections' })
    },
    async logout() {
      console.log('logout')
      const userStore = useUserStore()
      userStore.LoginOut()
      //this.$router.push({name:'Index'})
    },
    collapse() {
      this.$store.commit('setIsCollapse', {
        isBlooen: !this.isCollapse
      })
    }
  }
}
</script>

<style scoped>
.titleimg {
  width: 50px;
}
.sidebar {
  width: 150px;
}
.mymenu-wrap {
  margin: 0%;
  padding: 0px;
  border: none;
}
::v-deep(.el-drawer) {
  background: #272929;
}

::v-deep(.el-drawer__body) {
  padding: 0px !important;
  overflow-y: auto;
}

::v-deep(.el-drawer__body)::-webkit-scrollbar {
  width: 5px;
}

::v-deep(.el-drawer__body::-webkit-scrollbar-thumb) {
  border-radius: 2px;
  background: #4f5050;
  height: 60px !important;
}
::v-deep(.el-drawer__body::-webkit-scrollbar-thumb:hover) {
  border-radius: 2px;
  background: #ef3842;
}
::v-deep(.el-drawer__body::-webkit-scrollbar-track-piece) {
  background-color: #3d3b3b !important;
  border-radius: 2px;
}
</style>
