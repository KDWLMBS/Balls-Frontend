import authService from '../../api/auth'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGINSUCCESS'
const SIGNUP = 'LOGIN'
const SIGNUP_SUCCESS = 'LOGINSUCCESS'
const LOGOUT = 'LOGOUT'

export default {
  state: {
    isLoggedIn: !!localStorage.getItem('token')
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn
  },
  actions: {
    login ({commit}, creds) {
      console.log(creds)
      commit(LOGIN)
      return authService.login(creds).then(res => {
        console.log('login response: ', res)
        localStorage.setItem('token', res.token)
        commit(LOGIN_SUCCESS)
        return Promise.resolve(true)
      }).catch(err => {
        console.log(err.message)
      })
    },
    signup ({commit}, creds) {
      console.log(creds)
      commit(SIGNUP)
      return authService.signup(creds).then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        commit(SIGNUP_SUCCESS)
      })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit(LOGOUT)
      return true
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
}
