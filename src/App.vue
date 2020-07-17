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

    <router-view>
  </div>
</template>

<script>
import Select from './components/SelectVue.vue'
// import Select from './components/SelectVueStore.vue'
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
      value: '',
      rootStore: {
        test: '111--11'
      }
    }
  },
  methods: {
    onChange (val) {
      this.value = val
      console.log(val, 'onChange')
    }
  },
  created () {
    console.log(this.rootStore)
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
