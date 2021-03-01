'use strict'
module.exports = {
  NODE_ENV: '"production"',
  CONFIG_ENV: JSON.stringify(process.env.CONFIG_ENV),
  debug: true,
  isMobilePlatform: true,
  appCode:'"HLS_VUE_APP"',
  loginPath: '"http://hlsapp.hand-china.com/core/oauth/token?client_id=hQGCtxTItRa34PUOgxaD0r7oSPeuEaIB&client_secret=7ee8338c-4a06-44a1-87cc-afa63f8e1bc3&grant_type=password&username=app&password=" ',
  basePath: '"http://hlsapp.hand-china.com/core/r/api?sysName=HLS_APP&apiName="',
  rootPath: '"http://hlsapp.hand-china.com/core/r/api"',
  file_url: '"http://hlsapp.hand-china.com/file/"',
  appId: '"com.hls.easy.car"',
  currentVersion: '"1.0.5"',
  wxCode:"'hlsWx'",
  uploadSysName:"'HLS_APP'",
  uploadApiName:"'attachment_upload'",
  dbName: "'Function.db'",
  dbLocation: 0,
}
