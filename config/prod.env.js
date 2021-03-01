'use strict'
module.exports = {
  NODE_ENV: '"production"',
  CONFIG_ENV: JSON.stringify(process.env.CONFIG_ENV),
  debug: false,
  isMobilePlatform: true,
  appCode:'"HLS_VUE_APP"',
  loginPath: '"http://hlsapp.hand-china.com/core/oauth/token?client_id=client3&client_secret=secret&grant_type=client_credentials" ',
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
}
