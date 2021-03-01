import Vue from 'vue'
import {ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, DatetimePlugin} from 'vux'
import {ActionSheetPlugin, ShowPicturePlugin, SelectPlugin, NotifyPlugin, NumberKeyboardPlugin} from 'hls-easy-ui'
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)
Vue.use(ActionSheetPlugin)
Vue.use(ShowPicturePlugin)
Vue.use(SelectPlugin)
Vue.use(NumberKeyboardPlugin)
Vue.use(NotifyPlugin)

export default {

  isLoading: false,
  SHOW_TIMES: 2000,
  IS_SHOW_MASK: true,
  /**
   * 锁屏函数 超过10s后自动解屏用于防止屏幕锁死
   * 自动截屏成弹出错误提示框
   * @param content 锁屏内容
   */
  showLoading: function (content) {
    let vm = this
    Vue.$vux.loading.show({
      text: content || 'Loading',
    })
    this.isLoading = true
    // 10s后自动解屏用于防止屏幕锁死
    setTimeout(() => {
      if (vm.isLoading) {
        Vue.$vux.loading.hide()
        vm.isLoading = false
        // 弹出操作失败
        /* Vue.$vux.toast.show({
          text: '操作失败',
          type: 'warn',
          time: vm.SHOW_TIMES,
          isShowMask: vm.IS_SHOW_MASK,
          position: 'middle',
        }) */
      }
    }, 40000)
  },
  /**
   * 隐藏
   */
  hideLoading: function () {
    Vue.$vux.loading.hide()
    this.isLoading = false
  },

  /**
   * 长时间顶部提示toast
   * @param content
   */
  showLongTop: function (content) {
    let vm = this
    let text = content || '操作失败'
    Vue.$vux.toast.show({
      text: text,
      type: 'text',
      time: vm.SHOW_TIMES,
      isShowMask: vm.IS_SHOW_MASK,
      position: 'top',
    })
  },

  /**
   * 长时间中部提示toast
   * @param content
   */
  showLongCenter: function (content) {
    let vm = this
    let text = content || '操作失败'
    Vue.$vux.toast.show({
      text: text,
      type: 'text',
      time: vm.SHOW_TIMES,
      isShowMask: vm.IS_SHOW_MASK,
      position: 'middle',
    })
  },
  /**
   * 长时间中部提示toast
   * @param content
   */
  showLongBottom: function (content) {
    let vm = this
    let text = content || '操作失败'
    Vue.$vux.toast.show({
      text: text,
      time: vm.SHOW_TIMES,
      type: 'text',
      isShowMask: vm.IS_SHOW_MASK,
      position: 'bottom',
    })
  },
  /**
   * 成功提示框
   * @param content
   */
  showSuccess: function (content) {
    let vm = this
    Vue.$vux.toast.show({
      text: content || '操作成功',
      time: vm.SHOW_TIMES,
      isShowMask: vm.IS_SHOW_MASK,
      type: 'success',
      position: 'middle',
    })
  },
  /**
   * 成功提示框
   * @param content
   */
  showError: function (content) {
    let vm = this
    Vue.$vux.toast.show({
      text: content || '操作失败',
      type: 'warn',
      isShowMask: vm.IS_SHOW_MASK,
      time: vm.SHOW_TIMES,
      position: 'middle',
    })
  },
  /**
   * 弹出是否确认的窗口
   * @param confirmObject.title 标题
   * @param confirmObject.content 内容
   * @param confirmObject.onConfirm 确定函数
   */
  showConfirm: function (confirmObject) {
    let def = {
      title: confirmObject.title || '提示',
      content: confirmObject.content || '',
      confirmText: '确定',
      cancelText: '取消',
      onConfirm: () => {
        confirmObject.onConfirm(1)
      },
      onCancel: () => {
        confirmObject.onConfirm(0)
      },
    }
    Vue.$vux.confirm.show(def)
  },
  /*
   * 弹出确认的窗口
   * @param confirmObject.title 标题
   * @param confirmObject.content 内容
   * @param confirmObject.onConfirm 确定函数
   *
   */
  showPopup: function (confirmObject) {
    let def = {
      title: confirmObject.title || '提示',
      content: confirmObject.content || '',
      confirmText: '确定',
      showCancelButton: false,
      onConfirm: () => {
        confirmObject.onConfirm()
      },
    }
    Vue.$vux.confirm.show(def)
  },
  /**
   * @param actionObject.titleText 弹出框的标题可空
   * @param actionObject.callback 点击按钮的回调函数 回传buttonArray数组下标
   * @param actionObject.buttonArray 按钮数组支持[string,string],[object,object],
   *        当为后一种是 object为{text:'拍照',type:'primary'},type支持 primary,warn,disabled
   *
   *  {
   *      titleText: '照片',
   *      buttonArray: [{text:'拍照',type:'warn'}, {text:'从相册取',type:'primary'}],
   *      callback: (index) => {
   *        alert(index);
   *      }
   *   }
   *
   *    {
   *      buttonArray: ['拍照','从相册取'],
   *      callback: (index) => {
   *        alert(index);
   *      }
   *   }
   *
   */
  showActionSheet: function (actionObject) {
    if (typeof actionObject === 'object') {
      let buttons = []
      for (let i = 0; i < actionObject.buttonArray.length; i++) {
        if (typeof actionObject.buttonArray[i] === 'object') {
          buttons.push({
            text: actionObject.buttonArray[i].text,
            type: actionObject.buttonArray[i].type,
            callback: actionObject.callback,
          })
        } else {
          buttons.push({
            text: actionObject.buttonArray[i],
            callback: actionObject.callback,
          })
        }
      }
      ActionSheetPlugin.show({
        title: actionObject.titleText || '',
        buttons: buttons,
      })
    }
  },

  /**
   * 时间选择函数
   * @param timeObject.nowDate 当前展示的时间 可不填
   * @param timeObject.format 时间格式支持不支持秒
   * @param timeObject.callback 点击确定的回调函数
   *
   */
  showTime: function (timeObject) {
    let date = new Date().format('yyyy-MM-dd')
    let format = 'YYYY-MM-DD'
    if (timeObject.nowDate) {
      date = timeObject.nowDate
    }
    if (timeObject.format) {
      format = timeObject.format
    }
    Vue.$vux.datetime.show({
      cancelText: '取消',
      confirmText: '确定',
      minYear: '1900',
      maxYear: '2200',
      format: format,
      value: date,
      onConfirm (val) {
        timeObject.callback(val)
      },
    })
  },
  /**
   * 图片放大预览
   * @param imgObject.imgUrl
   */
  showBigPicture: function (imgObject) {
    if (typeof imgObject === 'object') {
      ShowPicturePlugin.show({
        imgUrl: imgObject.imgUrl,
        width: imgObject.width,
      })
    }
  },

  /**
   * 下拉框 支持级联操作 需指定 parent 属性
   * @param selectOption.list Array [{"code": "NP","code_name": "个人"}]
   * @param selectOption.code String "bp_type"
   * @param selectOption.object Object 当前数据对象
   * @param selectOption.returnItem function 回调函数返回index与object
   * var bp_class_list = [
   *    {
   *      "code": "NP",
   *      "code_name": "个人"
   *    },{
   *       "code": "NP1",
   *       "code_name": "个人1"
   *     }];
   *  hlsPopup.selectList({
   *     list: bp_class_list,
   *     code: 'bp_type',
   *     object: {},
   *     returnItem: function (index, obj) {
   *        console.log(obj)
   *      }
   *   })
   *
   */
  selectList: function (selectOption) {
    if (typeof selectOption === 'object') {
      let list = []
      let length = selectOption.list.length
      vum.forEach(selectOption.list, function (date, index, array) {
        list.push({
          value: date.code,
          name: date.code_name,
          parent: date.parent,
        })
        if (index === (length - 1)) {
          SelectPlugin.show({
            list: list,
            callBack: selectOption.returnItem,
            code: selectOption.code,
            object: selectOption.object,
          })
        }
      })
    }
  },
  /**
   * 弹出数字键盘
   * @param keyboardObject.title 键盘的title
   * @param keyboardObject.closeButtonText 键盘的关闭按钮文字
   * @param keyboardObject.keyDown 普通按键按下去事件
   * @param keyboardObject.keyDelete 删除按键按下去事件
   */
  showNumberKeyborad: function (keyboardObject) {
    if (typeof keyboardObject === 'object') {
      NumberKeyboardPlugin.show({
        title: keyboardObject.title,
        closeButtonText: keyboardObject.closeButtonText,
        extraKey: keyboardObject.extraKey || '.',
        keyDown: function (text) {
          keyboardObject.keyDown(text)
        },
        keyDelete: function () {
          keyboardObject.keyDelete()
          // console.log('delete')
        },
      })
    }
  },
  /**
   * 弹出Notify
   * @param notifyObject.content 内容
   * @param notifyObject.position 位置
   * @param notifyObject.time 显示时长
   * @param notifyObject.type 类型  success warning default
   */
  showNotify: function (notifyObject) {
    if (typeof notifyObject === 'object') {
      NotifyPlugin.show({
        show: true,
        content: notifyObject.content,
        position: notifyObject.position || 'top',
        time: notifyObject.time || 3000,
        type: notifyObject.type || 'default',
      })
    }
  },
}
