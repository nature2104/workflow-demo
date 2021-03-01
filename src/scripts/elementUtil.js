export default{
  createElement: function (marker, tag) {
    let el = document.createElement(tag || 'div')
    el.setAttribute(marker, '')
    document.body.appendChild(el)
  },

  removeElement: function (marker) {
    let el = document.querySelector(marker) || document.querySelector(`[${marker}]`)
    if (el) { document.body.removeChild(el) }
  },
  timeout: function (duration = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration)
    })
  },
}
