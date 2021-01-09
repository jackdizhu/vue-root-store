<template>
  <div>
    <p>
      <a @click="$router.push('/page1')">page1</a>
      <a @click="$router.push('/page2')">page2</a>
      <a @click="$router.push('/spa-module/module-demo')">spa-module</a>
    </p>
    <router-view/>
  </div>
</template>

<script>
import {storeMixin} from './rootStore'

export default {
  name: 'App',
  components: {
  },
  mixins: [storeMixin],
  data () {
    return {
    }
  },
  methods: {
    onChange (val) {
      this.value = val
      console.log(val, 'onChange')
    }
  },
  created () {
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p a {
  padding: 3px 6px;
  margin: 0 7px;
  border-radius: 3px;
  cursor: pointer;
  background: #eee;
  color: #03a9f4;
}
</style>
