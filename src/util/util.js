function getUrlParam (key) {
  let url = decodeURIComponent(window.location.href)
  let reg = new RegExp('\\?|&|' + key + '=([^&?#])*', 'i')
  var arr = url.match(reg)
  if (arr) {
    return arr[2]
  }
  return null
}

function timeTick (timeDelta) {
  let timeDeltaSec = Math.floor(timeDelta / 1000)
  let hours = Math.floor(timeDeltaSec / 3600)
  let minutes = Math.floor((timeDeltaSec - hours * 3600) / 60)
  let seconds = timeDeltaSec - hours * 3600 - minutes * 60
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return {
    hours,
    minutes,
    seconds
  }
}
export default {
  getUrlParam,
  timeTick
}
