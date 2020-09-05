<template>
  <div class="SelectOption"
    :class="{'SelectOption-checked': checked}"
    @click="onClick">
    <slot v-if="$slots.default"/>
    <span v-else>{{name}}</span>
  </div>
</template>

<script>

export default {
  name: 'SelectOption',
  // 基础数据类型不响应，object类型可以watch
  inject: ['debug', 'SelectVue', 'checkValue', 'SelectRoot'], // 接收上级组件注入
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectVueVNode: null
    }
  },
  watch: {
    // 无效
    'checkValue': function (nVal) {
      this.debug && console.log(nVal, 'watch checkValue -- ' + this.name)
    },
    // // inject Object
    // 'SelectRoot': {
    //   handler: function (nVal) {
    //     console.log(nVal, 'watch SelectRoot -- ' + this.name)
    //   },
    //   deep: true
    // },
    // // vNode data
    // 'selectVueVNode.checkName': function (nVal) {
    //   console.log(nVal, 'watch selectVueVNode.checkName -- ' + this.name)
    // },
    'selectVueVNode.SelectRoot': {
      handler: function (nVal) {
        this.debug && console.log(nVal.value, 'selectVueVNode.SelectRoot watch in -- ' + this.name)
      },
      deep: true
    }
  },
  methods: {
    // 查找指定上级组件
    getParent ($parent, tag) {
      if (!$parent || $parent === this) {
        return null
      }
      if ($parent.$options.name === tag) {
        return $parent
      } else {
        return this.getParent($parent.$parent, tag)
      }
    },
    onClick () {
      this.selectVueVNode && this.selectVueVNode.$emit('optionClick', this.name, this)
      this.$emit('optionClick', this.name)
    }
  },
  created () {
    // 获取上级SelectVue对象vNode
    this.selectVueVNode = this.SelectVue || this.getParent(this.$parent, 'SelectVue')
    this.debug && console.log(this.selectVueVNode, 'created selectVueVNode')
    this.debug && console.log(this.$parent, 'created $parent')
  },
  mounted () {
    this.debug && console.log(this.$parent, 'mounted $parent')
  }
}
</script>

<style scoped>
.SelectOption {
  cursor: pointer;
}
.SelectOption-checked {
  background: #eee;
}
</style>
