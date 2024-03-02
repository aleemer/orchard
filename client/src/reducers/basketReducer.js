import { createSlice } from '@reduxjs/toolkit'

/**
 * Services imports
 */
import personServices from '../services/person'
import basketServices from '../services/basket'

const initialState = []

const basketSlice = createSlice({
  name: 'baskets',
  initialState,
  reducers: {
    setBaskets (state, action) {
      return state
    },
    appendBasket (state, action) {
      return state.concat(action.payload)
    },
    removeBasket (state, action) {
      const id = action.payload.basketId
      return state.map(basket => basket.id !== id)
    }
  }
})

// Necessary to make available for thunk actions
export const { setBaskets } = basketSlice.actions

// Redux-thunk action that initializes baskets (on login)
export const initializeBaskets = (personId) => {
  return async dispatch => {
    const basketIds = (await personServices.getPerson(personId)).baskets
    const data = await Promise.all(basketIds.map(id => basketServices.getBasket(id)))
    setBaskets(data)
  }
}

// Redux-thunk action that creates a basket, and updates store
export const makeBasket = (personId, newBasket) => {
  return async dispatch => {
    const savedBasket = await basketServices.addBasket(personId, newBasket)
    dispatch(appendBasket(savedBasket))
  }
}

// Redux-thunk action that deletes a basket, and updates store
export const removeBasket = (personId, basketId) => {
  return async dispatch => {
    await basketServices.removeBasket(personId, basketId)
    dispatch(removeBasket(basketId))
  }
}

export default basketSlice.reducer