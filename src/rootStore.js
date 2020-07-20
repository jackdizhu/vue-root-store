let $root = null

const storeUtil = {
  root: function (vNode, type) {
    console.log(type, vNode.$root === vNode) // true
    if (!$root) {
      if (type && vNode.$root) {
        $root = vNode.$root
      } else {
        throw new Error('$root is not found')
      }
    }
    return $root
  }
}

// rootMixin
export const rootMixin = {
  data () {
    return {
      state: {
        version: '0.0.1'
      }
    }
  },
  methods: {
    addWatch (name, fn) {
      let unwatch = this.$watch(name, fn, {
        deep: true
      })
      return unwatch
    },
    getStoreData (key, data) {
      let arr = key.split('.')
      let res = this.state
      for (let i = 0; i < arr.length; i++) {
        const $key = arr[i];
        if (data && i === arr.length - 1) {
          this.$set(res, $key, data)
        }
        res = res[$key]
        if (res === void(0)) {
          break;
        }
      }
      return res
    },
    setStoreData (key, data) {
      this.getStoreData(key, data)
    }
  },
  created () {
    $root = storeUtil.root(this, 'app')
  }
}

// page mixin
export const storeMixin = {
  data () {
    return {
      rootStore: null,
      storeWatchs: {}
    }
  },
  created () {
    this.rootStore = storeUtil.root(this)
  },
  methods: {
    getStoreData (key) {
      return this.rootStore.getStoreData(key)
    },
    setStoreData (key, data) {
      this.rootStore.setStoreData(key, data)
    },
    addWatch (name, fn) {
      this.storeWatchs[name] = this.rootStore.addWatch(name, fn)
    },
    removeWatch () {
      for (const key in this.storeWatchs) {
        if (Object.prototype.hasOwnProperty.call(this.storeWatchs, key)) {
          const unwatch = this.storeWatchs[key];
          unwatch()
        }
      }
      console.log('-- storeMixin removeWatch --')
    }
  },
  beforeDestroy () {
    this.removeWatch()
  }
}
