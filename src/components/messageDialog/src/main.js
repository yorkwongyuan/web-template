import Vue from 'vue'
import Main from './main.vue'

let MessageDialogConstructor = Vue.extend(Main)

let instance
const messageDialog = function (options) {
  options = options || {}
  instance = new MessageDialogConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  return instance.vm
}
export default messageDialog
