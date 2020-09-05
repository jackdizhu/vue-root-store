import Vue from 'vue'
import VueRouter from 'vue-router'

import page from './view/page.vue'
import components from './view/page-components.vue'

Vue.use(VueRouter);
const routes = [
    {
      path: '/',
      component: page
    },
    {
      path: '/components',
      component: components
    }
]
const router =  new VueRouter({
    routes
})

export default router