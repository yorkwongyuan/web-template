import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: []
})

router.afterEach(to => {
  if (window._hmt) {
    window._hmt.push(['_trackPageview', window.baseConfig.pageUrl + to.fullPath])
  }
})

export default router
