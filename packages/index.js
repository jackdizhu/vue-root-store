import SelectVue from "./SelectVue/index"
import SelectOption from "./SelectOption/index"

const components = {
  SelectVue,
  SelectOption
}

const install = (Vue) => {
  Object.keys(components).forEach(item => {
    Vue.component(item, components[item])
  });
}

export default {
  install,
  ...components
}
