export default {
  install (Vue) {
    // 环境名
    let envName = 'production'
    Vue.prototype.API_URL = process.env.NODE_ENV === envName ? PRODUCT_API : MOCK_API
  }
}
const MOCK_API = {}
const PRODUCT_API = {}
