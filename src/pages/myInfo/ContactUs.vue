<template>
  <h-view class="public-style contact-us">
    <h-header>
      <div slot="left" class="h-header-btn" @click="$routeGo()">
        <i class="ion-ios-arrow-back"/>
      </div>
      <div slot="center">联系我们</div>
    </h-header>
    <h-content>
      <list-item>
        <item>
          <img slot="left-icon" src="@/assets/image/myInfo/mail.png" class="left-icon">
          <div slot="name">邮箱</div>
          <div slot="content" style="color: rgb(44,129,255)" @click="sendMail" v-text="mail"/>
        </item>
        <item>
          <img slot="left-icon" src="@/assets/image/myInfo/phone.png" class="left-icon">
          <div slot="name">电话</div>
          <div slot="content" style="color: rgb(44,129,255)" @click="callPhone" v-text="phone"/>
        </item>
        <item>
          <img slot="left-icon" src="@/assets/image/myInfo/wechat.png" class="left-icon">
          <div slot="name">微信</div>
          <div slot="content" v-text="weChat"/>
        </item>
        <item>
          <img slot="left-icon" src="@/assets/image/myInfo/qq.png" class="left-icon">
          <div slot="name">QQ</div>
          <div slot="content" v-text="qq"/>
        </item>

        <item>
          <img slot="left-icon" src="@/assets/image/myInfo/address.png" class="left-icon">
          <div slot="name">地址</div>
          <div slot="content" v-text="address"/>
        </item>
      </list-item>
    </h-content>
  </h-view>
</template>

<script>
export default {
  data () {
    return {
      mail: 'mail.hand-china.com',
      phone: '18325379820',
      weChat: 'wu1446775128',
      qq: '1446775128',
      address: '上海市青浦区',
    }
  },
  methods: {
    sendMail () {
      this.hlsUtil.callEmail(this.mail)
    },
    callPhone () {
      this.hlsUtil.callPhone(this.phone)
    },
  },
}
</script>

<style scoped>

</style>
