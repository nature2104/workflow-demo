<template>
  <h-view class="public-style about">
    <h-header>
      <div slot="left" class="h-header-btn" @click="$routeGo()">
        <i class="ion-ios-arrow-back"/>
      </div>
      <div slot="center">关于工作流</div>
    </h-header>
    <h-content>
      <div class="about-content">
        <img class="icon" src="@/assets/image/icon.png">
        <div class="version">工作流 V{{ currentVersion }}</div>
      </div>
      <list-item>
        <item :show-arrow="true" @click.native="contactUs">
          <div slot="name">联系我们</div>
        </item>
        <item :show-arrow="true" @click.native="userAgree">
          <div slot="name">用户协议</div>
        </item>
        <item :show-arrow="true" @click.native="privacyPolicy">
          <div slot="name">隐私政策</div>
        </item>
      </list-item>
    </h-content>
  </h-view>
</template>

<script>
export default {
  data () {
    return {
      currentVersion: process.env.currentVersion,
    }
  },
  methods: {
    contactUs () {
      this.$router.push({
        name: 'ContactUs',
      })
    },
    userAgree () {
      this.$router.push({
        name: 'UserAgree',
      })
    },
    privacyPolicy () {
      this.$router.push({
        name: 'PrivacyPolicy',
      })
    },
  },
}
</script>

<style lang="less">
  .about {
    background-color: #f3f3f3;
    .content {
      .about-content {
        height: 170px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #fff;
        .icon{
          width: 60px;
          height: 60px;
          border-radius: 12px;
        }
        .version{
          margin-top: 20px;
          font-size: 17px;
          color: #666;
          font-weight: 400;
        }
      }
      .hls-list-item{
        margin-top: 20px;
        .hls-item{
          .contents{
            .add-name{
              color: #666;
            }
          }
        }
      }
    }
  }
</style>
