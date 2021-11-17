/**
 * ajax請求函數模塊
 * 返回值：promise對象
 */
import axios from 'axios'

export default function ajax (url, data={}, type='GET') {

  return new Promise(function (resolve, reject) {
    // 執行異步ajax請求
    let promise
    if (type === 'GET') {
      // 准備url query參數數據
      let dataStr = '' // 數據拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 發送get請求
      promise = axios.get(url)
    } else {
      // 發送post請求
      promise = axios.post(url, data)
    }
    
    promise.then(function (response) {
      // 成功了調用resolve()
      resolve(response.data)
    }).catch(function (error) {
      // 失敗了調用reject()
      reject(error)
    })
  })
}