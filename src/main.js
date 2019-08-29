import Vue from 'vue'
import App from './App'
import router from './router'
import '@babel/polyfill'

import ElementUI from 'element-ui'
import './base/scss/element-variables.scss'
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
import uploader from './components/uploader'
/* 引入全局css */
import './base/scss/reset.scss'
import './base/scss/common.scss'
import './base/scss/custom.scss'
import './base/scss/quill-editor-custom.scss'
import { get, post, put, del, postFile } from './base/JS/interceptor'
import store from './base/JS/store.js'
import api from './base/JS/api'
import utils from './base/JS/utils'
import Selection from './components/selection/index'
import MessageDialog from './components/messageDialog/index'
import Tooltip from './components/tooltip/'
import axios from 'axios'
import './icons'
// import { dev } from '../config/index'

// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

// Raven.config('//f5ce3bfcb059437e88deb8a0d759f2e6@sentry.mhealth100.com//20').addPlugin(RavenVue, Vue).install()
Vue.use(uploader)
Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(preview)
Vue.prototype.axios = { get, post, put, del, postFile }
Vue.prototype.$selection = Selection
Vue.prototype.$messageDialog = MessageDialog
Vue.prototype.$tooltip = Tooltip
Vue.use(api)
Vue.use(utils)

if (process.env.NODE_ENV === 'production') {
  var b = document.referrer
  // 判断来路链接是否为空,若为空则什么都不提示，若不为空则为正常访问
  if (b !== '' && (b.indexOf('yunzhijia.com') || b.indexOf('mhealth100.com'))) {
    console.log('来路正确')
  } else {
    window.location.href = window.location.protocol + '//' + window.location.host + '/kingdeehit-mwp/#/login'
  }
}

// let envName = dev.setEnv()
let envName = 'production'

// 统计代码
function statistics (pageId, appId) {
  let token = sessionStorage.getItem('ma-token')
  // console.log('token1', token)
  let index = token.lastIndexOf('.')
  token = token.substr(index + 1)
  // console.log('token2', token)
  axios({
    method: 'get',
    url: `/mwp-static/mwp_access.gif`,
    params: {
      appId: appId,
      pageId: pageId,
      token: token
    }
  })
}
router.beforeEach((to, from, next) => {
  var token = sessionStorage.getItem('ma-token')
  if (process.env.NODE_ENV !== envName) {
    next()
  } else {
    let parse = Vue.prototype.util.queryParse
    if (!token) {
      sessionStorage.setItem('ma-ticket', parse(window.location.href).ticket)
      var data = {
        clientId: parse(window.location.href).client_id,
        ticket: parse(window.location.href).ticket
      }
      post('/mwp/token/api/getAccessToken', data, true)
        .then(res => {
          if (res.resultCode === 20000) {
            var timeOut = parseInt(new Date().getTime() / 1000) + res.resultData.expireTime
            sessionStorage.setItem('timeOut', timeOut)
            sessionStorage.setItem('ma-token', res.resultData.token)
            statistics(to.name, parse(window.location.href).client_id)
            next()
          }
        })
    } else {
      statistics(to.name, parse(window.location.href).client_id)
      next()
    }
  }
})

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
