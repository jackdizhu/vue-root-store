import Vue from 'vue'
// import App from './App.vue'
import App from './AppStore.vue'
// import store from './store'
import router from './router'

Vue.config.productionTip = false
// App.$root_store = {}
new Vue({
  // store,
  router,
  render: h => h(App),
}).$mount('#app')


