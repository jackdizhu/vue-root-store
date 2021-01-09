import Vue from 'vue'
import VueRouter from 'vue-router'

import page1 from './page1.vue'
import page2 from './page2.vue'
import spaModule from './spa-module.vue'

Vue.use(VueRouter);
const spaModuleRouter = (process.env.SPA_TYPE === 'module' || process.env.NODE_ENV === 'development') ? [
  {
    path: '/spa-module',
    component: spaModule,
  },
  {
    path: '/spa-module/*',
    component: spaModule,
  }
] : []

const routes = [
  {
    path: '/page1',
    component: page1
  },
  {
    path: '/page2',
    component: page2
  },
  ...spaModuleRouter
]
const router =  new VueRouter({
    routes
})

const routerPush = router.push
router.push = function push (to) {
  return routerPush.call(this, to).catch(err => err)
}

export default router