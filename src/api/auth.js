import axios from 'axios'

const url = 'http://localhost:9090/api/auth'

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
  }
}
