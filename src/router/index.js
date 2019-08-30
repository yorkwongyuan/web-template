import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/main-page'
    },
    {
      path: '/main-menu',
      name: 'mainMenu',
      meta: {
        keepAlive: false
      },
      component: resolve => { require(['../views/main-pages/main-page'], resolve) },
    },
  ]
})

router.afterEach(to => {
  if (window._hmt) {
    window._hmt.push(['_trackPageview', window.baseConfig.pageUrl + to.fullPath])
  }
})

export default router
