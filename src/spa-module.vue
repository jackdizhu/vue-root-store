<template>
  <div>
    {{getModule && getModule.name}}
    <div ref="spa-module-view" id="app"></div>
  </div>
</template>

<script>
export default {
  name: 'page2',
  components: {
  },
  data () {
    return {
      load: {}
    }
  },
  computed: {
    getModule () {
      return {
        name: 'module-demo',
        url: this.$route.params.pathMatch + '/index.js'
      };
    }
  },
  methods: {
    loadSpaModuleCallBack (res) {
      console.log(res, '-- loadModule --' + res.appName)
      if (res.render && res.appName) {
        this.cache[res.appName] = res
        let el = res.render('#app')
        console.log(el, '-- loadModule el')
      }
    },
    loadModule (appModule, callBack) {
      if (this.load[appModule.name] !== void 0) {
        return callBack(this.load[appModule.name])
      } 
      let el = document.createElement('script')
      el.src = appModule.url
      document.body.appendChild(el)
      this.cache[appModule.name] = 'loading'
    },
    loda () {
      let appModule = this.getModule
      console.log(appModule, 'spa-module -- mounted');
      if (this.cache[appModule.name] && this.cache[appModule.name] !== 'loading') {
        this.loadSpaModuleCallBack(this.cache[appModule.name])
        return false
      }
      window.loadSpaModuleCallBack = this.loadSpaModuleCallBack
      this.loadModule(appModule)
    }
  },
  mounted () {
    window.loadSpaModuleCallBack = {}
    // window.loadSpaModuleCache = window.loadSpaModuleCache || {}
    window.loadSpaModuleCache = {}
    this.cache = window.loadSpaModuleCache
    this.loda()
  }
}
</script>

<style scoped>

</style>
