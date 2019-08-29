import axios from 'axios'
import vm from '../../main'
// import { dev } from '../../../config/index'
/* 全局默认配置 */
let loading

let MOCK_URL = 'https://mock.mhealth100.com'
// 环境名
let envName = 'production'

// const MOCK_URL = ''
var http = axios.create({
  baseURL: process.env.NODE_ENV === envName ? window.location.protocol + '//' + window.location.host : MOCK_URL
})
/* 请求拦截器 */
http.interceptors.request.use(async config => {
  config.headers['Content-Type'] = 'application/json'
  var token = ''
  /* 之前很多接口都是直接显示loading的，所以只能把新的接口不需要loading的写成false */
  if (config.loading !== false) {
    loading = vm.$loading({
      fullscreen: true,
      background: 'rgba(0, 0, 0, 0)',
      text: '正在加载',
      customClass: 'globalLoading'
    })
  }
  if (sessionStorage.getItem('timeOut')) {
    var timeOut = parseInt(sessionStorage.getItem('timeOut'))
    var nowTime = new Date().getTime() / 1000
    if (timeOut < nowTime && config.url.indexOf('refreshAccessToken') < 0) {
      await getNewToken()
      token = await sessionStorage.getItem('ma-token')
      config.headers['Authorization'] = token
      return config
    } else {
      token = sessionStorage.getItem('ma-token')
      config.headers['Authorization'] = token
      return config
    }
  } else {
    return config
  }
}, error => {
  console.log('请求错误')
  loading.close()
  return Promise.reject(error)
})
/* 响应拦截器 */
http.interceptors.response.use(response => {
  /* resultCode不等于20000时：50011:ticket过期 跳缺省页；50008: token为空或token非法；
  *  其他直接报错误信息 */
  loading.close()
  if (response && response.data.resultCode !== 20000) {
    if (!response.data) {
      vm.$message({
        type: 'error',
        message: '系统繁忙，请稍后再试'
      })
      return response
    } else if (response.data.resultCode === 50008) {
      vm.$message({
        type: 'error',
        message: '获取token失败'
      })
    } else if (response.data.resultCode === 50011 || response.data.resultCode === 50002) {
      vm.$message({
        type: 'error',
        message: '登录信息失效，请重新登录'
      })
      sessionStorage.removeItem('ma-token')
      /* 跳转到医院端后台登录页面 */
      setTimeout(() => {
        window.location.href = window.location.protocol + '//' + window.location.host + '/kingdeehit-mwp/#/login'
      }, 3000)
    } else if (response.resultCode === 59998 && (response.businessCode === '40002' || response.businessCode === '40001')) {
      /* 会诊单详情、会诊安排接口错误码，在具体接口做处理 */
      return response
    } else {
      /* 是下载附件功能不报错 */
      if (!response.headers.filename && !response.headers.fileext) {
        vm.$message({
          type: 'error',
          message: response.data.resultDesc ? response.data.resultDesc : '系统错误，请重试'
        })
      }
    }
    return response
  } else {
    /* resultCode等于20000 */
    return response
  }
}, error => {
  loading.close()
  vm.$message({
    type: 'error',
    message: '系统繁忙，请稍后再试'
  })
  return Promise.reject(error)
})

function get (url, data) {
  url = url + getUrl(data)
  return new Promise((resolve, reject) => {
    http.get(url)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function post (url, data, loading) {
  return new Promise((resolve, reject) => {
    http.post(url, data, { loading: loading })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function getUrl (data) {
  var str = ''
  for (var key in data) {
    str = str + '/' + String(data[key])
  }
  return str
}

function put (url, data) {
  return new Promise((resolve, reject) => {
    http.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function del (url, data) {
  return new Promise((resolve, reject) => {
    url = url + getUrl(data)
    http.delete(url)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
function postFile (url, data) {
  return http.post(url, data, { responseType: 'arraybuffer' }).then((res) => {
    console.log(res)
    console.log('-------------------res--------------------')
    console.log(res)
    if (res.headers.filename) {
      let type = ''
      if (res.headers.fileext === 'xlsx') {
        type = 'application/vnd.ms-excel'
      } else if (res.headers.fileext === 'zip') {
        type = 'application/zip'
      }
      let myFile = new Blob([res.data], { type: type })
      var a = document.createElement('a')
      a.href = window.URL.createObjectURL(myFile)
      a.download = (unescape(res.headers.filename)) + '.' + res.headers.fileext
      a.click()
      document.body.appendChild(a)
    } else {
      vm.$message({
        type: 'warning',
        message: '暂无数据',
        duration: '5000'
      })
    }
  }).then()
}

async function getNewToken () {
  await axios({
    method: 'POST',
    url: window.location.protocol + '//' + window.location.host + '/mwp' + '/token/api/refreshAccessToken',
    data: {
      expiredToken: sessionStorage.getItem('ma-token')
    }
  }).then(res => {
    if (res.data.resultCode === 20000) {
      var timeOut = parseInt(new Date().getTime() / 1000) + res.data.resultData.expireTime
      sessionStorage.setItem('timeOut', timeOut)
      sessionStorage.setItem('ma-token', res.data.resultData.token)
    }
  })
}

export { get, post, put, del, postFile }
