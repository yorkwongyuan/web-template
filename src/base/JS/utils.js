export default {
  install (Vue) {
    Vue.prototype.util = {
      /* 日期格式化 */
      dateFormat (date, fmt) {
        var o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds(),
          'q+': Math.floor((date.getMonth() + 3) / 3),
          'S': date.getMilliseconds()
        }
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
      },
      /* url序列参数转化为对象 */
      queryParse (url) {
        if (url.indexOf('?') === -1) {
          return null
        }
        var str = url.split('?')[1].split('#')[0]
        var items = str.split('&')
        var result = {}
        var arr = []
        for (var i = 0; i < items.length; i++) {
          arr = items[i].split('=')
          result[arr[0]] = arr[1]
        }
        return result
      },
      queryParse1 (url) {
        if (url.indexOf('sourceid') === -1) {
          return null
        }
        var str = ''
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          str = url.split('?')[2]
        } else {
          str = url.split('?')[1].split('#')[0]
        }
        // var str = url.split('?')[2]
        var items = str.split('&')
        var result = {}
        var arr = []
        for (var i = 0; i < items.length; i++) {
          arr = items[i].split('=')
          result[arr[0]] = arr[1]
        }
        return result
      },
      /* 判断设备处于PC还是移动端 */
      mobileTest () {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          /* 移动端 */
          return true
        } else {
          /* web端 */
          return false
        }
      },
      /* 将年月日时分秒字符串截取成年月日字符串 */
      changeTimeToDate (time) {
        if (!time) {
          return ''
        }
        let timeArray = time.split(' ')
        if (timeArray.length === 2) {
          return timeArray[0]
        } else {
          return ''
        }
      },
      /* 判断输入框是否有表情 */
      isEmojiCharacter (substring) {
        for (var i = 0; i < substring.length; i++) {
          let hs = substring.charCodeAt(i)
          if (hs >= 0xd800 && hs <= 0xdbff) {
            if (substring.length > 1) {
              let ls = substring.charCodeAt(i + 1)
              var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
              if (uc >= 0x1d000 && uc <= 0x1f77f) {
                return true
              }
            }
          } else if (substring.length > 1) {
            let ls = substring.charCodeAt(i + 1)
            if (ls === 0x20e3) {
              return true
            }
          } else {
            if (hs >= 0x2100 && hs <= 0x27ff) {
              return true
            } else if (hs >= 0x2B05 && hs <= 0x2b07) {
              return true
            } else if (hs >= 0x2934 && hs <= 0x2935) {
              return true
            } else if (hs >= 0x3297 && hs <= 0x3299) {
              return true
            } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 ||
              hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
              return true
            }
          }
        }
      },
      /* 解决内网图片无法显示的问题 */
      changeUrl (url) {
        if (!url) return
        if (url.indexOf('mhealth100.com') < 0) {
          return url
        }
        if (window.location.host.indexOf('mhealth100.com') > -1 || process.env.NODE_ENV !== 'production') {
          return url
        } else {
          if (url.indexOf('http') > -1) {
            var arr = url.split('www.mhealth100.com')
            return 'http://' + window.location.host + arr[1]
          } else {
            var url1 = url.replace('www.mhealth100.com', window.location.host)
            return url1
          }
        }
      },
      /* 获取某一天前或后n天 */
      getSomeDay (init, n) {
        var date = new Date(init)
        date.setDate(date.getDate() + n)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return year + '-' + month + '-' + day
      },
      // 获取本月第一天
      getMonthFirstDay () {
        var date = new Date()
        date.setDate(1)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return year + '-' + month + '-' + day
      },
      // 获取本月最后一天
      getMonthLastDay () {
        var date = new Date()
        var currentMonth = date.getMonth()
        var nextMonth = ++currentMonth
        var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
        var oneDay = 1000 * 60 * 60 * 24
        var res = new Date(nextMonthFirstDay - oneDay)
        var year = res.getFullYear()
        var month = res.getMonth() + 1
        var day = res.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return year + '-' + month + '-' + day
      },
      // 获取本周第一天
      getWeekFirstDay () {
        var date = new Date()
        var weekDay = date.getDay()
        date.setDate(date.getDate() - weekDay)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return year + '-' + month + '-' + day
      },
      // 获取本周最后一天
      getWeekLastDay () {
        var date = new Date()
        var weekDay = date.getDay()
        date.setDate(date.getDate() + 6 - weekDay)
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return year + '-' + month + '-' + day
      },
      // 获取cookie对象
      getCookieObject: () => {
        let cookies = document.cookie.split(';').reduce((cks, ck) => ({
          [ck.substr(0, ck.indexOf('=')).trim()]: ck.substr(ck.indexOf('=') + 1)
        }), {})
        const setCookie = (name, val) => (document.cookie = `${name}=${val}`)
        const deleteCookie = (name) => (document.cookie = `${name}=;expires= Thu, 01 jan 1970 00:00:01 GMT;`)
        return new Proxy(cookies, {
          set: (TrapTarget, prop, receiver) => {
            return (setCookie(prop, receiver), Reflect.set(TrapTarget, prop, receiver))
          },
          deleteProperty: (obj, prop) => {
            return (deleteCookie(prop), Reflect.deleteProperty(obj, prop))
          }
        })
      }
    }
  }
}
