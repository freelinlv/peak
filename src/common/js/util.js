export default {
  getQueryStringByName: name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var context = ''
    if (r != null) { context = r[2] }
    reg = null
    r = null
    return context == null || context === '' || context === 'undefined' ? '' : context
  },
  getQueryByNameFromUrl: (name, url) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var r = url.split('?')[1].match(reg)
    var context = ''
    if (r != null) { context = r[2] }
    reg = null
    r = null
    return context == null || context === '' || context === 'undefined' ? '' : context
  },
  jdugeShow: name => {
    let pageItems = localStorage.getItem('page_items').split(',') || []
    let visible = pageItems.indexOf(name) !== -1
    return visible
  },
  jdugeMenu: name => {
    let pageItems = localStorage.getItem('menus').split(',') || []
    let visible = pageItems.indexOf(name) === -1
    return visible
  },
  timeStampToDate: timeStamp => {
    let date = new Date(timeStamp)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  },
  getTimeStamp (t) {
    let time = new Date(t).getTime() / 1000
    return time
  },
  getTimeDiff (time1, time2, type) {
    // 返回的是time1-time2相差的天数
    let t1 = new Date(time1)
    let t2 = new Date(time2)
    let date = t1.getTime() - t2.getTime()
    if (type === 'day') {
      let days = Math.floor(date / (24 * 3600 * 1000))
      return days
    } else {
      return date
    }
  },
  isSupplier: () => {
    let domain = document.domain
    if (domain.indexOf('supplier') !== -1) {
      return true
    }
  },
  formatTime (time) {
    let date = new Date(time * 1000)
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    let min = date.getMinutes()
    let s = date.getSeconds()
    min = min < 10 ? ('0' + min) : min
    s = s < 10 ? ('0' + s) : s
    return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
  },
  Mul (arg1, arg2) {
    let m = 0
    let s1 = arg1.toString()
    let s2 = arg2.toString()
    try {
      m += s1.split('.')[1].length
    } catch (e) {
    }
    try {
      m += s2.split('.')[1].length
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  },
  offsetLeft (el) {
    var l = 0
    while (el) {
      l = l + el.offsetLeft + el.clientLeft
      el = el.offsetParent
    }
    return l
  },
  getCookie (name) {
    // var name = name + '='
    var value = '; ' + document.cookie
    var parts = value.split('; ' + name + '=')
    if (parts.length === 2) return parts.pop().split(';').shift()
  }
}
