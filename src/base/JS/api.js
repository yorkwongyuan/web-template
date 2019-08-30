import { dev } from './config.js'
export default {
  install (Vue, options) {
    // 环境名
    let envName = dev.setEnv()
    Vue.prototype.API_URL = process.env.NODE_ENV === envName ? PRODUCT_API : MOCK_API
  }
}
let PRODUCT_API = {

}

let MOCK_API = {

}
