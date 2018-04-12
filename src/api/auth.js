import axios from 'axios'
import store from '../store/index'

const url = `${process.env.SERVER_IP}/api/auth`

const config = () => {
  console.log(store)
  return {
    headers: {
      'authorization': store.getters.token
    }
  }
}

export default {
  login: (args) => {
    return axios.post(`${url}/login`, args)
      .then(res => {
        if (res.data && (!res.data.token || !res.data.user)) {
          console.log(res.data.message)
          return Promise.reject(res.data.message)
        }
        return Promise.resolve(res.data)
      })
  },
  signup: (args) => {
    return axios.post(`${url}/signup`, args)
      .then(res => {
        if (res.data && (!res.data.token || !res.data.user)) {
          console.log(res.data.message)
          return Promise.reject(res.data.message)
        }
        return Promise.resolve(res.data)
      })
  },
  me: (args) => {
    return axios.get(`${url}/me`, config())
      .then(res => {
        if (res.data && (!res.data.user)) {
          console.log(res.data.message)
          return Promise.reject(res.data.message)
        }
        return Promise.resolve(res.data.user)
      })
  }
}
