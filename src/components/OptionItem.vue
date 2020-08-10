<template>
  <div class="OptionItem 11">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'OptionItem',
  inject: ['debug', 'SelectVue'], // 接收上级组件注入
  methods: {
    getParent ($parent) {
      if (this.SelectVue) {
        return this.SelectVue
      }
      // 根据vNode向上查找
      if (!$parent || $parent === this) {
        return null
      }
      if ($parent.$option.name === 'SelectVue') {
        return $parent
      } else {
        return this.getParent($parent.$parent)
      }
    },
    onClick () {
      let vNode = this.getParent(this.$parent)
      vNode && vNode.$emit('optionClick', this.name, this)
      this.$emit('optionClick', this.name)
    }
  },
  created () {
    this.debug && console.log(this.$root._vnode, '--root._vnode--,,')
    this.debug && console.log(this.SelectVue, 'created $parent.$parent inject SelectVue')
  }
}
</script>

<style scoped>
.OptionItem {
  border-top: 1px solid #ddd;
}
</style>
