/**
 * Services imports
 */
import personServices from '../services/person'
import login from '../services/login'

import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    updatePerson(state, action) {
      state = action.payload
    }
  }
})

export const addPerson = (newPerson) => {
  return async dispatch => {
    const savedPerson = await personServices.addPerson(newPerson)
    dispatch(updatePerson(savedPerson))
  }
}

export const loginPerson = (person) => {
  return async dispatch => {
    const loginPerson = await login(person)
    dispatch(updatePerson(loginPerson))
  }
}

export const getPerson = (id) => {
  return async dispatch => {
    const person = await personServices.getPerson(id)
    dispatch(updatePerson(person))
  }
}

export default personSlice.reducer