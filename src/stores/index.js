// import Vue from 'vue'
import Vuex from 'vuex'
// Vue.use(Vuex)
const vuexStore = new Vuex.Store({
  state: {
    isCollapse: false
  },
  mutations: {
    // 增加nutations属性
    setIsCollapse(state, value) {
      // 增加一个mutations的方法，方法的作用是让num从0变成5，state是必须默认参数
      state.isCollapse = value.isBlooen
    }
  }
})
export default vuexStore
