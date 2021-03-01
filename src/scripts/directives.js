import Autosize from 'autosize'

function vueTouch (el, binding, type) {
  var _this = this
  this.obj = el
  this.binding = binding
  this.touchType = type
  this.vueTouches = {x: 0, y: 0}
  this.vueMoves = true
  this.vueLeave = true
  this.longTouch = true
  this.vueCallBack = typeof (binding.value) === 'object' ? binding.value.fn : binding.value
  this.obj.addEventListener('touchstart', function (e) {
    _this.start(e)
  }, false)
  this.obj.addEventListener('touchend', function (e) {
    _this.end(e)
  }, false)
  this.obj.addEventListener('touchmove', function (e) {
    _this.move(e)
  }, false)
};

vueTouch.prototype = {
  start: function (e) {
    this.vueMoves = true
    this.vueLeave = true
    this.longTouch = true
    this.vueTouches = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY}
    this.time = setTimeout(function () {
      if (this.vueLeave && this.vueMoves) {
        this.touchType === 'longtap' && this.vueCallBack(this.binding.value, e)
        this.longTouch = false
      }
    }.bind(this), 1000)
  },
  end: function (e) {
    var disX = e.changedTouches[0].pageX - this.vueTouches.x
    var disY = e.changedTouches[0].pageY - this.vueTouches.y
    clearTimeout(this.time)
    if (Math.abs(disX) > 100 || Math.abs(disY) > 100) {
      this.touchType === 'swipe' && this.vueCallBack(this.binding.value, e)
      if (Math.abs(disX) > Math.abs(disY)) {
        if (disX > 100) {
          this.touchType === 'swiperight' && this.vueCallBack(this.binding.value, e)
        }

        if (disX < -100) {
          this.touchType === 'swipeleft' && this.vueCallBack(this.binding.value, e)
        }
      } else {
        if (disY > 100) {
          this.touchType === 'swipedown' && this.vueCallBack(this.binding.value, e)
        }

        if (disY < -100) {
          this.touchType === 'swipeup' && this.vueCallBack(this.binding.value, e)
        }
      }
    } else {
      if (this.longTouch && this.vueMoves) {
        this.touchType === 'tap' && this.vueCallBack(this.binding.value, e)
        this.vueLeave = false
      }
    }
  },
  move: function (e) {
    this.vueMoves = false
  },
} // prop.autosize
export default (Vue) => {
  Vue.directive('focus', {
    // 自动获取鼠标焦点
    inserted: function (el) {
      el.focus()
    },
  })
  Vue.directive('tap', {// 点击事件
    bind: function (el, binding) {
      new vueTouch(el, binding, 'tap') // eslint-disable-line
    },
  })
  Vue.directive('swipe', {// 滑动事件
    bind: function (el, binding) {
      new vueTouch(el, binding, 'swipe') // eslint-disable-line
    },
  })
  Vue.directive('swipeleft', {// 左滑事件
    bind: function (el, binding) {
      new vueTouch(el, binding, 'swipeleft') // eslint-disable-line
    },
  })
  Vue.directive('swiperight', {// 右滑事件
    bind: function (el, binding) {
      new vueTouch(el, binding, 'swiperight') // eslint-disable-line
    },
  })
  Vue.directive('swipedown', {// 下滑事件
    bind: function (el, binding) {
      new vueTouch(el, binding, 'swipedown') // eslint-disable-line
    },
  })
  Vue.directive('swipeup', {// 上滑事件
    bind: function (el, binding) {
      new vueTouch(el, binding, 'swipeup') // eslint-disable-line
    },
  })
  Vue.directive('longtap', {// 长按事件
    bind: function (el, binding) {
      new vueTouch(el, binding, 'longtap') // eslint-disable-line
    },
  })

  Vue.directive('hlsImgZoom', {
    componentUpdated: function (element) {
      var elWidth, elHeight

      // mode : 'pinch' or 'swipe'
      var mode = ''

      // distance between two touche points (mode : 'pinch')
      var distance = 0
      var initialDistance = 0

      // image scaling
      var scale = 1
      var relativeScale = 1
      var initialScale = 1
      var maxScale = 5
      if (isNaN(maxScale) || maxScale <= 1) {
        maxScale = 3
      }

      // position of the upper left corner of the element
      var positionX = 0
      var positionY = 0

      var initialPositionX = 0
      var initialPositionY = 0

      // central origin (mode : 'pinch')
      var originX = 0
      var originY = 0

      // start coordinate and amount of movement (mode : 'swipe')
      var startX = 0
      var startY = 0
      var moveX = 0
      var moveY = 0

      var image = new Image()
      image.onload = function () {
        elWidth = element.clientWidth
        elHeight = element.clientHeight
        element.style.webkitTransformOrigin = '0px 0px 0px'
        element.style.transformOrigin = '0px 0px 0px'

        element.addEventListener('touchstart', touchstartHandler)
        element.addEventListener('touchmove', touchmoveHandler)
        element.addEventListener('touchend', touchendHandler)
      }
      image.src = element.src

      /**
       * @param {object} evt
       */
      function touchstartHandler (evt) {
        var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches

        startX = touches[0].clientX
        startY = touches[0].clientY
        initialPositionX = positionX
        initialPositionY = positionY
        moveX = 0
        moveY = 0
      }

      /**
       * @param {object} evt
       */
      function touchmoveHandler (evt) {
        var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches

        if (mode === '') {
          if (touches.length === 1 && scale > 1) {
            mode = 'swipe'
          } else if (touches.length === 2) {
            mode = 'pinch'

            initialScale = scale
            initialDistance = getDistance(touches)
            originX = touches[0].clientX -
              parseInt((touches[0].clientX - touches[1].clientX) / 2, 10) -
              element.offsetLeft - initialPositionX
            originY = touches[0].clientY -
              parseInt((touches[0].clientY - touches[1].clientY) / 2, 10) -
              element.offsetTop - initialPositionY
          }
        }

        if (mode === 'swipe') {
          evt.preventDefault()

          moveX = touches[0].clientX - startX
          moveY = touches[0].clientY - startY

          positionX = initialPositionX + moveX
          positionY = initialPositionY + moveY

          transformElement()
        } else if (mode === 'pinch') {
          evt.preventDefault()

          distance = getDistance(touches)
          relativeScale = distance / initialDistance
          scale = relativeScale * initialScale

          positionX = originX * (1 - relativeScale) + initialPositionX + moveX
          positionY = originY * (1 - relativeScale) + initialPositionY + moveY

          transformElement()
        }
      }

      /**
       * @param {object} evt
       */
      function touchendHandler (evt) {
        var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches

        if (mode === '' || touches.length > 0) {
          return
        }

        if (scale < 1) {
          scale = 1
          positionX = 0
          positionY = 0
        } else if (scale > maxScale) {
          scale = maxScale
          relativeScale = scale / initialScale
          positionX = originX * (1 - relativeScale) + initialPositionX + moveX
          positionY = originY * (1 - relativeScale) + initialPositionY + moveY
        } else {
          if (positionX > 0) {
            positionX = 0
          } else if (positionX < elWidth * (1 - scale)) {
            positionX = elWidth * (1 - scale)
          }
          if (positionY > 0) {
            positionY = 0
          } else if (positionY < elHeight * (1 - scale)) {
            positionY = elHeight * (1 - scale)
          }
        }

        transformElement(0.1)
        mode = ''
      }

      /**
       * @param {Array} touches
       * @return {number}
       */
      function getDistance (touches) {
        var d = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) +
          Math.pow(touches[0].clientY - touches[1].clientY, 2))
        return parseInt(d, 10)
      }

      /**
       * @param {number} [duration]
       */
      function transformElement (duration) {
        var transition = duration ? 'all cubic-bezier(0,0,.5,1) ' + duration + 's' : ''
        var matrixArray = [scale, 0, 0, scale, positionX, positionY]
        var matrix = 'matrix(' + matrixArray.join(',') + ')'

        element.style.webkitTransition = transition
        element.style.transition = transition
        element.style.webkitTransform = matrix + ' translate3d(0,0,0)'
        element.style.transform = matrix + ' translate3d(0,0,0)'
      }
    },

  })

  Vue.directive('keyboardAttach', {// 监听键盘
    inserted: function (el, binding) {
      let KEYBOARD_OPEN_CSS = 'foot-keyboard-open'

      function keyboardHeight () {
        let innerHeight = window.innerHeight
        let innerWidth = window.innerWidth
        if (vum.Platform.isIOS()) {
          if (!vum.Platform.isWebView()) {
            return 266
          }
          if (innerWidth >= 375 && innerHeight >= 812) {
            return 330
          }
          return 300
        } else {
          return 275
        }
      }

      let height = keyboardHeight()

      function hasClass (element, csName) {
        return element.className.match(RegExp('(\\s|^)' + csName + '(\\s|$)'))
      }

      function addClass (element, csName) {
        if (!hasClass(element, csName)) {
          element.className += ' ' + csName
        }
        element.style.marginBottom = height + 'px'
      }

      function removeClass (element, csName) {
        if (hasClass(element, csName)) {
          element.classList.remove(csName)
        }
        element.style.marginBottom = 0 + 'px'
      }

      window.addEventListener('native.keyboardshow', function (e) {
        addClass(el, KEYBOARD_OPEN_CSS)
      })

      window.addEventListener('native.keyboardhide', function (e) {
        removeClass(el, KEYBOARD_OPEN_CSS)
      })
    },
    unbind: function (el, binding) {
      let KEYBOARD_OPEN_CSS = 'foot-keyboard-open'

      function hasClass (element, csName) {
        return element.className.match(RegExp('(\\s|^)' + csName + '(\\s|$)'))
      }

      function removeClass (element, csName) {
        if (hasClass(element, csName)) {
          element.classList.remove(csName)
        }
        element.style.marginBottom = 0 + 'px'
      }

      removeClass(el, KEYBOARD_OPEN_CSS)
      window.removeEventListener('native.keyboardshow', function (e) {

      })
      window.removeEventListener('native.keyboardhide', function (e) {

      })
    },
  })

  Vue.directive('autoSize', {
    bind: function (el, binding) {
      if (el.nodeName === 'TEXTAREA') {
        Autosize(el)
      }
      el.addEventListener('oninput', function (e) {
        Autosize.update(el)
      })
    },
    unbind: function (el, binding) {
      Autosize.update(el)
      Autosize.destroy(el)
      el.removeEventListener('oninput', function (e) {
      })
    },
  })
}
