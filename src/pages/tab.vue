/**
* @Author think
* @Date 2019-06-25 15:37
*/

<template>
  <div id="tab" style="height: 100%;width:100%;">
    <transition :name="transitionName">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <tabbar slot="bottom" class="vux-tabbar" icon-class="vux-center">
      <tabbar-item :link="{path:'/tab/home'}" :selected="$route.path === '/' || $route.path==='/tab/home'">
        <img slot="icon-active" src="@/assets/image/tab/home@2x.png">
        <img slot="icon" src="@/assets/image/tab/n_home@2x.png">
        <span slot="label">主页</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/tab/myInfo'}" :selected="$route.path === '/tab/myInfo'">
        <img slot="icon-active" src="@/assets/image/tab/my@2x.png">
        <img slot="icon" src="@/assets/image/tab/n_my@2x.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      pathList: [],
      transitionName: '',

    }
  },
  watch: { // 监听路由变化
    $route (to, from) {
      if (this.pathList.includes(to.path)) {
        const index = (this.pathList.findIndex(() => {
          return from.path
        }))
        this.pathList.splice(index, 1)
        this.$router.isBack = true
      } else {
        this.pathList.push(to.path)
        this.$router.isBack = false
      }
      if (to.path === '/tab/home') {
        this.$router.isBack = true
        this.pathList = []
      }
      /* let isBack = this.$router.isBack
       if (isBack) {
         this.transitionName = 'router-slide-right'
       } else {
         this.transitionName = 'router-slide-left'
       } */
      this.$router.isBack = false
    },
  },
  mounted () {
  },
  methods: {
    tabClick () {
      // console.log('click');
    },
  },
}

</script>
<style lang="less" scoped>
  .weui-tabbar {
    background-color: #ffffff;
  }

  .weui-tab__panel {
    padding-bottom: 0px !important;
  }

  .weui-tab {
    position: fixed;
    height: 100%;
    bottom: 0;
    width: 100%;
    .vux-tabbar {
      .weui-tabbar__item {
        p {
          font-size: 24px;
        }
        img {
          width: 44px;
          height: 44px;
        }
      }
    }
  }

  // iPhoneX适配
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio: 3) {
    .platform-ios {
      .weui-tabbar {
        padding-bottom: 34px;
      }
    }
  }
  // iPhoneX适配
  @media (device-width: 414px) and (device-height: 896px) {
    .platform-ios {
      .weui-tabbar {
        padding-bottom: 34px;
      }
    }
  }
</style>
