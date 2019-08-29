import Vue from 'vue'
import Main from './main.vue'

let SelectionConstructor = Vue.extend(Main)
let instance
const Selection = function (options) {
  options = options || {}
  instance = new SelectionConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}
export default Selection
