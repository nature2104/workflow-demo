# hls-car-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 文件命名规范

1. 文件夹全部采用驼峰命名法，即首字母小写后面每个单词首字母大写

2. 文件名全部使用小写字母，单词与单词之间采用**-**连接,如 **user-info.vue,user-info-detail.vue**,

3. 路由的注册 `import` 语句后的单词采用 Pascal命名法，所有单词的首字母大写，其余字母小写，单词与单词之间不使用任何符号风格。如

  ```javascript
  import HomeManager from '@/pages/homeManager/home-manager'
  import LoadMore from '@/pages/loadMore/load-more'
  import UserInfo from '@/pages/userInfo/user-info'
  import UserInfoDetail from '@/pages/userInfo/user-info-detail'
  ```

4. 实际路由注册需安照如下写法，`path`为 `/tab/文件名`,`/tab`是否保留视实际情况而定。`component`后接的单词需和`import`的单词保持一致,`name`后接的单词也需和`import`的单词保持一致

  ```javascript
  {path: "/tab/home-manager", component: HomeManager, name: 'HomeManager', meta: {keepAlive: true}},
  {path: '/tab/load-more', component: LoadMore, name: 'LoadMore', meta: {keepAlive: true}},
  {path: '/tab/user-info', component: UserInfo, name: 'UserInfo', meta: {keepAlive: true}},
  ```

# keyStore签名信息

 keystore文件 hlscar.keystore

 别名 HLSkey

 密码 com.hls.easy.car

# 签名
 jarsigner -verbose -keystore hls.keystore -signedjar 车租易.apk hls.apk HLSkey

# 打包冲突解决
 各项目如果安装了 com.hls.plugins.barcode 扫码插件与cordova-plugin-open-camera 媒体插件
 两个插件之间存在一些冲突 请注释掉媒体插件 plugin.xml 第83行 <uses-feature android:name="android.hardware.camera" />

