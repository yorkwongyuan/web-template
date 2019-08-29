import Vue from 'vue'
import Vuex from 'vuex'
import performance from './modules/performance'
import { CRUMB, MENUMESSAGE, SETUSERINFO } from './types'
// 首先声明一个状态 state
Vue.use(Vuex)

const myPlugins = store => {
  store.subscribe(() => {
    // console.log(mutation, 'mutation')
  })
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
    [MENUMESSAGE] ({ commit }, menuMessage) {
      commit('menuMessage', menuMessage)
    },
    [CRUMB] ({ commit }, crumb) {
      commit('crumb', crumb)
    },
    [SETUSERINFO] ({ commit }, userInfo) {
      commit('userInfo', userInfo)
    }
  },
  mutations: {
    [MENUMESSAGE] (state, menuMessage) {
      state.menuMessage = menuMessage
    },
    [CRUMB] (state, crumb) {
      state.crumb = crumb
    },
    [SETUSERINFO] (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  getters: {
    [MENUMESSAGE] (state) {
      return state.menuMessage
    },
    [CRUMB] (state) {
      return state.crumb
    }
  }
})
