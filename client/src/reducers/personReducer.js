import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    placeholder(state, action) {
      return action.payload
    }
  }
})

export const { placeholder } = personSlice.actions
export default personSlice.reducer