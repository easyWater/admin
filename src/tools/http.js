import Vue from 'vue'
import axios from 'axios'
import Qs from 'Qs'
import { Message } from 'iview'
import store from '../vuex/store'
import router from '../router/router'

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么    
    config.headers.token = '149b116f87ec48d5ab89b7211e3fa59f'
    // config.headers.token = store.getters.getToken
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
      baseURL: Vue.prototype.$baseUrl,
      timeout: 2500,
      url,
      method: type || 'post',
      params,
      data,
      withCredentials,
      transformRequest: [
        function(data) {
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
        }else if(res.data.code === 400004) { //登录超时
          Message.error('登录失效,请重新登录')
          router.push('/login')
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
