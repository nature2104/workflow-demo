'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONFIG_ENV: JSON.stringify(process.env.CONFIG_ENV),
  debug: true,
  isMobilePlatform: false,
  appCode:'"HLS_VUE_APP"',
  loginPath: '"http://hlsapp.hand-china.com/core/oauth/token?client_id=hQGCtxTItRa34PUOgxaD0r7oSPeuEaIB&client_secret=7ee8338c-4a06-44a1-87cc-afa63f8e1bc3&grant_type=password&username=app&password=" ',
  basePath: '"http://hlsapp.hand-china.com/core/r/api?sysName=HLS_APP&apiName="',
  rootPath: '"http://hlsapp.hand-china.com/core/r/api"',
  file_url: '"http://hlsapp.hand-china.com/file/"',
  appId: '"com.hls.easy.car"',
  currentVersion: '"1.0.1"',
  wxCode:"'hlsWx'",
  uploadSysName:"'HLS_APP'",
  uploadApiName:"'attachment_upload'",
  dbName: "'Function.db'",
  dbLocation: 0,
});
