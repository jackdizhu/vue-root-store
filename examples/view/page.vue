<template>
  <div>
    <SelectVue @onChange="onChange">
      <div class="option-box">
        <SelectOption v-for="(item, index) in list"
          :key="index"
          :name="item.name"
          :checked="value === item.name">
          {{'Item-' + item.name}}
        </SelectOption>
      </div>
    </SelectVue>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      list: [
        {name: 'page-1'},
        {name: 'page-2'}
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
