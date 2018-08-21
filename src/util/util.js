function getUrlParam (key) {
  let url = decodeURIComponent(window.location.href)
  let reg = new RegExp('\\?|&|' + key + '=([^&?#])*', 'i')
  var arr = url.match(reg)
  if (arr) {
    return arr[2]
  }
  return null
}

export default {
  getUrlParam
}
