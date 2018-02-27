import axios from 'axios'

const url = 'http://localhost:9090/api/auth'

export default {
  login: (args) => {
    return axios.post(`${url}/login`, args)
  },
  signup: (args) => {
    return axios.post(`${url}/signup`, args)
  }
}
