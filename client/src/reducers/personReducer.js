import { createSlice } from '@reduxjs/toolkit'

/**
 * Services imports
 */
import browserServices from '../services/browser'
import personServices from '../services/person'
import login from '../services/login'


const initialState = null

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson (state, action) {
      return action.payload
    },
    logoutPerson (state, action) {
      browserServices.removePerson()
      return null
    },
    storeCookie (state, action) {
      browserServices.storePerson(action.payload)
      return state
    },
    getCookie (state, action) {
      const person = browserServices.getPerson()
      if (person) {
        return person
      }
    }
  }
})

// Necessary to make available for thunk actions
export const { setPerson, logoutPerson, storeCookie, getCookie } = personSlice.actions

// Redux-thunk action that creates a person, and updates store
export const addPerson = (person) => {
  return async dispatch => {
    const savedPerson = await personServices.addPerson(person)
    dispatch(setPerson(savedPerson))
    dispatch(storeCookie(savedPerson))
  }
}

// Redux-thunk action that performs a login, and updates store
export const loginPerson = (person) => {
  return async dispatch => {
    const loginPerson = await login(person)
    dispatch(setPerson(loginPerson))
    dispatch(storeCookie(loginPerson))
  }
}

// Redux-thunk action for fetching person (if needed, performs update)
export const fetchPerson = (personId) => {
  return async dispatch => {
    const fetchPerson = await personServices.getPerson(personId)
    dispatch(setPerson(fetchPerson))
  }
}


export default personSlice.reducer