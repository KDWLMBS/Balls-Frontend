import axios from 'axios'

const url = 'http://localhost:9090/api/auth'

export default {
  login: () => {
    console.log('login')
  },
  signup: (args) => {
    return axios.post('http://localhost:9090/api/auth/signup', args)
  }
}
