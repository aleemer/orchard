/**
 * Imports necessary for React
 */
import React from 'react'
import ReactDOM from 'react-dom/client'

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
