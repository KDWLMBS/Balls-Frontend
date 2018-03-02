import axios from 'axios'

const url = 'http://localhost:9090/api/pattern'

export default {
  readAll: () => {
    return axios.get(`${url}/all`)
  },
  readOne: (args) => {
    return axios.get(`${url}/${args._id}`)
  },
  create: (args) => {
    return axios.post(`${url}/${args._id}`, args)
  },
  update: (args) => {
    return axios.put(`${url}/${args._id}`, args)
  },
  delete: (args) => {
    return axios.delete(`${url}/${args._id}`)
  },
  play: (args) => {
    return axios.post(`${url}/play/${args._id}`)
  }
}
