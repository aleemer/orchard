const express = require('express')
const basketRouter = express.Router()

/**
 * Import mongoose models
 */
const Basket = require('../models/basket')
const Fruit = require('../models/fruit')

/**
 * @receives a GET request to the URL: http://localhost:3001/api/basket/about
 * @returns a basic message
 */
basketRouter.get('/about', async (request, response) => {
  response.json({
    message: 'First endpoint for baskets router'
  })
})

/**
 * @receives a request to the URL: http://localhost:3001/api/basket
 * @returns bulk baskets list as a JSON
 */
basketRouter.get('/', async (request, response) => {
  const baskets = await Basket.find({})
  response.json(baskets)
})

/**
 * @receives a GET:id request to the URL: http://localhost:3001/api/basket/:id
 * @returns a specific basket 
 */
basketRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const basket = await Basket.findById(id)
  response.json(basket)
})

/**
 * @receives a POST request to the URL: http://localhost:3001/api/basket
 * @returns the newly created basket
 */
basketRouter.post('/', async (request, response) => {
  // Get fields
  const { name } = request.body
  // Error handling
  if (!name) {
    return response.status(400).send({
      error: 'missing content in body'
    })
  }
  // Create new basket
  const basket = new Basket({
    name
  })
  // Update baskets and return resource
  const basketResponse = await basket.save()
  response.status(201).send(basketResponse)
})

/**
 * @receives a DELETE request to the URL: http://localhost:3001/api/basket/:id
 * Note: The :id required is the id of the BASKET we want to delete
 * @returns an appropriate status code
 */
basketRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  // Get fruits to delete
  const fruits = (await Basket.findById(id)).fruits.map(id => id.toJSON())
  // Perform deletions
  await Basket.findByIdAndDelete(id)
  await Promise.all(fruits.map(id => Fruit.findByIdAndDelete(id)))
  response.status(200).send()
})

module.exports = basketRouter