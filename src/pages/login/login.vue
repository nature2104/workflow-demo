<template>
  <div id="login" class="content" title="登录">
    <div>
      <div class="bird-icon">
        <h3>工作流</h3>
      </div>
      <div class="pwd">
        <div class="pwd-icon">
          <img src="@/assets/login/user.png">
        </div>
        <div class="pwd-input">
          <input v-model="username" type="text" placeholder="请输入用户名/手机号">
        </div>
        <div v-if="username" class="delete" @click="clearAccount">
          <img src="@/assets/login/delete.png">
        </div>
      </div>
      <div class="pwd">
        <div class="pwd-icon">
          <img src="@/assets/login/password.png">
        </div>
        <div class="pwd-input">
          <input v-model="password" type="password" placeholder="请输入密码">
        </div>
        <div v-if="password" class="delete" @click="clearPassword">
          <img src="@/assets/login/delete.png">
        </div>
      </div>
      <div class="other-function">
        <div class="register" @click="registerNew">用户注册</div>
        <div class="pwd-forgotten" @click="pwdForgotten">忘记密码</div>
      </div>
      <div class="button submit" @click="access">登录</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    hlsSupportToken () {
      let vm = this
      vm.hlsPopup.showLoading()
      let url = process.env.loginPath + 'appadmin'
      let param = {}
      return vm.hlsHttp.post(url, param).then(function (res) {
        window.localStorage.setItem('access_token', res.access_token)
      })
    },
    access () {
      let vm = this
      if (!vm.username || vm.username === undefined) {
        vm.hlsPopup.showLongCenter('请输入用户名')
      } else if (!vm.password || vm.password === undefined) {
        vm.hlsPopup.showLongCenter('请输入密码')
      } else {
        vm.hlsSupportToken().then(res => {
          let param = {
            user_name: vm.username,
            user_password: vm.password,
          }
          let url = process.env.basePath + 'login'
          vm.hlsHttp.post(url, param).then(function (res) {
            vm.hlsPopup.hideLoading()
            if (res.result === 'S') {
              window.localStorage.setItem('username', vm.username.toUpperCase())
              window.localStorage.setItem('password', vm.password)
              window.localStorage.setItem('user_id', res.user_id)
              if (res.bp_id && res.bp_id !== 'undefined') {
                window.localStorage.setItem('bp_id', res.bp_id)
              }
              vm.$router.push('Tab')
            } else if (res.result === 'E') {
              vm.hlsPopup.showLongCenter(res.message)
            }
          })
        })
      }
    },
    registerNew: function () {
      // this.$router.push('regiester');
    },
    pwdForgotten: function () {
      // this.$router.push('pwd-forgot');
    },
    clearAccount: function () {
      this.username = ''
      this.password = ''
    },
    clearPassword: function () {
      this.password = ''
    },
  },
}
</script>
<style lang="less" scoped type="text/less">
#login {
  background: url("../../assets/login/bg@2x.png") no-repeat center;
  background-size: cover;
  background-position-x: 0px;
  color: #ffffff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .bird-icon {
    padding-top: 25%;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    img {
      width: 138px;
      height: 48px;
    }
  }
  .login {
    border-bottom: 1px solid #5d98f6;
    display: flex;
    display: -webkit-flex;
    margin: 15% auto 0;
    width: 250px;
    justify-content: center;
    .person-icon {
      margin-bottom: 18px;
      margin-right: 30px;
      margin-left: 6px;
      img {
        width: 36px;
        height: 40px;
      }
    }
    .admin-input {
      height: 50px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      input {
        width: 100%;
        height: 100%;
        font-size: 32px;
        color: #9e9e9e;
        margin-bottom: 10px;
        line-height: 44px;
      }
      input::-webkit-input-placeholder {
        font-size: 32px;
        color: #cdd1d3;
      }
    }
    .delete {
      img {
        margin-top: 10px;
        width: 24px;
        height: 24px;
      }
    }
  }
  .pwd {
    border-bottom: 1px solid #5d98f6;
    display: flex;
    display: -webkit-flex;
    margin: 15% auto 0;
    width: 250px;
    .pwd-icon {
      margin-bottom: 9px;
      margin-right: 15px;
      margin-left: 6px;
      img {
        width: 18px;
        height: 20px;
      }
    }
    .pwd-input {
      height: 26px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      input {
        width: 100%;
        height: 100%;
        font-size: 16px;
        color: #9e9e9e;
        line-height: 22px;
      }
      input::-webkit-input-placeholder {
        font-size: 16px;
        color: #cdd1d3;
      }
    }
    .delete {
      img {
        margin-top: 10px;
        width: 12px;
        height: 12px;
      }
    }
  }
  .other-function {
    width: 250px;
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    margin: 6% auto 0;
    .register {
      color: #5d98f6;
      font-size: 16px;
    }
    .pwd-forgotten {
      color: #5d98f6;
      font-size: 16px;
    }
  }
  .submit {
    width: 250px;
    opacity: 1;
    background-color: #5d98f6;
    border-radius: 4px;
    height: 40px;
    margin: 13% auto 0;
    font-size: 16px;
    color: #fefefe;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    &.activated {
      opacity: 0.8;
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
}
</style>
