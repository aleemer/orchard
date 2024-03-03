import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const fruitSlice = createSlice({
  name: 'fruit',
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

// Necessary to make availble 
export const { setFruits, appendFruit, removeFruit } = fruitSlice.actions
export default fruitSlice.reducer