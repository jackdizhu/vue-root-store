import Vue from 'vue'
import App from './App.vue'
import router from './router'

import lib from '@lib/index/index.js'
// import SelectVue from '@lib/select-vue/index.js'
Vue.use(lib)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

