import axios from 'axios'
const baseURL = '/api/baskets'

const getBaskets = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const getBasket = (basketId) => {
  const request = axios.get(`${baseURL}/${basketId}`)
  return request.then(response => response.data)
}

const addBasket = (newBasket, personId) => {
  const request = axios.post(`${baseURL}/${personId}`, newBasket)
  return request.then(response => response.data)
}

const removeBasket = (personId, basketId) => {
  const request = axios.delete(`${baseURL}/${basketId}`, { data: { personId } })
  return request.then(response => response.data)
}

export default { getBaskets, getBasket, addBasket, removeBasket }