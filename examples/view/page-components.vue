<template>
  <div>
    <Select @onChange="onChange">
      <div class="option-box">
        <Option v-for="(item, index) in list"
          :key="index"
          :name="item.name"
          :checked="value === item.name">
          {{'Item-' + item.name}}
        </Option>
      </div>
    </Select>
  </div>
</template>

<script>
import Select from '@lib/select-vue/index.js'
import Option from '@lib/select-option/index.js'

export default {
  name: 'page2',
  components: {
    Select,
    Option
  },
  data () {
    return {
      list: [
        {name: 'page2-1'},
        {name: 'page2-2'}
      ],
      value: ''
    }
  },
  methods: {
    onChange (val) {
      this.value = val
    }
  },
  created () {
    console.log(this.$root.$children[0], '-- page2.$root.$children[0] --')
  }
}
</script>

<style scoped>

</style>
