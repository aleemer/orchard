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

// Necessary to make available 
export const { setPerson, logoutPerson, storeCookie, getCookie } = personSlice.actions

export default personSlice.reducer