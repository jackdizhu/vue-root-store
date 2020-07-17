<template>
  <div>
    <span>
      {{getStoreVersion}}
    </span>
    <!-- <Select @onChange="onChange">
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
    </Select> -->
  </div>
</template>

<script>
// import Select from './components/SelectVue.vue'
// import Select from './components/SelectVueStore.vue'
// import Option from './components/OptionVue.vue'
// import Item from './components/OptionItem.vue'
import {storeMixin} from './rootStore'

export default {
  name: 'page1',
  components: {
    // Select,
    // Item,
    // Option
  },
  mixins: [storeMixin],
  data () {
    return {
      list: [
        {name: 'page1-1'},
        {name: 'page1-2'}
      ],
      value: ''
    }
  },
  computed: {
    getStoreVersion () {
      return this.getStoreData('version')
    }
  },
  methods: {
    onChange (val) {
      this.value = val
    },
    log (nVal) {
      console.log(nVal, '-- watch state.version --')
    },
    addVersion ({key, num}) {
      let arr = this.getStoreVersion.split('.')
      arr[key - 1] = Number(arr[key - 1]) + num
      return arr.join('.')
    }
  },
  created () {
    this.addWatch('state.version', this.log)
    console.log(this.rootStore.state, '--page1.root.rootStore--')
    this.setStoreData('version', this.addVersion({key: 3, num: 1}))
    setTimeout(() => {
      this.setStoreData('version', this.addVersion({key: 3, num: 1}))
    }, 1000)
  },
  
}
</script>

<style scoped>

</style>
