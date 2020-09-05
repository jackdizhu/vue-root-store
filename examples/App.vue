<template>
  <div id="app">
    <div>
      <p>
        <a href="/#/">首页</a>
        <a href="/#/components">按需加载</a>
      </p>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
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
a {
  display: inline-block;
  line-height: 16px;
  margin: 0 14px;
}
</style>
