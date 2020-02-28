import axios from 'axios'
export function login(payload) {
  return axios.post('/api/login', payload).then(res => {
    return {
      code: res.data.code,
      userInfo: res.data.data
    }
  })
}