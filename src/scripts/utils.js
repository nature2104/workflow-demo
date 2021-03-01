/**
 * 一些帮助函数
 * @author momoko
 */

/**
 * 取URL上的参数
 * @param  {String} param 参数名
 * @return {String}
 */
export function getUrlParam (param) {
  const result = window.location.href.match(new RegExp('(\\?|&)' + param + '(\\[\\])?=([^&#]*)'))
  return result ? result[3] : undefined
}

/**
 * 动态插入 script to html
 * @param url
 * @param callback
 */
export function createScript (url, callback) {
  const oScript = document.createElement('script')
  oScript.type = 'text/javascript'
  oScript.async = true
  oScript.src = url

  /**
   * IE6/7/8                -- onreadystatechange
   * IE9/10                 -- onreadystatechange, onload
   * Firefox/Chrome/Opera   -- onload
   */

  const isIE = !-[1,] // eslint-disable-line
  if (isIE) {
    // 判断IE8及以下浏览器
    oScript.onreadystatechange = function () {
      if (this.readyState === 'loaded' || this.readyState === 'complete') {
        callback && callback()
      }
    }
  } else {
    // IE9及以上浏览器，Firefox，Chrome，Opera
    oScript.onload = function () {
      callback && callback()
    }
  }

  document.body.appendChild(oScript)
}

/**
 * 判断平台
 * @return {String} 平台
 */
export function detectOS () {
  const ua = navigator.userAgent.toLowerCase()

  if (/MicroMessenger/i.test(ua)) {
    return 'weixin'
  } else if (/iPhone|iPad|iPod|iOS/i.test(ua)) {
    return 'ios'
  } else if (/Android/i.test(ua)) {
    return 'android'
  } else {
    return 'other'
  }
}
