import authService from '../../api/auth'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const SIGNUP = 'LOGIN'
const SIGNUP_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

export default {
  state: {
    isLoggedIn: !!localStorage.getItem('token')
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [SIGNUP] (state) {

    },
    [SIGNUP_SUCCESS] (state) {

    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({commit}, creds) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    signup ({commit}, creds) {
      console.log(creds)
      commit(SIGNUP)
      authService.signup(creds).then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        commit(SIGNUP_SUCCESS)
      })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  }
}
