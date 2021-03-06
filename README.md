# vue-root-store

* 根据$root关联store，而不需要注入全局mixin
* 按需引入mixin，有getStoreData、setStoreData、addWatch、removeWatch等方法
* [store]分支 - root注入rootMixin(必须)，page注入storeMixin(按需)
* [store]分支 - rootMixin注入到root(main.js中的new Vue)

## functional 无状态组件

```vue
<template functional>
  <div class="OptionItem" :class="{'active': props.value === props.context.value}">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'OptionItem',
  functional: true,
  props: {
    value: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: () => {
        return {
          value: ''
        }
      }
    }
  }
}
</script>
```