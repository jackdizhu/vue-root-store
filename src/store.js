import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

 // 实例化store，调用install方法，注入$store到所有组件
const store = new Vuex.Store({
  state: {
    version: '0.0.1'
  },
  getters: {
    getVersion (state) {
      return state.version
    }
  },
  modules: {},
  mutations: {
    // 同步操作
    addVersion (state, {key, num = 1}) {
      let arr = state.version.split('.')
      arr[key - 1] = Number(arr[key - 1]) + num
      state.version = arr.join('.')
    }
  },
  actions: {
    // 异步操作
    asyncAddVersion (context, {key, num = 1}) {
      context.commit('addVersion', {key, num})
    }
  }
});
export default store