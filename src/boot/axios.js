import axios from 'axios'
import { Notify } from 'quasar'

export default async ({
  app, router, Vue
}) => {
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
    // withCredentials: true,
  })
  Vue.prototype.$axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 403) {
      Notify.create({
        color: 'yellow',
        textColor: 'black',
        position: 'bottom-right',
        message: 'Sorry, Permission denied!',
        closeBtn: 'close'
      })
      // console.log(this)
      router.go(-1)
    } else if (error.response.status === 401) {
      Notify.create({
        color: 'yellow',
        textColor: 'black',
        position: 'bottom-right',
        message: 'Invalid Credentials!',
        closeBtn: 'close'
      })
    } else {
      return Promise.reject(error)
    }
  })
}
