import axios from 'axios'
import { Notify } from 'quasar'

export default async ({
  app, router, Vue
}) => {
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://eposapi.test/api/v1/',
    // withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  Vue.prototype.$axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    if (error.response.status === 401) {
      Notify.create({
        color: 'yellow',
        textColor: 'black',
        position: 'top-right',
        message: 'Permission Denied!',
        closeBtn: 'close'
      })
      console.log(this)
      // router.push('/login')
    } else {
      return Promise.reject(error)
    }
  })
}
