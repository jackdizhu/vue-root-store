let $root = null
// watch
let watchs = {}
function storeWatchHandler (fn) {
  return function (nVal, oVal) {
    let fns = watchs[fn] || []
    for (let i = 0; i < fns.length; i++) {
      const fn = fns[i];
      fn(nVal, oVal);
    }
  }
}
function storeRemoveWatch (name, fn) {
  let $watchs = watchs[name] || []
  if ($watchs.length === 1) {
    delete watchs[name]
  }
  let index = $watchs.findIndex(item => item === fn)
  if (index !== -1) {
    $watchs.splice(index, 1)
  }
}
// mixin
let $computed = {}
function getComputed (root = $root, arr = storeUtil.computed) {
  for (let i = 0; i < arr.length; i++) {
    const fnName = arr[i]
    $computed[fnName] = function () {
      return root[fnName]
    }
  }
  console.log($computed, '$computed')
}
let $methods = {}
function getMethods (root = $root, arr = storeUtil.methods) {
  for (let i = 0; i < arr.length; i++) {
    const fnName = arr[i]
    $methods[fnName] = root[fnName]
  }
}
export const getter = $computed
export const mutation = $methods
// store
const store = {
  state: {
    version: '0.0.1'
  },
  watch: {
    'state.version': {
      handler: storeWatchHandler('state.version')
    }
  },
  computed: {
    getVersion: function () {
      return this.state.version
    }
  },
  methods: {
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
    },
    addVersion: function ({key, num}) {
      let arr = this.state.version.split('.')
      arr[key - 1] = Number(arr[key - 1]) + num
      this.state.version = arr.join('.')
    }
  },
  init: function (vNode) {
    $root = storeUtil.root(vNode, 'app')
  }
}

const storeUtil = {
  root: function (vNode) {
    // console.log(vNode.$root.$children[0], vNode.$root.$children[0] === vNode) // true
    if (!$root) {
      if (vNode.$root && vNode.$root.$children.length) {
        $root = vNode.$root.$children[0]
        getComputed()
        getMethods()
      } else {
        throw new Error('$root is not found')
      }
    }
    return $root
  },
  computed: [
    'getVersion'
  ],
  methods: [
    'addVersion'
  ]
}

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
  computed: {
    // ...$computed
  },
  methods: {
    getStoreData (key) {
      return this.rootStore.getStoreData(key)
    },
    setStoreData (key, data) {
      this.rootStore.setStoreData(key, data)
    },
    // ...$methods,
    addWatch (name, fn) {
      watchs[name] = watchs[name] || []
      watchs[name].push(fn)
      this.storeWatchs[name] = fn
    },
    removeWatch () {
      for (const key in this.storeWatchs) {
        if (Object.prototype.hasOwnProperty.call(this.storeWatchs, key)) {
          const fn = this.storeWatchs[key];
          storeRemoveWatch(key, fn)
        }
      }
      console.log(watchs, '--rootStore watchs--')
    }
  },
  beforeDestroy () {
    this.removeWatch()
  }
}

export default store