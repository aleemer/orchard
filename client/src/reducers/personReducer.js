import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    addPerson(state, action) {
      state = action.payload
    },
    login(state, action) {
      state = action.payload
    },
    getPerson(state, action) {
      state = action.payload
    }
  }
})

export const { addPerson, login, getPerson } = personSlice.actions
export default personSlice.reducer