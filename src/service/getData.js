import axios from 'axios'
import {ERR_OK} from '../config/statusCode'

export async function getData (url, params = {}) {
  let res = await axios.get(url, {
    params
  })
  let data = res.data
  if (data.code === ERR_OK) {
    return data
  }
}
