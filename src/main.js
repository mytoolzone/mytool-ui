import { createApp } from 'vue'
// 引入gin-vue-admin前端初始化相关内容
import './core/gin-vue-admin'
// 引入封装的router
import router from '@/router/index'
import '@/permission'
// import run from '@/core/gin-vue-admin.js'
// import auth from '@/directive/auth'
import { store } from '@/pinia'
import vuexStore from '@/stores'
import App from './App.vue'
import { initDom } from './utils/positionToCode'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/message-box/style/css'
import './style/element_visiable.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueLazyload from 'vue3-lazyload'
import error from './assets/error.svg'
import loading from './assets/loading.gif'

initDom()
/**
 * @description 导入加载进度条，防止首屏加载时间过长，用户等待
 *
 * */
// import Nprogress from 'nprogress'
// import 'nprogress/nprogress.css'
// Nprogress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
// Nprogress.start()

/**
 * 无需在这块结束，会在路由中间件中结束此块内容
 * */

const app = createApp(App)
app.config.productionTip = false
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app
  // .use(run)
  .use(store)
  .use(vuexStore)
  // .use(auth)
  .use(router)
  .use(VueLazyload, {
    preLoad: 1,
    error,
    loading,
    lazyComponent: true // 懒加载组件
  })
  .mount('#app')

export default app
