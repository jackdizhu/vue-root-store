import Vue from 'vue'
// import App from './App.vue'
import App from './AppStore.vue'
// import store from './store'
import {rootMixin} from './rootStore'
import router from './router'

Vue.config.productionTip = false
// App.$root_store = {}
new Vue({
  mixins: [rootMixin],
  // store,
  router,
  render: h => h(App),
}).$mount('#app')


