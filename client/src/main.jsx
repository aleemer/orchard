/**
 * Imports necessary for React
 */
import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * Imports necessary for redux-toolkit
 */
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

/**
 * Importing reducers
 */
import personReducer from './reducers/personReducer'
import basketReducer from './reducers/basketReducer'
import fruitReducer from './reducers/fruitReducer'
// Store creation
const store = configureStore({
  reducer: {
    person: personReducer,
    baskets: basketReducer,
    fruit: fruitReducer
  }
})

/**
 * Router relevant imports
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

/**
 * Imports necessary for Components
 */
import App from './components/App'
import './index.css'

/**
 * Render App with first starting route
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="*" element={<App />}/>
    </Routes>
  </Router>
)
