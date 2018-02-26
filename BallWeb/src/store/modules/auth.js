const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
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
      stare.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login({commit}, creds) {
      commit(LOGIN)
      return new Promise(resolve => {
        setTimeout(() => {
          localStorage.setItem('token', 'JWT')
          commit(LOGIN_SUCCESS)
          resolve()
        }, 1000)
      })
    },
    logout({commit}) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  }
}
