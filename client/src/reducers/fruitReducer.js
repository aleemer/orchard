import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const fruitSlice = createSlice({
  name: 'baskets',
  initialState,
  reducers: {
    placeholder(state, action) {
      return action.payload
    }
  }
})

export const { placeholder } = fruitSlice.actions
export default fruitSlice.reducer