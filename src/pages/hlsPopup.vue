<template>
  <h-view class="public-style hls-popup" style="height: 100%">
    <h-header>
      <div slot="left" class="h-header-btn" @click="$routeGo()">
        <i class="ion-ios-arrow-back"/>
      </div>
      <div slot="center">封装测试</div>
      <div slot="right" class="h-header-btn">
        操作
      </div>
    </h-header>
    <!--    <s-tab @tabClick="stablick" cusClass="popup-tab">
          <tab-item>测试</tab-item>
          <tab-item>你好</tab-item>
          <tab-item>再见</tab-item>
          <tab-item>按钮</tab-item>
        </s-tab>-->
    <scroll
      ref="scroll"
      class="has-header has-footer">
      <h-button class="button-class" type="primary" @click.native="showLoading">showLoading</h-button>
      <h-button class="button-class" type="primary" @click.native="hideLoading">hideLoading</h-button>
      <h-button class="button-class" type="primary" @click.native="showLongTop">showLongTop</h-button>
      <h-button class="button-class" type="primary" @click.native="showLongCenter">showLongCenter</h-button>
      <h-button class="button-class" type="primary" @click.native="showLongBottom">showLongBottom</h-button>
      <h-button class="button-class" type="primary" @click.native="showSuccess">showSuccess</h-button>
      <h-button class="button-class" type="primary" @click.native="showError">showError</h-button>
      <h-button class="button-class" type="primary" @click.native="showConfirm">showConfirm</h-button>
      <h-button class="button-class" type="primary" @click.native="showPopup">showPopup</h-button>
      <h-button class="button-class" type="primary" @click.native="showActionSheet">showActionSheet</h-button>
      <h-button class="button-class" type="primary" @click.native="showActionSheetButton">showActionSheet 区分按钮颜色
      </h-button>
      <h-button class="button-class" type="primary" @click.native="showTime('YYYY')">showTime YYYY</h-button>
      <h-button class="button-class" type="primary" @click.native="showTime('YYYY-MM')">showTime YYYY-MM</h-button>
      <h-button class="button-class" type="primary" @click.native="showTime('YYYY-MM-DD')">showTime YYYY-MM-DD
      </h-button>
      <h-button class="button-class" type="primary" @click.native="showTime('YYYY-MM-DD HH')">showTime YYYY-MM-DD HH
      </h-button>
      <h-button class="button-class" type="primary" @click.native="showTime('YYYY-MM-DD HH:mm')">showTime YYYY-MM-DD
      HH:mm
      </h-button>
      <h-button class="button-class" type="primary" @click.native="showBigPicture">showBigPicture</h-button>
      <h-button class="button-class" type="primary" @click.native="selectListOne">selectList 普通下拉框</h-button>
      <h-button class="button-class" type="primary" @click.native="selectListTwo">selectList 二级联动</h-button>
      <h-button class="button-class" type="primary" @click.native="selectList">selectList 三级联动</h-button>

      <h2 class="item-title">按钮类型</h2>
      <h-button class="button-class" type="rimless">rimless 按钮</h-button>
      <h-button class="button-class" type="default">default 按钮</h-button>
      <h-button class="button-class" type="primary">primary 按钮</h-button>
      <h-button class="button-class" type="safety">safety 按钮</h-button>
      <h-button class="button-class" type="warning">warning 按钮</h-button>
      <h-button class="button-class" type="danger">danger 按钮</h-button>

      <h2 class="item-title">按钮尺寸</h2>
      <h-button class="button-class" size="mini">mini 按钮</h-button>
      <h-button class="button-class" size="small">small 按钮</h-button>
      <h-button class="button-class" size="normal">normal 按钮</h-button>
      <h-button class="button-class" size="large">large 按钮</h-button>
      <h-button class="button-class" size="huge">huge 按钮</h-button>

      <h2 class="item-title">自定义圆角 (直接通过class设置)</h2>
      <h-button class="button-class radius-small">rimless 按钮</h-button>
      <h-button class="button-class radius-normal">default 按钮</h-button>
      <h-button class="button-class radius-large">primary 按钮</h-button>

      <h2 class="item-title">默认点击效果</h2>
      <h-button class="button-class radius-small" type="rimless">基础按钮(无边框)</h-button>
      <h-button class="button-class radius-small" type="rimless" shadow>基础按钮(无边框、有阴影效果)</h-button>
      <h-button class="button-class radius-small purple">基础按钮(有背景色)</h-button>

      <h2 class="item-title">禁用效果</h2>
      <h-button class="button-class radius-small" disabled>基础按钮(禁用)</h-button>

      <h2 class="item-title">Swip基础使用</h2>
      <swipe :interval="5000" @start="start" @move="move" @change="change">
        <swipe-item>
          <div :style="{'background': bgColor[0]}" class="item-bg">0</div>
        </swipe-item>
        <swipe-item>
          <div :style="{'background': bgColor[1]}" class="item-bg">1</div>
        </swipe-item>
        <swipe-item>
          <div :style="{'background': bgColor[2]}" class="item-bg">2</div>
        </swipe-item>
      </swipe>

      <h2 class="item-title">纵向滚动</h2>
      <swipe :vertical="true" style="height: 400px">
        <swipe-item v-for="key in count" :key="key" :style="{'background': bgColor[key-1]}">
          <div class="item-bg">{{ key-1 }}</div>
        </swipe-item>
      </swipe>

      <h2 class="item-title">定制indicators</h2>
      <swipe :index.sync="index">
        <swipe-item v-for="key in count" :key="key" :style="{'background': bgColor[key-1]}">
          <div class="item-bg">{{ key-1 }}</div>
        </swipe-item>
        <div v-for="key in count" slot="indicators" :key="key" :class="['indicators', {'active': key-1 === index}]"/>
      </swipe>

      <h2 class="item-title">Spin-CSS</h2>
      <div class="spin-container">
        <spin size="40px" color="#ccc"/>
        <spin size="60px" color="#999"/>
        <spin size="80px" color="#666"/>
        <spin size="100px" color="#333"/>
      </div>

      <h2 class="item-title">SVG</h2>
      <div class="spin-container">
        <!-- 颜色要通过修改svg来实现，无法通过属性修改 -->
        <spin :svg-src="svgSrc" size="80px"/>
        <spin :svg-src="svgSrc" size="100px"/>
        <spin :svg-src="svgSrc" size="120px"/>
        <spin :svg-src="svgSrc" size="140px"/>
      </div>

      <h2 class="item-title">top-tip</h2>
      <div class="local-region">
        <top-tip v-model="show" entry-direction="down" content="顶部消息提示内容"/>
        参考文案
      </div>

      <h-button class="button-class" type="rimless" shadow @click.native="showTopTip">TopTip</h-button>

      <h2 class="item-title">notify</h2>
      <div class="local-region">
        <notify v-model="show1" content="提示内容" type="success"/>
        <notify v-model="show2" :time="3000" position="bottom" content="提示内容"/>
      </div>

      <h2 class="item-title">notify标签用法 (通常在局部显示时使用)</h2>
      <h-button class="button-class" type="rimless" shadow @click.native="showNotifyAtTop">Notify (top)</h-button>
      <h-button class="button-class" type="rimless" shadow @click.native="showNotifyAtBottom">Notify (bottom)</h-button>

      <h2 class="item-title">notify 插件用法</h2>
      <h-button class="button-class purple" type="rimless" shadow @click.native="handleNotify">NotifyPlugin</h-button>

      <h2 class="item-title">数字键盘</h2>
      <div class="list">
        <div class="item">
          <div class="contents">
            <div class="add-name readonly">
              <div>数字键盘</div>
            </div>
            <div class="add-content readonly" @click="keyboradShow">
              <input v-model="value" type="number" placeholder="输入" readonly>
            </div>
          </div>
        </div>
      </div>

      <list-item :item-height="90">
        <item>
          <div slot="name">数字键盘</div>
          <input
            slot="content" v-model="value" type="number" placeholder="输入"
            readonly @click="keyboradShow">
        </item>
      </list-item>

      <div class="list">
        <item-option
          v-for="(color,index) in colors" :key="index"
          class="mySlider">
          <div>{{ color.name }}</div>
          <div>{{ color.hex }}</div>
          <div slot="buttons">
            <option-button type="default" text="默认" @click.native="deleteFun"/>
            <option-button type="primary" text="编辑" @click.native="deleteFun"/>
            <option-button type="warn" text="删除" @click.native="deleteFun"/>
          </div>
        </item-option>
      </div>

      <h2>picker</h2>

      <picker
        ref="picker1" :data="year7" :columns="3" v-model="year7Value"
        style="width: 100%"
        @on-change="change"/>

      <list-item :item-height="90">
        <item>
          <img slot="left-icon" src="../assets/image/myInfo/version@2x.png" class="left-icon">
          <div slot="name" class="required">检查更新</div>
          <div slot="content">检查更新</div>
          <img slot="right-icon" src="../assets/image/arrow-down@2x.png" class="right-icon">
        </item>
        <item :show-arrow="true">
          <!--<img slot="left" src="../assets/myInfo/speak@2x.png" class="left-icon">-->
          <div slot="name" class="required">字数测试</div>
          <div slot="content">我是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字</div>
        </item>
        <item :showArrow="true">
          <!--<img slot="left" src="../assets/myInfo/robot@2x.png" class="left-icon">-->
          <div slot="name">客户名称</div>
          <input slot="content" v-model="bp_name" type="text" placeholder="请输入">
        </item>
        <item :show-arrow="true">
          <img slot="left-icon" src="../assets/image/myInfo/version@2x.png" class="left-icon">
          <div slot="name">检查更新</div>
          <!--<label slot="right" class="toggle toggle-positive toggle-check" @click="savePhotoFun">
            <input type="checkbox" :checked="savePhoto" >
            <div class="track">
              <div class="handle"></div>
            </div>
          </label>-->
          <check-box slot="content" v-model="savePhoto" @checkClick="savePhotoFun"/>
        </item>
      </list-item>

      <h2 class="item-title">s-tab</h2>
      <div class="local-region">
        <s-tab :show-divider="true" @tabClick="stabClick">
          <tab-item>测试</tab-item>
          <tab-item>你好</tab-item>
          <tab-item>再见</tab-item>
          <tab-item>按钮</tab-item>
        </s-tab>

        <s-tab :default-active="2" position="bottom" cusClass="class" @tabClick="stabClick">
          <tab-item><img src="../assets/image/myInfo/about@2x.png"></tab-item>
          <tab-item><img src="../assets/image/myInfo/version@2x.png"></tab-item>
          <tab-item><img src="../assets/image/myInfo/setting@2x.png"></tab-item>
          <tab-item><img src="../assets/image/myInfo/speak@2x.png"></tab-item>
        </s-tab>
      </div>
      <h2 class="item-title">Modal</h2>
      <h-button class="button-class" type="primary" @click.native="showModal">Modal</h-button>

    </scroll>

    <bottom-tab :show-divider="true">
      <tab-button cusClass="button-exit" @click.native="showConfirm"><img
        src="../assets/image/myInfo/loginout@2x.png">退出
      </tab-button>
      <tab-button :disable="true" @click.native="showSuccess">登陆</tab-button>
    </bottom-tab>
    <!--    <number-keyboard
              :show="true"
              title="数字键盘"
              extra-key="."
              @input="onInput"
              @delete="onDelete"/>-->

  </h-view>
</template>

<script>
import svg from '@/assets/image/loading/rolling.svg'
/* import popup from '@/pages/login'; */

export default {
  data () {
    return {
      index: 0,
      count: 3,
      value: '',
      show: false,
      items: [],
      infiniteCount: 0,
      deleteText: '删除',
      editText: '编辑',
      colors: [{name: 'Yellow', hex: '#f4d03f'}, {name: 'Green', hex: '#229954'}, {name: 'Purple', hex: '#9b59b6'}],
      svgSrc: svg,
      show1: false,
      show2: false,
      bp_name: '',
      savePhoto: new Boolean(window.localStorage.savePhoto) || false,
      year7Value: [],
      year7: [{
        name: '中国',
        value: 'china',
        parent: '0', // 为一级时可以不写 parent，但是此时允许为数字 0、空字符串或者字符串 '0'
      }, {
        name: '美国',
        value: 'USA',
        parent: '0',
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china',
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china',
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA',
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA',
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001',
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001',
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002',
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002',
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001',
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001',
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002',
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002',
      }],
      modal: '',
    }
  },
  watch: {
    bp_name (value) {
      console.log('bp_name:' + value)
    },
    savePhoto (value) {
      console.log('savePhoto:' + value)
    },
  },
  activated () {
    for (let i = 1; i <= 20; i++) {
      this.items.push(i + ' - keep walking, be 2 with you.')
    }
    this.top = 1
    // this.bottom = 20;
  },
  created: function () {
    this.bgColor = ['#5D98F6', '#1aad19', '#eebe41']
  },
  mounted () {
    /* HlsModal.fromComponent(popup, {
        cusClass:"login-modal",
        onHide: () => {
          console.log('modal hide')
        },
        onShow: () => {
          console.log('modal show')
        }
      }).then((modal) => {
        this.modal = modal;
      }) */
  },
  methods: {
    stab () {
      console.log('tab-click')
    },
    stabClick (index) {
      console.log('tabClickIndex:' + index)
    },
    // 标签用法
    showNotifyAtTop () {
      if (this.show1) return
      this.show1 = true
    },
    showNotifyAtBottom () {
      if (this.show2) return
      this.show2 = true
    },
    handleNotify () {
      hlsPopup.showNotify({
        content: '提示内容',
        position: 'top',
        time: 2000,
        type: 'warning',
      })
    },
    showTopTip () {
      if (this.show) return
      this.show = true
    },
    start (i) {
      console.log(`start: ${i}`)
    },
    move (i) {
      console.log(`move: ${i}`)
    },
    change (i) {
      // console.log(`change: ${i}`)
    },
    showLoading () {
      hlsPopup.showLoading('请稍等!')
    },
    hideLoading () {
      hlsPopup.hideLoading()
    },
    showLongTop () {
      hlsPopup.showLongTop('操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功操作成功')
    },
    showLongCenter () {
      hlsPopup.showLongCenter('操作成功操作成功操作成功')
    },
    showLongBottom () {
      hlsPopup.showLongBottom('操作成功操作成功操作成功操作成功')
    },
    showSuccess () {
      hlsPopup.showSuccess('操作成功')
    },
    showError () {
      hlsPopup.showError('操作失败')
    },
    showConfirm () {
      hlsPopup.showConfirm({
        title: '确定退出',
        content: '退出后需从新登录',
        onConfirm: function (index) {
          alert(index)
        },
      })
    },
    showPopup () {
      hlsPopup.showPopup({
        title: '确定退出',
        content: '退出后需从新登录',
        onConfirm: function () {
          alert('to do something')
        },
      })
    },
    showActionSheet () {
      hlsPopup.showActionSheet({
        titleText: '请选择照片',
        buttonArray: ['拍照', '从相册取'],
        callback: (index) => {
          alert(index)
        },
      })
    },
    showActionSheetButton () {
      hlsPopup.showActionSheet({
        titleText: '照片',
        buttonArray: [{text: '拍照', type: 'warn'}, {text: '从相册取', type: 'primary'}],
        callback: (index) => {
          alert(index)
        },
      })
    },
    showTime (format) {
      hlsPopup.showTime({
        nowDate: '2017-08-12',
        format: format,
        callback: (date) => {
          alert(date)
        },
      })
    },
    showBigPicture () {
      hlsPopup.showBigPicture({
        imgUrl: 'http://hlsapp.hand-china.com/hls_file/2018/05/F1B6D85E409A4714A8540504B2D133AD',
      })
    },

    selectListOne () {
      var bp_class_list = [
        {
          'code': 'NP',
          'code_name': '个人',
        }, {
          'code': 'NP1',
          'code_name': '个人1',
        }, {
          'code': 'NP2',
          'code_name': '个人2',
        },
      ]
      hlsPopup.selectList({
        list: bp_class_list,
        code: 'bp_type',
        object: {},
        returnItem: function (index, obj, child) {
          console.log('index:' + index + ',object:' + vum.toJson(obj) + ',:child' + vum.toJson(child))
        },
      })
    },
    selectListTwo () {
      var bp_class_list = [
        {
          'code': 'NP',
          'code_name': '个人',
        }, {
          'code': 'NP1',
          'code_name': '个人1',
        }, {
          'code': 'NP2',
          'code_name': '个人2',
        }, {
          'code': 'NP3',
          'code_name': '个人3',
          'parent': 'NP',
        }, {
          'code': 'NP4',
          'code_name': '个人4',
          'parent': 'NP1',
        }, {
          'code': 'NP5',
          'code_name': '个人5',
          'parent': 'NP2',
        },
      ]
      hlsPopup.selectList({
        list: bp_class_list,
        code: 'bp_type',
        object: {},
        returnItem: function (index, obj, child) {
          console.log('index:' + index + ',object:' + vum.toJson(obj) + ',:child' + vum.toJson(child))
        },
      })
    },
    selectList () {
      var bp_class_list = [
        {
          'code': 'NP',
          'code_name': '个人',
        }, {
          'code': 'NP1',
          'code_name': '个人1',
        }, {
          'code': 'NP2',
          'code_name': '个人2',
        }, {
          'code': 'NP3',
          'code_name': '个人3',
          'parent': 'NP',
        }, {
          'code': 'NP4',
          'code_name': '个人4',
          'parent': 'NP',
        }, {
          'code': 'NP5',
          'code_name': '个人5',
          'parent': 'NP2',
        }, {
          'code': 'NP6',
          'code_name': '个人6',
          'parent': 'NP3',
        }, {
          'code': 'NP7',
          'code_name': '个人7',
          'parent': 'NP4',
        },
        {
          'code': 'NP8',
          'code_name': '个人8',
          'parent': 'NP1',
        },
      ]
      hlsPopup.selectList({
        list: bp_class_list,
        code: 'bp_type',
        object: {},
        returnItem: function (index, obj, child) {
          console.log('index:' + index + ',object:' + vum.toJson(obj) + ',:child' + vum.toJson(child))
        },
      })
    },

    onRefresh (done) {
      setTimeout(() => {
        let start = this.top - 1
        for (let i = start; i > start - 10; i--) {
          this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
        }
        this.top = this.top - 10

        done()
      }, 1500)
    },

    onInfinite (done) {
      setTimeout(() => {
        if (this.infiniteCount < 2) {
          let start = this.bottom + 1
          for (let i = start; i < start + 10; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          this.bottom = this.bottom + 10

          this.infiniteCount++
        }

        done()
      }, 1500)
    },

    onItemClick (index) {
      console.log(index)
    },

    onInput (value) {
      this.value += ('' + value)
      console.log(value)
    },
    onDelete () {
      this.value = ''
      console.log('delete')
    },
    keyboradShow () {
      let vm = this
      hlsPopup.showNumberKeyborad({
        title: '数字键盘',
        keyDown: (text) => {
          vm.onInput(text)
        },
        keyDelete: () => {
          vm.onDelete()
        },
      })
    },
    // e为该元素在数组的下标
    deleteFun (e) {
      console.log(e)
    },
    // e为该元素在数组的下标
    editFun (e) {
      console.log(e)
    },
    savePhotoFun (value) {
      this.savePhoto = value

      window.localStorage.setItem('savePhoto', value)
    },

    showModal () {
      /* this.modal.show(); */
    },
  },
}
</script>

<style lang="less" rel="stylesheet">
  /*  .public-style{
      .content{
        position: fixed;
      }
    }*/
  .hls-popup {
    height: 100%;
    width: 100%;
    .vue-better-scroll__wrapper {
      width: 100%;
    }
    .list {
      width: 100%;
    }
    .content {
      //height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .scrollContent {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-direction: column;
      }
      .button-class {
        width: 90%;
        margin: 10px 5%;
        display: block;

        &.image {
          width: auto;
          margin-right: 0;
          display: inline-block;
        }

        &.radius-small {
          border-radius: 6px;
        }

        &.radius-normal {
          border-radius: 16px;
        }

        &.radius-large {
          border-radius: 40px;
        }

        .spin {
          vertical-align: middle;
        }

        .text {
          font-size: 28px;
          margin-left: 16px;
          vertical-align: middle;
        }
      }

      .purple {
        color: #fff;
        background-color: #7e57c2;
        border: 1px solid #7e57c2;
      }
      .button {
        background-color: @theme-color;
        color: #ffffff;
        height: 100px;
        width: 600px;
        border: 20px;
        margin-top: 20px;
      }
    }
    .item-bg {
      height: 400px;
      line-height: 400px;
      text-align: center;
      font-size: 40px;
      font-weight: 500;
    }
    .indicators {
      height: 28px;
      width: 28px;
      background-image: url('../assets/image/logo.png');
      background-position: center;
      background-size: cover;
      opacity: 0.5;

      &.active {
        opacity: 1;
      }
    }

    .local-region {
      overflow: hidden;
      position: relative;
      height: 400px;
      background-color: #eee;
      width: 90%;
    }
  }

  .login-modal {
    height: 50%;
    top: 50%
  }
</style>
