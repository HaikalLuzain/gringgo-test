import Axios from 'axios'

const url = 'http://34.101.172.140:3005/api/propinsi'

export const API = Axios.create({
  baseURL: `${url}/`
})

API.interceptors.response.use(
  (succes) => succes,
  (err) => {
    if (err.response && err.response.data) {
      // if (
      //   err.response.status === 401 &&
      //   document.location.pathname !== '/login'
      // ) {
      //   localStorage.clear()
      //   document.location.pathname = '/login'
      // }
      // eslint-disable-next-line
      throw { ...err.response.data, code: err.response.status }
    }
    throw err
  }
)

export const Api = () => {
  return API
}