/**
 * hmap子应用登录逻辑
 * @author momoko 2018/05/08
 */

import axios from 'axios'
import { getUrlParam } from './utils'

// 模拟登录
export function analogLogin () {
  return new Promise((resolve, reject) => {
    const url = `${$config.hmapUrl}/oauth/token?client_id=18f58010-2831-11e8-b467-0ed5f89f718b&client_secret=2fe58f36-2831-11e8-b467-0ed5f89f718b&grant_type=password&username=%2B8618325379820&password=jingchaowu520&authType=TEL`
    axios.post(url).then(res => {
      window.localStorage.setItem('token', res.access_token)
      resolve({
        token: res.access_token,
        tokenType: res.token_type,
        expires: res.expires_in,
        userId: res.userId,
        organizationId: res.organizationId,
      })
    })
  })
}

// 授权码登录
export async function authorizedLogin () {
  return new Promise((resolve, reject) => {
    const code = getUrlParam('code')
    const url = `${$config.hmapUrl}/oauth/token?client_id=18f58010-2831-11e8-b467-0ed5f89f718b&client_secret=2fe58f36-2831-11e8-b467-0ed5f89f718b&grant_type=authorization_code&code=${encodeURIComponent(code)}`
    axios.post(url).then(res => {
      window.localStorage.setItem('token', res.access_token)
      resolve({
        token: res.access_token,
        tokenType: res.token_type,
        expires: res.expires_in,
        userId: res.userId,
        organizationId: res.organizationId,
        account: res.account,
        mobile: res.phoneNumber,
      })
    })
  })
}

// 桥登录
export function bridgeLogin () {
  return new Promise((resolve, reject) => {
    // 登录成功回调
    window.bridgeLoginSuccess = function (str) {
      const res = JSON.parse(str)
      window.localStorage.setItem('token', res.token)
      const data = {
        token: res.token,
        tokenType: res.tokenType,
        expires: res.expiresIn,
        userId: res.userId,
        organizationId: res.organizationId,
        account: res.account,
        mobile: res.phoneNumber,
      }
      resolve(data)
    }
    // 登录失败回调
    window.bridgeLoginFailure = function (res) {
      console.error(res)
      reject(res)
    }
    const dict = {
      'className': 'BaseBridge',
      'function': 'getBaseInfo',
      'successCallBack': 'bridgeLoginSuccess',
      'failureCallBack': 'bridgeLoginFailure',
    }
    HandBridge.postMessage(JSON.stringify(dict))
  })
}

// 获取用户详细信息
export function getUserInfo (userId) {
  const url = `${$config.hmapUrl}/i/api/staff/customDetail`
  const data = {
    userId,
  }
  const options = {
    headers: {
      Authorization: `Bearer ${window.localStorage.token}`,
    },
  }
  return new Promise((resolve, reject) => {
    axios.post(url, data, options).then(res => {
      resolve({
        account: res.accountNumber,
        mobile: res.mobile,
        userId: res.userId,
        organizationId: res.organizationId,
        email: res.email,
      })
    })
  })
}

/**
 * 获取中台的token
 * @returns {Promise<*>}
 */
export async function getSupportToken () {
  const url = `${$config.loginPath}appadmin`
  const res = await axios.post(url)
  return res
}

/**
 * 获取业务系统个人信息
 * @returns {Promise<*>}
 */
export async function getLeasingUserInfo (account, mobile) {
  window.localStorage.setItem('account', account)
  const url = `${$config.basePath}hmap_app_login`
  const data = {
    'user_name': account,
    'mobile': mobile,
  }
  const options = {
    headers: {
      Authorization: `Bearer ${window.localStorage.access_token}`,
    },
  }
  return new Promise((resolve, reject) => {
    axios.post(url, data, options).then(res => {
      //  console.log('leasingInfo:' + JSON.stringify(res))
      if (res.result === 'S') {
        resolve(res.user_info[0])
      }
    })
  })
}

/**
 * 登录总成
 * @param  {String}  [type] 可选:'online''local'
 * @param  {Boolean} [needInfo] 是否需要获取用户详细信息
 * @return {Object.Promise} 若登录成功PromiseValue为数据对象/登录失败PromiseValue 为 false
 */
export async function login (type = 'online', needInfo = true) { // 登录
  const env = process.env.CONFIG_ENV // 环境
  try {
    let result = {}
    let tokenInfo = {}
    tokenInfo = await getSupportToken()
    window.localStorage.setItem('access_token', tokenInfo.access_token)

    if (env === 'prod' || env === 'uat') { // 真机
      if (type === 'online') result = await authorizedLogin() // 在线子应用
      if (type === 'local') result = await bridgeLogin() // 本地子应用
      window.localStorage.setItem('mobile', result.mobile)
      result.userInfo = await getLeasingUserInfo(result.account, result.mobile)
    } else {
      result = await analogLogin()
      result.hmapUserInfo = await getUserInfo(result.userId)
      window.localStorage.setItem('mobile', result.hmapUserInfo.mobile)
      result.userInfo = await getLeasingUserInfo(result.hmapUserInfo.account, result.hmapUserInfo.mobile)
    }

    window.localStorage.setItem('user_id', result.userInfo.user_id)
    return result
  } catch (e) {
    // console.error(e)
    return false
  }
}

/**
 * 海马汇业务系统集成登录
 * @param type
 * @param needInfo
 * @returns {Promise<any>}
 */
export default function hmapLogin (type = 'local', needInfo = true) {
  const env = process.env.CONFIG_ENV // 环境
  return new Promise((resolve, reject) => {
    try {
      let result = {}
      if (env === 'prod' || env === 'uat') { // 真机
        if (type === 'online') {
          authorizedLogin().then(res => {
            result = res
            window.localStorage.setItem('mobile', res.mobile)
          })
        }// 在线子应用
        if (type === 'local') {
          result = bridgeLogin().then(res => {
            result = res
            window.localStorage.setItem('mobile', res.mobile)
          })
        }
        getSupportToken().then(res => {
          window.localStorage.setItem('access_token', res.access_token)
          getLeasingUserInfo(result.account, result.mobile).then(res => {
            result.userInfo = res
            window.localStorage.setItem('user_id', res.user_id)
            resolve(result)
          })
        })
      } else {
        analogLogin().then(res => {
          result = res
          getUserInfo(res.userId).then(info => {
            result.hmapUserInfo = info
            window.localStorage.setItem('mobile', info.mobile)
            getSupportToken().then(support => {
              window.localStorage.setItem('access_token', support.access_token)
              getLeasingUserInfo(info.account, info.mobile).then(res => {
                result.userInfo = res
                window.localStorage.setItem('user_id', res.user_id)
                resolve(result)
              })
            })
          })
        })
      }
    } catch (e) {
      reject(e)
    }
  })
}
