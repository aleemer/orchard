import axios from 'axios'
const baseURL = '/api/login'

const login = (person) => {
  const request = axios.post(baseURL, person)
  return request.then(response => response.data)
}

export default login