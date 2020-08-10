<template>
  <div id="app">
    {{getStoreVersion}}
    <Select @onChange="onChange">
      <div class="option-box">
        <Option v-for="(item, index) in list"
          :key="index"
          :name="item.name"
          :checked="value === item.name">
          <Item :value="item.name" :context="{value: value}">
            {{'Item-' + item.name}}
          </Item>
        </Option>
      </div>
    </Select>
    <p>
      <a @click="$router.push('/page1')">page1</a>
      <a @click="$router.push('/page2')">page2</a>
    </p>
    <router-view/>
  </div>
</template>

<script>
import Select from './components/SelectVue.vue'
// import Select from './components/SelectVueStore.vue'
import Option from './components/OptionVue.vue'
// import Item from './components/OptionItem.vue'
import Item from './components/OptionItemFunctional.vue'
import {storeMixin} from './rootStore'

export default {
  name: 'App',
  components: {
    Select,
    Item,
    Option
  },
  mixins: [storeMixin],
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
  },
  computed: {
    getStoreVersion () {
      return this.getStoreData('version')
    }
  },
  created () {
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p a {
  padding: 3px 6px;
  margin: 0 7px;
  border-radius: 3px;
  cursor: pointer;
  background: #eee;
  color: #03a9f4;
}
</style>
