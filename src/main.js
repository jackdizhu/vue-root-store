import Vue from 'vue'
import App from './AppStore.vue'
import {rootMixin} from './rootStore'
import router from './router'

Vue.config.productionTip = false
let app = null;

const isProd = process.env.NODE_ENV !== 'development';
const render = function (id = '#app-group') {
  return app ? app : (app = new Vue({
    mixins: [rootMixin],
    router,
    render: h => h(App),
  }).$mount(id))
}
if (!isProd) {
  render()
}

const appName = 'module-demo'

export default {
  appName,
  render
}

