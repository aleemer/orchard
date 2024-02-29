import axios from 'axios'
const baseURL = '/api/fruit'

const getFruit = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const getOneFruit = (fruitId) => {
  const request = axios.get(`${baseURL}/${fruitId}`)
  return request.then(response => response.data)
}

const addFruit = (newFruit, basketId) => {
  const request = axios.post(`${baseURL}/${basketId}`, newFruit)
  return request.then(response => response.data)
}

const removeFruit = (basketId, fruitId) => {
  const request = axios.delete(`${baseURL}/${fruitId}`, { data: { basketId } } )
  return request.then(response => response.data)
}

export default { getFruit, getOneFruit, addFruit, removeFruit }