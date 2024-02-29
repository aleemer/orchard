import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const basketSlice = createSlice({
  name: 'baskets',
  initialState,
  reducers: {
    placeholder(state, action) {
      return action.payload
    }
  }
})

export const { placeholder } = basketSlice.actions
export default basketSlice.reducer