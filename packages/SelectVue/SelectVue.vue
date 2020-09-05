<template>
  <div class="select-vue">
    <p>选中：{{checkName}}</p>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'SelectVue',
  // 向下级组件注入
  provide () {
    return {
      debug: this.debug,
      SelectVue: this,
      checkValue: this.checkName,
      SelectRoot: this.SelectRoot
    }
  },
  data () {
    return {
      debug: true,
      checkName: '',
      SelectRoot: {
        value: ''
      }
    }
  },
  methods: {
    optionClick (event, vNode) {
      this.checkName = vNode.name
      this.emit()
    },
    emit () {
      this.SelectRoot.value = this.checkName
      this.$emit('onChange', this.checkName)
    },
    // 查找指定下级组件
    getChildren ($children, tag) {
      let arr = []
      if (!$children || !$children.length) {
        return arr
      }
      for (let i = 0; i < $children.length; i++) {
        const item = $children[i]
        if (item.$options.name === tag) {
          arr.push(item)
        } else {
          arr.push(...this.getChildren(item.$children, tag))
        }
      }
      return arr
    }
  },
  created () {
    this.$on('optionClick', this.optionClick)
    this.debug && console.log(this.$children.length, 'created $children.length')
  },
  mounted () {
    // 子组件mounted后触发
    let $children = this.getChildren(this.$children, 'OptionVue')
    this.debug && console.log($children.length, 'mounted $children.length')
    if ($children.length) {
      this.checkName = $children[0].name
      this.emit()
    }
  }
}
</script>

<style scoped>
.select-vue {
  border: 1px solid #ddd;
  border-radius: 3px;
}
</style>
