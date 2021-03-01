// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import flexible from './common/ydui.flexible'

import {componentInstall, appStyle} from 'hls-easy-ui'
/**
 * 指令
 */
import directives from './scripts/directives'

import filter from './scripts/filter'

import {
  Picker,
  Tabbar,
  TabbarItem,
} from 'vux'

import './scripts/prototype'
import './scripts/vuePlatform'

/**
 * 弹框组件
 */
import hlsPopup from './scripts/hlsPopup'

/**
 * http
 */
import {post, get} from './scripts/hlsHttp'

/** 全局函数hlsUtil**/

import hlsUtil from './scripts/hlsUtil'

if (process.env.CONFIG_ENV === 'uat') {
  const VConsole = require('vconsole')
  new VConsole() // eslint-disable-line
}

Vue.use(directives)

Vue.use(filter)

/**
 * 组件
 */

Vue.use(componentInstall)
Vue.use(appStyle)
Vue.use(flexible)
Vue.component('picker', Picker)
Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)

Vue.prototype.hlsPopup = window.hlsPopup = hlsPopup
Vue.prototype.$devicePixelRatio = 2

Vue.prototype.$post = post
Vue.prototype.$get = get
let hlsHttp = {
  get: get,
  post: post,
}
Vue.prototype.hlsHttp = window.hlsHttp = hlsHttp

Vue.prototype.hlsUtil = window.hlsUtil = hlsUtil

/** end**/

/**
 * 全局返回上一页面
 * @param index
 */
let routeGo = function (index) {
  if (!index) {
    index = -1
  }
  this.$router.go(index)
}
Vue.prototype.$routeGo = routeGo

// FastClick.attach(document.body)

Vue.config.productionTip = true
let backButtonPressedOnceToExit

vum.$vumPlatform.ready(function () {
  try {
    setTimeout(function () {
      navigator.splashscreen.hide()
    }, 40)
  } catch (e) {
  }
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
    cordova.plugins.Keyboard.disableScroll(true)
  }
  if (window.StatusBar) {
    window.StatusBar.backgroundColorByHexString('#5D98F6')
    // window.StatusBar.backgroundColorByName('black')
  }
})

vum.$vumPlatform.registerBackButtonAction(function (e) {
  let time
  let path = router.currentRoute.path

  if (path === '/tab/home' || path === '/tab/myInfo') {
    // 进入主界面清除缓存
    if (backButtonPressedOnceToExit === true) {
      vum.Platform.exitApp()
    } else {
      backButtonPressedOnceToExit = true
      hlsPopup.showLongBottom('再次点击返回键退出应用')
      clearTimeout(time)
      time = setTimeout(function () {
        backButtonPressedOnceToExit = false
      }, 1500)
    }
  } else if (path === '/Login') {
    vum.Platform.exitApp()
  } else {
    router.go(-1)
  }
  e.preventDefault()
  return false
}, 101)

/* eslint-disable no-new */
new Vue({
  data () {
    return {
      pathList: [],
      transitionName: null,
    }
  },
  router,
  watch: { // 监听路由变化
    $route (to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  },
  render: h => h(App),
}).$mount('#app-box')
