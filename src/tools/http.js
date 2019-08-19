import axios from 'axios'
import Qs from 'Qs'
import { Message } from 'iview'

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么    
    config.headers.token = '149b116f87ec48d5ab89b7211e3fa59f'
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // console.log('config:', config)
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

const http = ({ url, type, params, data, withCredentials }) => {
  return new Promise((resolve, reject) => {
    axios({
      // baseURL: 'http://192.168.1.103:8882',
      baseURL: 'http://47.106.79.168:10002',
      timeout: 2500,
      url,
      method: type || 'get',
      params,
      data,
      withCredentials,
      transformRequest: [
        function(data) {
          // const params = new URLSearchParams
          // for (let it in data){
          //   params.append(it, data[it]);
          // } 
          // console.log('params', params, 'Qs', Qs.stringify(data))
          // 对 data 进行JSON字符串转换
          //   console.log('data', data, 'JSON', JSON.stringify(data), 'Qs', Qs.stringify(data))
          // console.log('Qs.stringify(data)', Qs.stringify(data))
          return Qs.stringify(data)
        }
      ],
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        if (res.data.code === 200) {
          resolve(res.data)
        } else {
          Message.error(res.data.message);
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default http
