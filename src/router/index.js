import Vue from 'vue'
import Router from 'vue-router'

// 我的
const MyInfo = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/myInfo')) }, 'my')
const InfoDetails = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/InfoDetails')) }, 'my')
const PasswordReset = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/PasswordReset')) }, 'my')
const Setting = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/Setting')) }, 'my')

// 关于
const About = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/About')) }, 'about')
const UserAgree = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/UserAgreement')) }, 'about')
const PrivacyPolicy = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/PrivacyPolicy')) }, 'about')
const ContactUs = resolve => require.ensure([], () => { resolve(require('@/pages/myInfo/ContactUs')) }, 'about')

const Login = resolve => require.ensure([], () => { resolve(require('@/pages/login/login')) }, 'login')
const Tab = resolve => require.ensure([], () => { resolve(require('@/pages/tab')) }, 'home')

// 工作流
const WorkflowList = resolve => require.ensure([], () => { resolve(require('@/pages/applications/workflow/workflow-list')) }, 'home')
const WorkflowDetail = resolve => require.ensure([], () => { resolve(require('@/pages/applications/workflow/workflow-detail')) }, 'home')

Vue.use(Router)

// 全局跳转路由方法
Router.prototype.pushPage = function (param, bool) {
  debugger
  let key = true
  if (bool === undefined) {
    key = true
  } else if (bool === true || bool === false) {
    key = bool
  }
  this.currentRoute.meta.nextReload = key
  this.push(param)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'Login',
      meta: { keepAlive: false },
    },
    { path: '/Login', component: Login, name: 'Login', meta: { keepAlive: true } },
    {
      path: '/tab',
      component: Tab,
      name: 'Tab',
      redirect: '/tab/home',
      meta: { keepAlive: false, svg: 'home' },
      children: [
        { path: '/tab/home', component: WorkflowList, name: 'home', meta: { keepAlive: false, svg: 'home' } },
        { path: '/tab/myInfo', component: MyInfo, name: 'MyInfo', meta: { keepAlive: true } },
      ],
    },
    // 工作流
    {
      path: '/WorkflowList',
      component: WorkflowList,
      name: 'WorkflowList',
      meta: { keepAlive: true, svg: 'list' },
    },
    {
      path: '/WorkflowDetail',
      component: WorkflowDetail,
      name: 'WorkflowDetail',
      meta: { keepAlive: false, nextReload: '', svg: 'list' },
    },
    // 我的
    { path: '/InfoDetails', component: InfoDetails, name: 'InfoDetails', meta: { keepAlive: true } },
    { path: '/PasswordReset', component: PasswordReset, name: 'PasswordReset', meta: { keepAlive: false } },
    { path: '/Setting', component: Setting, name: 'Setting', meta: { keepAlive: true } },
    { path: '/About', component: About, name: 'About', meta: { keepAlive: true } },
    { path: '/UserAgree', component: UserAgree, name: 'UserAgree', meta: { keepAlive: true } },
    { path: '/PrivacyPolicy', component: PrivacyPolicy, name: 'PrivacyPolicy', meta: { keepAlive: true } },
    { path: '/ContactUs', component: ContactUs, name: 'ContactUs', meta: { keepAlive: true } },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
      }
    }
  },
})
