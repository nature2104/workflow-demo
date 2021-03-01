export default {

  city: {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  },

  // 检查号码是否符合规范，包括长度，类型
  isCardNo (card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    card = card.toUpperCase()
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

    return reg.test(card)
  },

  // 取身份证前两位,校验省份
  checkProvince: function (card) {
    card = card.toUpperCase()
    let province = card.substr(0, 2)
    if (this.city[province] === undefined) {
      return false
    }
    return true
  },

  // 检查生日是否正确
  checkBirthday: function (card) {
    card = card.toUpperCase()
    let len = card.length
    let arrData
    let year
    let month
    let day
    let birthday
    // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len === 15) {
      let reFifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
      arrData = card.match(reFifteen)
      year = arrData[2]
      month = arrData[3]
      day = arrData[4]
      birthday = new Date('19' + year + '/' + month + '/' + day)
      return this.verifyBirthday('19' + year, month, day, birthday)
    }
    // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len === 18) {
      let reEighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
      arrData = card.match(reEighteen)
      year = arrData[2]
      month = arrData[3]
      day = arrData[4]
      birthday = new Date(year + '/' + month + '/' + day)
      return this.verifyBirthday(year, month, day, birthday)
    }
    return false
  },

  // 校验日期
  verifyBirthday: function (year, month, day, birthday) {
    // 年月日是否合理
    return (birthday.getFullYear().toString() === year && ((birthday.getMonth() + 1) < 10 ? '0' + (birthday.getMonth() + 1) : (birthday.getMonth() + 1).toString()) === month &&
      ((birthday.getDate()) < 10 ? '0' + (birthday.getDate()).toString() : birthday.getDate().toString()) === day)
  },

  // 校验位的检测
  checkParity (card) {
    // 15位转18位
    card = this.changeFivteenToEighteen(card)
    var len = card.length
    if (len === 18) {
      let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
      let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
      let cardTemp = 0
      for (let i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i]
      }
      let valnum = arrCh[cardTemp % 11]
      if (valnum === card.substr(17, 1)) {
        return true
      }
      return false
    }
    return false
  },

  // 15位转18位身份证号
  changeFivteenToEighteen (card) {
    if (card.length === 15) {
      let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
      let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
      let cardTemp = 0
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
      for (let i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i]
      }
      card += arrCh[cardTemp % 11]
      return card
    }
    return card
  },

  /**
   * 检验身份证号码
   */

  isCardID (card) {
    card = card.toUpperCase()
    if (this.isCardNo(card) === false) {
      return '你输入的身份证长度或格式错误'
    }
    // 检查省份
    if (this.checkProvince(card) === false) {
      return '你的身份证地区非法'
    }
    // 校验生日
    if (this.checkBirthday(card) === false) {
      return '身份证上的出生日期非法'
    }
    // 检验位的检测
    if (this.checkParity(card) === false) {
      return '你输入的身份证号非法'
    }
    return ''
  },

  // 银行卡号校验
  isBankAccount: function (bankno) {
    if (bankno.length < 16 || bankno.length > 19) {
      /* 银行卡号长度必须在16到19之间 */
      return '银行卡号长度必须在16到19之间'
    }
    let num = /^\d*$/// 全数字
    if (!num.exec(bankno)) {
      /* 银行卡号必须全为数字 */
      return '银行卡号必须全为数字'
    }
    var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
    if (strBin.indexOf(bankno.substring(0, 2)) === -1) {
      /* 银行卡号开头6位不符合规范 */
      return '银行卡号开头6位不符合规范'
    }
    // Luhn校验
    if (!this.luhnCheck(bankno)) {
      return '银行卡号有误，请从新输入'
    }
    // return true;
  },

  luhnCheck: function (bankno) {
    let lastNum = Number(bankno.substr(bankno.length - 1, 1))// 取出最后一位（与luhn进行比较）
    let first15Num = bankno.substr(0, bankno.length - 1)// 前15或18位
    let newArr = []
    for (let i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
      newArr.push(first15Num.substr(i, 1))
    }
    let arrJiShu = [] // 奇数位*2的积 <9
    let arrJiShu2 = [] // 奇数位*2的积 >9
    let arrOuShu = [] // 偶数位数组
    for (let j = 0; j < newArr.length; j++) {
      if ((j + 1) % 2 === 1) { // 奇数位
        if (parseInt(newArr[j]) * 2 < 9) { arrJiShu.push(parseInt(newArr[j]) * 2) } else { arrJiShu2.push(parseInt(newArr[j]) * 2) }
      } else { arrOuShu.push(newArr[j]) }
    }
    let jishuChild1 = []// 奇数位*2 >9 的分割之后的数组个位数
    let jishuChild2 = []// 奇数位*2 >9 的分割之后的数组十位数
    for (let h = 0; h < arrJiShu2.length; h++) {
      jishuChild1.push(parseInt(arrJiShu2[h]) % 10)
      jishuChild2.push(parseInt(arrJiShu2[h]) / 10)
    }
    let sumJiShu = 0 // 奇数位*2 < 9 的数组之和
    let sumOuShu = 0 // 偶数位数组之和
    let sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
    let sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
    for (let m = 0; m < arrJiShu.length; m++) {
      sumJiShu = sumJiShu + parseInt(arrJiShu[m])
    }
    for (let n = 0; n < arrOuShu.length; n++) {
      sumOuShu = sumOuShu + parseInt(arrOuShu[n])
    }
    for (let p = 0; p < jishuChild1.length; p++) {
      sumJiShuChild1 = sumJiShuChild1 + parseInt(jishuChild1[p])
      sumJiShuChild2 = sumJiShuChild2 + parseInt(jishuChild2[p])
    }
    // 计算总和
    let sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)
    // 计算luhn值
    let k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
    let luhn = 10 - k
    if (lastNum === luhn) {
      return true
    } else {
      /* 银行卡号必须符合luhn校验 */
      return false
    }
  },

  /**
   * 判断输入是否为十一位电话号码
   * @param str 字符串
   * @returns {boolean}
   */
  phoneNumber: function (str) {
    // ^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$

    let reg = /^((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8}$/
    return reg.test(str)
  },
  /**
   * 判断+86后11位电话号码
   * @param str 字符串
   * @returns {boolean}
   */
  phoneNumber86: function (str) {
    let reg = /^(\+86|\+86+\s)+(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/
    return reg.test(str)
  },
  /**
   * 是否是邮件格式
   * @param str
   * @returns {boolean|*}
   */
  isEmailAddress: function (str) {
    let pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    return pattern.test(str)
  },
  /**
   *
   * @param cameraoption 对象{quality:质量默认50,allowEdit:true||false,width:宽度,height:高度}
   * @param onSuccess 成功回调函数
   * @param onFail 失败回调函数
   */

  /* eslint-disable */
  openCamera: function (cameraoption, onSuccess, onFail) {
    if (typeof onSuccess === 'function' && typeof onFail === 'function') {
      let options = {
        quality: cameraoption.quality || 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: cameraoption.allowEdit || false,
        targetWidth: cameraoption.width || 1024,
        targetHeight: cameraoption.height || 768,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: window.localStorage.savePhoto || false,
        correctOrientation: true,
      }
      navigator.camera.getPicture(onSuccess, onFail, options)
    } else {
      window.hlsPopup.showLongCenter('参数有误!')
    }
  },

  /**
   * 最多选取10张,返回图片的存储地址数组形式
   * @param obj {quality:质量默认50,width:宽度,height:高度}
   * @param successFunction 成功回调函数
   * @param errorFunction 失败函数
   */
  takePicture: function (obj, successFunction, errorFunction) {
    if (typeof successFunction === 'function' && typeof errorFunction === 'function') {
      window.imagePicker.getPictures(
        successFunction, errorFunction, {
          maximumImagesCount: obj.maxCount || 10,
          quality: obj.quality || 50,
          width: obj.width || 1024,
          height: obj.height || 768,
        }
      )
    } else {
      window.hlsPopup.showLongBottom('参数有误!')
    }
  },

  /**
   * 拨打电话仅仅限制于手机
   * @param number
   */
  callPhone: function (number) {
    window.open('tel:' + number)
  },
  /**
   * 发邮件
   * @param email
   */
  callEmail: function (email) {
    window.open('mailto:' + email)
  },
  /**
   * 非ftp的上传方式
   * @param filePath
   * @param success
   */
  fileUploadHls: function (file, success) {
    let path = file.filePath
    let name = path.substr(path.lastIndexOf('/') + 1)
    let url = encodeURI(process.env.rootPath + '/app/fileUploadHls?sysName=HLS_APP&apiName=attment_file_upload')
    let options = new FileUploadOptions() // eslint-disable-line
    options.fileKey = 'file'
    options.headers = {
      'Authorization': 'Bearer ' + window.localStorage.access_token,
    }
    options.params = {
      'table_name': file.table_name,
      'table_pk_value': file.table_pk_value,
      'user_id': window.localStorage.user_id,
      'access_token': window.localStorage.access_token,
      'filePath': path,
    }
    options.fileName = name
    options.mimeType = 'multipart/form-date'
    let ft = new FileTransfer() // eslint-disable-line
    ft.onprogress = function (progressEvent) {
      if (progressEvent.lengthComputable) {
        loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total) // eslint-disable-line
      } else {
        loadingStatus.increment() // eslint-disable-line
      }
    }

    function uploadSuccess (result) {
      success(JSON.parse(result.response))
    }

    function fileError () {
      window.hlsPopup.hideLoading()
      console.log('upload error source ' + error.source)
      console.log('upload error target ' + error.target)
    }

    ft.upload(path, url, uploadSuccess, fileError, options)
  },
  /**
   * 调用系统svc进行上传
   * @param filePath
   * @param success
   */
  fileUploadSvc: function (file, success) {
    let path = file.filePath
    let name = path.substr(path.lastIndexOf('/') + 1)
    let url = encodeURI(process.env.rootPath + '/app/fileUploadSvc?sysName=HLS_APP&apiName=attachment_upload')
    let options = new FileUploadOptions() // eslint-disable-line
    options.fileKey = 'file'
    options.headers = {
      'Authorization': 'Bearer ' + window.localStorage.access_token,
    }
    options.params = {
      'source_type': file.table_name,
      'pkvalue': file.table_pk_value,
      'user_id': window.localStorage.user_id,
      'access_token': window.localStorage.access_token,
      'filePath': path,
      'timestamp': file.timestamp,
      'sequence': file.sequence,
    }
    options.fileName = name
    options.mimeType = 'multipart/form-date'
    let ft = new FileTransfer() // eslint-disable-line

    function uploadSuccess (result) {
      success(JSON.parse(result.response))
    }

    function fileError () {
      window.hlsPopup.hideLoading()
      console.log('upload error source ' + error.source)
      console.log('upload error target ' + error.target)
    }

    ft.upload(path, url, uploadSuccess, fileError, options)
  },
  /**
   * 汉王识别
   * @param file
   * @param url
   * @param success
   */
  hangwan: function (fileUrl, postUrl, success) {
    if (!fileUrl) {
      return
    }
    let path = fileUrl
    let name = fileUrl.substr(fileUrl.lastIndexOf('/') + 1)
    let url = encodeURI(postUrl)
    let options = new FileUploadOptions() // eslint-disable-line
    options.headers = {
      'Authorization': 'Bearer ' + window.localStorage.access_token,
    }
    options.fileKey = 'file'
    options.fileName = name
    options.mimeType = 'multipart/form-date'
    let ft = new FileTransfer() // eslint-disable-line

    function uploadSuccess (message) {
      let res = JSON.parse(message.response)
      success(res)
    }

    function error (e) {
      this.hlsPopup.showLongCenter('汉王识别失败')
    }

    ft.upload(path, url, uploadSuccess, error, options)
  },
  /**
   *
   * @param x 输入的数字
   * @returns {Number} 返回数字
   */
  toDecimal: function (x) {
    // hlsPopup.showLongCenter(baseConfig.debug);
    let f = parseFloat(x)
    if (isNaN(f)) {
      return 0
    }
    f = Math.round(x * 100) / 100
    return f
  },

  formatFloat: function (f, digit) {
    let m = Math.pow(100000, digit)
    return parseInt(f * m, 100000) / m
  },

  /**
   *
   * @param ir  interest rate per month
   * @param np  number of periods (months)
   * @param pv  present value
   * @param fv  future value (residual value)
   * @returns {number} 计算结果;
   * @constructor
   */
  PMT: function (ir, np, pv, fv, type) {
    /*
     ir - interest rate per month
     np - number of periods (months)
     pv - present value
     fv - future value (residual value)
     type - 0 or 1 need to implement that
     */
    if (!type) {
      type = 0
    }
    if (ir === 0) {
      return -pv / np
    }
    let r1 = 1 + ir

    // let pmt = -( ir * ( pv * Math.pow((ir + 1), np) + fv ) ) / ( ( ir + 1 ) * ( Math.pow((ir + 1), np) - 1 ) );
    let pmt = -(pv * Math.pow(r1, np) + fv) * ir / ((1 + ir * type) * (Math.pow(r1, np) - 1))
    return this.toDecimal(pmt)
  },

  /**
   *
   * @param rate
   * @param per
   * @param nper
   * @param pv
   * @param fv
   * @param type
   * @returns {*}
   * @constructor
   */
  IPMT: function (rate, per, nper, pv, fv, type) {
    let ipmt = 0
    let r = rate
    let R1 = 1 + r
    let t = per
    let n = nper
    let ct
    if (rate === 0) {
      return 0
    }
    if (fv) {
      fv = -fv
    } else {
      fv = 0
    }
    if (type) {
      ct = type
    } else {
      ct = 0
    }
    if (type === 1 && per === 1) {
      return ipmt
    } else {
      ipmt = -(pv * Math.pow(R1, n) + fv) * r /
        ((1 + r * ct) * (Math.pow(R1, n) - 1)) -
        (pv / (1 + r * ct) - (pv * Math.pow(R1, n) + fv) /
          ((1 + r * ct) * (Math.pow(R1, n) - 1))) *
        (Math.pow(R1, t) - Math.pow(R1, (t - 1)))
      return this.toDecimal(ipmt)
    }
  },

  /**
   *
   * @param p_rate
   * @param p_nper
   * @param p_pmt
   * @param p_fv
   * @param p_type
   * @returns {number|*}
   * @constructor
   */
  PV: function (pRate, pNper, pPmt, pFv, pType) {
    let pv
    let r
    let R1
    let n
    let pmt
    let fv
    let ct

    r = pRate
    R1 = 1 + r
    n = pNper
    if (pPmt) {
      pmt = pPmt
    } else {
      pmt = 0
    }
    if (pFv) {
      fv = pFv
    } else {
      fv = 0
    }
    if (pType) {
      ct = pType
    } else {
      ct = 0
    }
    pv = -(fv + pmt * (1 + r * ct) * (Math.pow(R1, n) - 1) / r) /
      Math.pow(R1, n)
    return this.toDecimal(pv)
  },

  /**
   *
   * @param p_rate
   * @param p_nper
   * @param p_pmt
   * @param p_pv
   * @param p_type
   * @returns {number|*}
   * @constructor
   */
  FV: function (pRate, pNper, pPmt, pPv, pType) {
    let fv
    let r
    let R1
    let n
    let pmt
    let pv
    let ct

    r = pRate
    R1 = 1 + r
    n = pNper
    if (pPmt) {
      pmt = pPmt
    } else {
      pmt = 0
    }

    if (pPv) {
      pv = pPv
    } else {
      pv = 0
    }
    if (pType) {
      ct = pType
    } else {
      ct = 0
    }
    fv = -pv * Math.pow(R1, n) - pmt * (1 + r * ct) * (Math.pow(R1, n) - 1) / r
    return this.toDecimal(fv)
  },

  /**
   *
   * @param args
   * @param rate
   * @returns {*}
   * @constructor
   */
  NPV: function (args, rate) {
    let rrate = (1 + rate / 100)
    let npv = args[0]
    for (let i = 1; i < args.length; i++) {
      npv += (args[i] / Math.pow(rrate, i))
    }
    return npv
  },

  /**
   *
   * @param fn
   * @returns {number}
   */
  seekZero: function (fn) {
    let x = 1
    while (fn(x) > 0) {
      x += 1
    }
    while (fn(x) < 0) {
      x -= 0.01
    }
    return x + 0.01
  },

  /**
   *
   * @param array
   * @returns {number}
   * @constructor
   */
  IRR: function (array) {
    let args = array
    let numberOfTries = 1
    // Cash flow values must contain at least one positive value and one negative value
    let positive, negative
    Array.prototype.slice.call(args).forEach(function (value) {
      if (value > 0) positive = true
      if (value < 0) negative = true
    })
    if (!positive || !negative) throw new Error('IRR requires at least one positive value and one negative value')

    function npv (rate) {
      numberOfTries++
      if (numberOfTries > 1000) {
        throw new Error('IRR can\'t find a result')
      }
      let rrate = (1 + rate / 100)
      let npv = args[0]
      for (let i = 1; i < args.length; i++) {
        npv += (args[i] / Math.pow(rrate, i))
      }
      return npv
    }

    return this.seekZero(npv)
  },

  // Returns Sum of f(x)/f'(x)
  sumEq: function (cfs, durs, guess) {
    let sumFx = 0
    let sumFdx = 0
    for (let i = 0; i < cfs.length; i++) {
      sumFx = sumFx + (cfs[i] / Math.pow(1 + guess, durs[i]))
    }
    for (let i = 0; i < cfs.length; i++) {
      sumFdx = sumFdx + (-cfs[i] * durs[i] * Math.pow(1 + guess, -1 - durs[i]))
    }
    return sumFx / sumFdx
  },
  durYear: function (first, last) {
    return (Math.abs(last.getTime() - first.getTime()) / (1000 * 3600 * 24 * 365))
  },

  /**
   *
   * @param cfs
   * @param dts
   * @param guess
   * @returns {number}
   * @constructor
   */
  XIRR: function (cfs, dts, guess) {
    if (cfs.length !== dts.length) throw new Error('Number of cash flows and dates should match')

    let positive, negative
    Array.prototype.slice.call(cfs).forEach(function (value) {
      if (value > 0) positive = true
      if (value < 0) negative = true
    })
    if (!positive || !negative) throw new Error('XIRR requires at least one positive value and one negative value')
    guess = guess || 0
    let limit = 100 // loop limit
    let guessLast
    let durs = []
    durs.push(0)
    // Create Array of durations from First date
    for (let i = 1; i < dts.length; i++) {
      durs.push(this.durYear(dts[0], dts[i]))
    }
    do {
      guessLast = guess
      guess = guessLast - this.sumEq(cfs, durs, guessLast)
      limit--
    } while (guessLast.toFixed(5) !== guess.toFixed(5) && limit > 0)
    let xirr = guessLast.toFixed(5) !== guess.toFixed(5) ? null : guess * 100
    return Math.round(xirr * 100) / 100
  },

  // 指纹
  fingerLogin: function () {
    if (vum.Platform.isIOS()) {
      return this.fingerLoginIos()
    } else {
      return this.fingerLoginAndroid()
    }
  },
  // android
  fingerLoginAndroid: function () {
    let isSupportFinger = 'true'
    return new Promise(function (resolve, reject) {
      Fingerprint.isAvailable(function (res) {  // eslint-disable-line
        if (window.localStorage.isSupportFinger) {
          window.localStorage.removeItem('isSupportFinger')
        }
        window.localStorage.setItem('isSupportFinger', isSupportFinger)
        if (window.localStorage.isOpenFingerLogin && window.localStorage.username && window.localStorage.password) {
          var successCallback = function (msg) {
            resolve(msg)
          }
          var errorCallback = function (err) {
            reject(err)
          }
          Fingerprint.show({ // eslint-disable-line
            clientId: 'com.car.rental.easy',
            clientSecret: 'a_very_secret_encryption_key', // Only necessary for Android
          }, successCallback, errorCallback)
        } else {
          reject() // eslint-disable-line
        }
      }, function (error) {
        isSupportFinger = false
        window.localStorage.isSupportFinger = isSupportFinger
        reject(error)
      })
    })
  },
  // ios
  fingerLoginIos: function () {
    return new Promise(function (resolve, reject) {
      let isSupportFinger = true
      window.plugins.touchid.isAvailable(
        // 支持指纹
        function () {
          isSupportFinger = true
          if (window.localStorage.isSupportFinger) {
            window.localStorage.removeItem('isSupportFinger')
          }
          window.localStorage.setItem('isSupportFinger', isSupportFinger)
          // window.localStorage.isSupportFinger = true;
          // 判断是否开启了指纹登录
          if (window.localStorage.isOpenFingerLogin && window.localStorage.username && window.localStorage.password) {
            window.plugins.touchid.verifyFingerprint(
              '通过Home键验证已有的手机指纹!', // this will be shown in the native scanner popup
              function (msg) {
                resolve(msg)
              },
              function (msg) {
                reject(msg)
              })
          } else {
            reject() // eslint-disable-line
          }
        }
        // 不支持指纹
        , function (msg) {
          isSupportFinger = false
          window.localStorage.isSupportFinger = isSupportFinger
          reject(msg)
        }
      )
    })
  },

  // 判断是否为首次登录
  isFirstTimeLogin: function (name) {
    if (window.localStorage.username) {
      if (window.localStorage.username !== name) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  },

  // 打开指纹登陆
  openFingerLogin: function () {
    return new Promise(function (resolve, reject) {
      if (vum.Platform.isIOS()) {
        window.plugins.touchid.isAvailable(function () {
          window.plugins.touchid.verifyFingerprint(
            '通过Home键验证已有的手机指纹!',
            function () {
              resolve()
            }, function () {
              reject() // eslint-disable-line
            }
          )
        }, function () {
          this.hlsPopup.showLongCenter('您的设配暂不支持指纹')
          reject() // eslint-disable-line
        })
      } else {
        Fingerprint.isAvailable(function (res) { // eslint-disable-line
          Fingerprint.show({  // eslint-disable-line
            clientId: 'com.car.rental.easy',
            clientSecret: 'a_very_secret_encryption_key', // Only necessary for Android
          }, successCallback, errorCallback)

          function successCallback (msg) {
            resolve(msg)
          }

          function errorCallback (err) {
            reject(err)
          }
        }, function (error) {
          this.hlsPopup.showLongCenter('您的设配暂不支持指纹')
          reject(error)
        })
      }
    })
  },

  /**
   * 判断平台
   * @return {String} 平台
   */
  detectOS: function () {
    const ua = navigator.userAgent.toLowerCase()

    if (/MicroMessenger/i.test(ua)) {
      return 'weixin'
    } else if (/iPhone|iPad|iPod|iOS/i.test(ua)) {
      return 'ios'
    } else if (/Android/i.test(ua)) {
      return 'android'
    } else {
      return 'other'
    }
  },

}
