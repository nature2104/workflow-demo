<template>
  <h-view class="public-style setting">
    <h-header>
      <div slot="left" class="h-header-btn" @click="$routeGo()">
        <i class="ion-ios-arrow-back"/>
      </div>
      <div slot="center">设置</div>
    </h-header>
    <h-content>
      <list-item cus-class="cus-list">
        <item :show-arrow="true" @click.native="push">
          <div slot="name">消息推送</div>
          <div slot="content">去设置</div>
        </item>
        <item cus-class="cus-item">
          <div slot="name" style="color: #1B8BEB">安全控制</div>
        </item>
        <item>
          <div slot="name">拍照保存</div>
          <h-switch slot="content" v-model="savePhoto" @checkClick="savePhotoFun"/>
        </item>
        <item>
          <div slot="name">自动更新</div>
          <h-switch slot="content" v-model="updateVersion" @checkClick="updateVersionFun"/>
        </item>
        <item>
          <div slot="name">指纹解锁</div>
          <h-switch slot="content" v-model="isOpenFingerLogin" @checkClick="fingerLogInFun"/>
        </item>
      </list-item>
    </h-content>
    <div class="bottom-tab button" @click="logOut">
      <div class="bottom-tab-button"><img src="@/assets/image/myInfo/loginout@2x.png">退出登录</div>
    </div>
  </h-view>
</template>

<script>
export default {
  data () {
    return {
      currentVersion: process.env.currentVersion,
      savePhoto: this.localBool(window.localStorage.savePhoto) || false,
      updateVersion: this.localBool(window.localStorage.updateVersion) || false,
      isOpenFingerLogin: this.localBool(window.localStorage.isOpenFingerLogin) || false,
    }
  },
  computed: {},
  created: function () {

  },
  methods: {
    localBool (value) {
      if (value) {
        return true
      } else {
        return false
      }
    },

    push () {
      this.hlsPopup.showLongBottom('请去设置->应用开启对应的权限')
    },
    savePhotoFun (value) {
      this.savePhoto = value
      if (this.savePhoto) {
        window.localStorage.setItem('savePhoto', this.savePhoto)
      } else {
        window.localStorage.removeItem('savePhoto')
      }
      console.log(value)
    },

    updateVersionFun (value) {
      this.updateVersion = value
      if (this.updateVersion) {
        window.localStorage.setItem('updateVersion', this.updateVersion)
      } else {
        window.localStorage.removeItem('updateVersion')
      }
    },

    fingerLogInFun (value) {
      let vm = this
      this.hlsUtil.openFingerLogin().then(function () {
        vm.isOpenFingerLogin = value
        if (vm.isOpenFingerLogin) {
          window.localStorage.setItem('isOpenFingerLogin', vm.isOpenFingerLogin)
        } else {
          window.localStorage.removeItem('isOpenFingerLogin')
        }
      })
    },

    logOut () {
      let vm = this
      vm.hlsPopup.showConfirm({
        title: '确定退出',
        onConfirm: function (index) {
          if (index === 1) {
            window.localStorage.clear()
            vm.$router.push('/login')
          } else {

          }
        },
      })
    },
  },
}

</script>

<style lang="less">
  .setting {
    .cus-list {
      .h-item .contents {
        .add-content {
          color: #AAA;
        }
      }
      .cus-item {
        background-color: #fafafa;
      }
    }
    .bottom-tab {
      color: #F86E67;
      &.activated {
        opacity: 0.9;
        -webkit-transform: scale(0.95);
        transform: scale(0.95)
      }
      .bottom-tab-button {
        img {
          margin-right: 10px;
          width: 16px;
        }
        color: #F86E67;

      }
    }
  }

</style>
