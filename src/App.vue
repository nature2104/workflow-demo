<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pathList: [],
      transitionName: 'router-slide-right',
    }
  },
  watch: { // 监听路由变化
    $route (to, from) {
      //  debugger;
      this.$el.className = 'home-skeleton'
      if (to.meta && to.meta.svg) {
        if (to.meta.svg === 'home') {
          this.$el.className = 'home-skeleton'
        } else if (to.meta.svg === 'list') {
          this.$el.className = 'skeleton-list'
        } else {
          this.$el.className = ''
        }
      } else {
        this.$el.className = ''
      }
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
      if (to.path === 'tab/home') {
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
    // this.getAccessToken()
  },
  methods: {
    getAccessToken () {
      let vm = this
      let url = process.env.loginPath + 'appadmin'
      let param = {}
      vm.hlsHttp.post(url, param).then(function (res) {
        window.localStorage.setItem('access_token', res.access_token)
      })
    },
    onSwipeLeft () {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less">
  @import "styles/variables";
  @import "styles/platform-ios";

  html, body, #app {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .home-skeleton {
    background: url("assets/skeleton.svg") no-repeat fixed;
    background-size: contain;
  }

  .skeleton-list {
    background: url("assets/skeleton-list.svg") no-repeat fixed;
    background-size: contain;
  }

  //overflow: auto;
  //-webkit-overflow-scrolling: touch;
  //overflow-scrolling: touch;
</style>
