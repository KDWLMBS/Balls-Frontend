import axios from 'axios'

const BASE_URL = `http://localhost:9090/api/auth`

export default () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      authorization: localStorage.getItem('token')
    }
  })
}
