import authService from '../../api/auth'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const TOKEN = 'TOKEN'
const USER = 'USER'

export default {
  state: {
    user: {},
    token: null
  },
  getters: {
    isLoggedIn (state) {
      return (state.user && state.token)
    }
  },
  actions: {
    me ({commit}) {
      if (!localStorage.getItem('token')) return

      return authService.me().then(res => {
        console.log('me response: ', res)
        commit(USER, res)
        commit(TOKEN, localStorage.getItem('token'))
        return Promise.resolve()
      }).catch(err => {
        console.log(err)
        return Promise.reject(err)
      })
    },
    login ({commit}, creds) {
      console.log(creds)
      return authService.login(creds).then(res => {
        console.log('login response: ', res)
        commit(USER, res.user)
        commit(TOKEN, res.token)
        return Promise.resolve()
      }).catch(err => {
        console.log(err)
        return Promise.reject(err)
      })
    },
    signup ({commit}, creds) {
      console.log(creds)
      return authService.signup(creds)
        .then(res => {
          console.log(res)
          commit(USER, res.user)
          commit(TOKEN, res.token)
          return Promise.resolve()
        }).catch(err => {
          console.log(err)
          return Promise.reject(err)
        })
    },
    logout ({commit}) {
      commit(LOGOUT)
    }
  },
  mutations: {
    [LOGIN] (state) {
      state.isLoggedIn = true
    },
    [TOKEN] (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    [USER] (state, user) {
      state.user = user
    },
    [LOGOUT] (state) {
      state.user = {}
      state.token = null
      localStorage.removeItem('token')
    }
  }
}
