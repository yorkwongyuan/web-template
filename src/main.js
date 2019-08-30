import Vue from 'vue'
import App from './App'
import router from './router'
import '@babel/polyfill'

import { dev } from './base/JS/config.js'
import ElementUI from 'element-ui'
import './base/scss/element-variables.scss'
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// import uploader from './components/uploader'
/* 引入全局css */
import './base/scss/reset.scss'
import './base/scss/common.scss'
import './base/scss/custom.scss'
import './base/scss/quill-editor-custom.scss'
import { get, post, put, del, postFile } from './base/JS/interceptor'
import store from './base/JS/store.js'
import api from './base/JS/api'
import utils from './base/JS/utils'
// import './icons'

// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

// Raven.config('//f5ce3bfcb059437e88deb8a0d759f2e6@sentry.mhealth100.com//20').addPlugin(RavenVue, Vue).install()
// Vue.use(uploader)
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(preview)
Vue.prototype.axios = { get, post, put, del, postFile }
Vue.prototype.$selection = Selection
// Vue.prototype.$messageDialog = MessageDialog
// Vue.prototype.$tooltip = Tooltip
Vue.use(api)
Vue.use(utils)

let envName = dev.setEnv()



/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
