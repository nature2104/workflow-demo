<template>
  <h-view class="public-style myInfo" style="height:100%;">

    <h-content :cal-content="false">
      <div class="logo-bg">
        <h-header :has-border="false">
          <!-- <div slot="left" class="h-header-btn" @click="$routeGo()">
             <i class="ion-ios-arrow-back"/>
           </div>-->
        </h-header>
        <div class="info" @click="goinfoDetail">
          <div class="logo-pad">
            <img v-if="info.img" :src="info.img" class="logo">
          </div>
          <div class="info-details">
            <img src="@/assets/image/right-white@2x.png">
          </div>
        </div>
        <div class="logo-name" v-text="info.description"/>
      </div>
      <list-item>
        <item :show-arrow="true" @click.native="passwordReset">
          <img slot="left-icon" src="@/assets/image/myInfo/updatePass@2x.png" class="left-icon">
          <div slot="name">修改密码</div>
        </item>
      </list-item>

      <list-item>
        <item :show-arrow="true" @click.native="goSetting">
          <img slot="left-icon" src="@/assets/image/myInfo/setting@2x.png" class="left-icon">
          <div slot="name">设置</div>
        </item>
        <item :show-arrow="true" @click.native="goAbout">
          <img slot="left-icon" src="@/assets/image/myInfo/about@2x.png" class="left-icon">
          <div slot="name">关于</div>
          <div slot="content">当前版本 v{{ currentVersion }}</div>
        </item>
      </list-item>
    </h-content>
  </h-view>
</template>

<script>
import hlsPopup from '@/scripts/hlsPopup'

export default {
  data () {
    return {
      info: {
        img: '',
        description: '',
      },
      currentVersion: process.env.currentVersion,
    }
  },
  activated () {
    let vm = this
    vm.$nextTick(function () {
      vm.info = {
        img: '',
        description: '',
      }
    })
    vm.init()
    // }
  },
  methods: {
    init () {
      let vm = this
      if (window.localStorage.userImg) {
        vm.info.img = window.localStorage.userImg
      } else {
        let url = $config.basePath + 'person_information'
        let param = {}
        vm.hlsHttp.post(url, param).then(function (res) {
          hlsPopup.hideLoading()
          let info = res.person_informatio[0]
          vm.info.description = info.name_n
          vm.info.img = info.dataBase64String
          if (window.localStorage.userImg) {
            window.localStorage.removeItem('userImg')
          }
          window.localStorage.setItem('userImg', info.dataBase64String)
        })
      }
    },

    goinfoDetail () {
      this.$router.push('/InfoDetails')
    },

    goSetting () {
      this.$router.push('/Setting')
    },
    passwordReset () {
      this.$router.push('/PasswordReset')
    },
    goAbout () {
      this.$router.push({
        name: 'About',
      })
    },
  },
}
</script>

<style lang="less" type="text/less">
  .myInfo {
    .logo-bg {
      width: 100%;
      height: 200px;
      background: url(../../assets/image/myInfo/mybground@2x.png) no-repeat;
      background-size: cover;
      //background-position-y: -286px;
      display: flex;
      flex-direction: column;
      -webkit-flex-direction: column;
      .h-header {
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        .ion-ios-arrow-back {
          color: white;
        }
      }
      .info {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        //padding-top: 60px;
        margin-left: 10px;
        .logo-pad {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #FC9766;
          display: -webkit-flex;
          display: flex;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-align-items: center;
          border: 1px solid #FFFFFF;

          //align-items: center;
          .logo {
            width: 56px;
            height: 56px;
            border-radius: 50%;
          }
        }
        .info-details {
          margin-left: 20px;
          img{
            width: 8px;
          }
        }
      }

      .logo-name {
        font-size: 16px;
        color: #ECF4FE;
        text-align: center;
        margin-top: 13px;
      }
      .logo-position {
        margin-top: 16px;
        font-size: 14px;
        color: #9CC7F9;
      }
    }
    .content {
      .list {
        width: 100%;
      }
    }
  }
</style>
