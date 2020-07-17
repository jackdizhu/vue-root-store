<template>
  <div>
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
// import Select from './components/SelectVue.vue'
import Select from './components/SelectVueStore.vue'
import Option from './components/OptionVue.vue'
import Item from './components/OptionItem.vue'
import {storeMixin} from './rootStore'

export default {
  name: 'page2',
  components: {
    Select,
    Item,
    Option
  },
  mixins: [storeMixin],
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
