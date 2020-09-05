# vue-select-options

## App.vue

```html
<template>
  <div id="app">
    <Select @onChange="onChange">
      <div class="option-box">
        <Option v-for="(item, index) in list"
          :key="index"
          :name="item.name"
          :checked="value === item.name">
          <Item>
            {{'Item-' + item.name}}
          </Item>
        </Option>
      </div>
    </Select>
  </div>
</template>

<script>
import Select from './components/SelectVue.vue'
import Option from './components/OptionVue.vue'
import Item from './components/OptionItem.vue'

export default {
  name: 'App',
  components: {
    Select,
    Item,
    Option
  },
  data () {
    return {
      list: [
        {name: 'Option-1'},
        {name: 'Option-2'}
      ],
      value: ''
    }
  },
  methods: {
    onChange (val) {
      this.value = val
      console.log(val, 'onChange')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

## SelectVue.vue

```html
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
      SelectVue: this,
      checkValue: this.checkName,
      SelectRoot: this.SelectRoot
    }
  },
  data () {
    return {
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
    console.log(this.$children.length, 'created $children.length')
  },
  mounted () {
    // 子组件mounted后触发
    let $children = this.getChildren(this.$children, 'OptionVue')
    console.log($children.length, 'mounted $children.length')
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
```

## OptionVue.vue

```html
<template>
  <div class="OptionVue"
    :class="{'OptionVue-checked': checked}"
    @click="onClick">
    <slot v-if="$slots.default"/>
    <span v-else>{{name}}</span>
  </div>
</template>

<script>

export default {
  name: 'OptionVue',
  // 基础数据类型不响应，object类型可以watch
  inject: ['SelectVue', 'checkValue', 'SelectRoot'], // 接收上级组件注入
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
      console.log(nVal, 'watch checkValue -- ' + this.name)
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
        console.log(nVal.value, 'selectVueVNode.SelectRoot watch in -- ' + this.name)
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
    console.log(this.selectVueVNode, 'created selectVueVNode')
    console.log(this.$parent, 'created $parent')
  },
  mounted () {
    console.log(this.$parent, 'mounted $parent')
  }
}
</script>

<style scoped>
.OptionVue {
  cursor: pointer;
}
.OptionVue-checked {
  background: #eee;
}
</style>
```

## OptionItem.vue

```html
<template>
  <div class="OptionItem">
    <slot/>
  </div>
</template>

<script>

export default {
  name: 'OptionItem',
  inject: ['SelectVue'], // 接收上级组件注入
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
    console.log(this.SelectVue, 'created $parent.$parent inject SelectVue')
  }
}
</script>

<style scoped>
.OptionItem {
  border-top: 1px solid #ddd;
}
</style>
```