import Vue from 'vue'
import Main from './main.vue'

let TooltipConstructor = Vue.extend(Main)

let instance
const Tooltip = options => {
  options = options || {}
  instance = new TooltipConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}
export default Tooltip
