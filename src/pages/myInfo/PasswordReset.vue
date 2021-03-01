<template>
  <h-view class="public-style password-reset">
    <h-header>
      <div slot="left" class="h-header-btn" @click="$routeGo()">
        <i class="ion-ios-arrow-back"/>
      </div>
      <div slot="center">修改密码</div>
    </h-header>
    <h-content class="content-style">
      <list-item>
        <item >
          <img slot="left-icon" src="@/assets/image/myInfo/oldPass@2x.png" class="left-icon">
          <div slot="name">旧密码</div>
          <input slot="content" v-model="info.old" type="password" placeholder="请输入当前密码">
        </item>
        <item>
          <img slot="left-icon" src="@/assets/image/myInfo/newPass@2x.png" class="left-icon">
          <div slot="name">新密码</div>
          <input slot="content" v-model="info.new" type="password" placeholder="请输入新密码">
        </item>
        <item>
          <img slot="left-icon" src="@/assets/image/myInfo/newPass@2x.png" class="left-icon">
          <div slot="name">新密码</div>
          <input slot="content" v-model="info.newConf" type="password" placeholder="请确认新密码" @blur="checkPassword()">
        </item>
        <div>
          <div class="submit">
            <div v-show="!checkFlag" class="submit-button button">提交</div>
            <div v-show="checkFlag" class="submit-button button selected " @click="updatePw()">提交</div>
          </div>
        </div>
      </list-item>
    </h-content>
  </h-view>
</template>

<script>
export default {
  data () {
    return {
      checkFlag: false,
      info: {
        old: '',
        new: '',
        newConf: '',
        user_name: window.localStorage.username,
      },

    }
  },
  created: function () {

  },
  methods: {

    updatePw () {
      let vm = this
      if (vm.info.old.length === 0) {
        vm.hlsPopup.showLongCenter('请输入当前密码')
        return null
      }
      if (vm.info.new.length === 0) {
        vm.hlsPopup.showLongCenter('请输入新密码')
        return null
      }
      if (vm.info.newConf.length === 0) {
        vm.hlsPopup.showLongCenter('请再次输入新密码')
        return null
      }
      if (vm.info.new !== vm.info.newConf) {
        vm.hlsPopup.showLongCenter('请输入相同密码')
        return null
      }
      let url = process.env.basePath + 'password_update'
      let param = {
        'user_name': window.localStorage.username,
        'old_password': vm.info.old,
        'new_password': vm.info.new,
      }
      vm.hlsPopup.showLoading('请稍等!')
      vm.hlsHttp.post(url, param).then(function (res) {
        vm.hlsPopup.hideLoading()
        if (res.result === 'S') {
          vm.hlsPopup.showLongCenter('修改成功，请重新登录')
          // window.localStorage.clear();
          vm.$router.push('/Login')
        } else if (res.result === 'E') {
          vm.hlsPopup.showLongCenter('原密码错误')
        }
      })
    },
    checkPassword () {
      let vm = this
      vm.checkFlag = false
      if (vm.info.old.length === 0) {
        vm.hlsPopup.showLongCenter('请输入当前密码')
        return null
      }
      if (vm.info.new.length === 0) {
        vm.hlsPopup.showLongCenter('请输入新密码')
        return null
      }
      if (vm.info.newConf.length === 0) {
        vm.hlsPopup.showLongCenter('请再次输入新密码')
        return null
      }
      if (vm.info.new.length < 6 || vm.info.newConf.length < 6) {
        vm.hlsPopup.showLongCenter('新密码长度应大于6位')
        return null
      }
      if (vm.info.new !== vm.info.newConf) {
        vm.hlsPopup.showLongCenter('请输入相同密码')
        return null
      }

      vm.checkFlag = true
    },

  },
}
</script>

<style scoped lang="less" rel="stylesheet">
  .password-reset {
    width: 100%;
    height: 100%;
    .content-style {
      background-color: #fff;
      padding-top: 10px;
      position: fixed;

      .submit {
        height: 45px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 100px;
        .submit-button {
          background: #DADADF;
          border-radius: 3px;
          width: 70%;
          //text-align: center;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: #fff;
          &.activated {
            opacity: 0.9;
            -webkit-transform: scale(0.95);
            transform: scale(0.95)
          }
        }
        .selected {
          background: #2B99FF;
        }
      }
    }
  }

</style>
