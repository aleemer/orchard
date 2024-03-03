import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const basketSlice = createSlice({
  name: 'baskets',
  initialState,
  reducers: {
    setBaskets (state, action) {
      return action.payload
    },
    appendBasket (state, action) {
      return state.concat(action.payload)
    },
    removeBasket (state, action) {
      const id = action.payload.basketId
      return state.filter(basket => basket.id !== id)
    }
  }
})

// Necessary to make available 
export const { setBaskets, appendBasket, removeBasket } = basketSlice.actions
export default basketSlice.reducer