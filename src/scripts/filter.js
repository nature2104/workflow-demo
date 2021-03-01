export default (Vue) => {
  Vue.filter('currency', function (val) {
    if (!val) return '0.00'

    var intPart = parseInt(Number(val)) // 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    var floatPart = '.00' // 预定义小数部分
    var value2Array = (val + '').split('.')

    // =2表示数据有小数位
    if (value2Array.length === 2) {
      floatPart = value2Array[1].toString() // 拿到小数部分

      if (floatPart.length === 1) { // 补0,实际上用不着
        return intPartFormat + '.' + floatPart + '0'
      } else {
        return intPartFormat + '.' + floatPart
      }
    } else {
      return intPartFormat + floatPart
    }
  })
  Vue.filter('uncurrency', function (val) {
    if (!val) return null
    return Number((val).replace(/,/gi, ''))
  })
  Vue.filter('datetime', timestamp => {
    function format (number) {
      return number.toString().padStart(2, '0')
    }
    const date = new Date(Number.parseInt(timestamp, 10))
    const YYYY = date.getFullYear()
    const MM = date.getMonth() + 1
    const DD = date.getDate()
    const hh = date.getHours()
    const mm = date.getMinutes()
    const ss = date.getSeconds()
    return `${YYYY}-${format(MM)}-${format(DD)} ${format(hh)}:${format(mm)}:${format(ss)}`
  })
}
