import { createSlice } from '@reduxjs/toolkit'

/**
 * Services imports
 */
import basketServices from '../services/basket'
import fruitServices from '../services/fruit'

const initialState = []

const fruitSlice = createSlice({
  name: 'fruits',
  initialState,
  reducers: {
    setFruits (state, action) {
      return action.payload
    },
    appendFruit (state, action) {
      return state.concat(action.payload)
    },
    removeFruit (state, action) {
      const id = action.payload.fruitId
      return state.filter(fruit => fruit.id !== id)
    }
  }
})

// Necessary to make availble for thunk actions
export const { setFruits, appendFruit, removeFruit } = fruitSlice.actions

// Redux-thunk action that initializes fruits (on-click to page)
const initializeFruits = (basketId) => {
  return async dispatch => {
    const fruitIds = (await basketServices.getBasket(basketId))
    const data = await Promise.all(fruitIds.map(id => fruitServices.getOneFruit(id)))
    dispatch(setFruits(data))
  }
}

// Redux-thunk action that creates a fruit, and updates store
const addFruit = (basketId, newFruit) => {
  return async dispatch => {
    const savedFruit = await fruitServices.addFruit(basketId, newFruit)
    dispatch(appendFruit(savedFruit))
  }
}

// Redux-thunk action that removes a fruit, and updates store
const tossFruit = (basketId, fruitId) => {
  return async dispatch => {
    await fruitServices.removeFruit(basketId, fruitId)
    dispatch(removeFruit(fruitId))
  }
}

// Redux-thunk action that creates 
export default fruitSlice.reducer