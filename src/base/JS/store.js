import Vue from 'vue'
import Vuex from 'vuex'
import performance from './modules/performance'
import { CRUMB, MENUMESSAGE, SETUSERINFO } from './types'
// 首先声明一个状态 state
Vue.use(Vuex)

const myPlugins = store => {
  store.subscribe(() => { })
}
export default new Vuex.Store({
  plugins: [myPlugins],
  modules: {
    performance: performance
  },
  state: {
    /* 导航栏 */
    menuMessage: {},
    /* 面包屑 */
    crumb: [],
    userInfo: {}
  },
  actions: {

  },
  mutations: {

  },
  getters: {
  }
})
