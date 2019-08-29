import Vue from 'vue'
import Main from './main.vue'

let AddBoxConstructor = Vue.extend(Main)

let instance
const reportBox = function (options) {
  options = options || {}
  instance = new AddBoxConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}
export default reportBox
