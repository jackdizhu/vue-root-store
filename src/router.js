import Vue from 'vue'
import VueRouter from 'vue-router'

import page1 from './page1.vue'
import page2 from './page2.vue'

Vue.use(VueRouter);
const routes = [
    {
      path: '/page1',
      component: page1
    },
    {
      path: '/page2',
      component: page2
    }
]
const router =  new VueRouter({
    routes
})

export default router