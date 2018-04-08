import axios from 'axios'

const url = 'http://localhost:9090/api/pattern'

const axiosConfig = {
  headers: {
    'authorization': localStorage.getItem('token') // store.token .. else if token is deleted while running there might be some issues
  }
}

export default {
  readAll: () => {
    return axios.get(`${url}/all`, axiosConfig)
      .then(res => {
        console.log('res', res)
        if (res.data && res.data.message) {
          console.log(res.data.message)
          return Promise.reject(res.data.message)
        }
        return Promise.resolve(res.data)
      }).catch(err => {
        console.log(err)
        return Promise.reject(err.message)
      })
  },
  readOne: (args) => {
    return axios.get(`${url}/${args._id}`, axiosConfig)
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  create: (args) => {
    return axios.put(`${url}`, args, axiosConfig)
  },
  update: (args) => {
    return axios.post(`${url}/${args._id}`, args, axiosConfig)
  },
  delete: (args) => {
    return axios.delete(`${url}/${args._id}`, axiosConfig)
      .then(res => {
        return Promise.resolve(res.data)
      })
  },
  play: (args) => {
    return axios.post(`${url}/play/${args._id}`, axiosConfig)
  }
}
