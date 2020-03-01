import axios from 'axios'
import md5 from 'md5'

const MARVEL = axios.create({
  baseURL: process.env.REACT_APP_MARVEL_API,
  headers: {},
})

axios.defaults.params = {}
const requestInterceptors = [
  [
    function (config) {
      const timestamp = Date.now()
      const privateKey = process.env.REACT_APP_MARVEL_API_PRIVATE_KEY
      const publicKey = process.env.REACT_APP_MARVEL_API_PUBLIC_KEY

      config.params = {
        apikey: publicKey,
        ts: timestamp,
        hash: md5(`${timestamp}${privateKey}${publicKey}`),
        ...config.params,
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    },
  ],
]

requestInterceptors.forEach(interceptor => {
  MARVEL.interceptors.request.use(...interceptor)
})

export {
  MARVEL,
}
