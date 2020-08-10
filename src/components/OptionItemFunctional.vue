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

<style scoped>
.OptionItem {
  border-top: 1px solid #ddd;
}
</style>
