import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // modules: {
    //   example
    // },
    state: {
      isLoggedIn: false,
      token: '',
      user: {},
      pageTitle: ''
    },
    getters: {
      user: state => state.user,
      isLoggedIn: state => state.isLoggedIn,
      token: state => state.token,
      pageTitle: state => state.pageTitle
    },
    mutations: {
      login (state, payload) {
        state.isLoggedIn = true
        state.token = payload
        localStorage.setItem('token', payload)
      },
      token (state, payload) {
        state.token = payload
      },
      logout (state) {
        state.isLoggedIn = false
        state.token = null
        state.user = null
        localStorage.removeItem('token')
        // console.log('logout successful.')
      },
      user (state, payload) {
        state.user = payload
      },
      pageTitle (state, payload) {
        state.pageTitle = payload
      }
    },
    actions: {
      login (context, payload) {
        context.commit('login', payload)
      },
      logout (context) {
        context.commit('logout')
      },
      token (context, payload) {
        context.commit('token', payload)
      },
      user (context, payload) {
        context.commit('user', payload)
      },
      pageTitle (context, payload) {
        context.commit('pageTitle', payload)
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
