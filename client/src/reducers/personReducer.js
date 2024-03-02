/**
 * Services imports
 */
import browserServices from '../services/browser'
import personServices from '../services/person'
import login from '../services/login'

import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson (state, action) {
      return action.payload
    },
    logoutPerson (state, action) {
      return null
    },
    storeCookie (state, action) {
      browserServices.storePerson(action.payload)
      return state
    },
    getCookie (state, action) {
      return browserServices.getPerson()
    },
  }
})

// Necessary to make available for thunk actions
export const { setPerson, logoutPerson, storeCookie, getCookie } = personSlice.actions

// Redux-thunk action that creates a person, and updates store
export const addPerson = (person) => {
  return async dispatch => {
    const savedPerson = await personServices.addPerson(person)
    dispatch(setPerson(savedPerson))
  }
}

// Redux-thunk action that performs a login, and updates store
export const handleLogin = (person) => {
  return async dispatch => {
    const loginPerson = await login(person)
    dispatch(setPerson(loginPerson))
  }
}

// Redux-thunk action for fetching person (necessary after creations)
export const fetchPerson = (personId) => {
  return async dispatch => {
    const fetchPerson = await personServices.getPerson(personId)
    dispatch(setPerson(fetchPerson))
  }
}


export default personSlice.reducer