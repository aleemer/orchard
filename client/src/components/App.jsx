import { useState, useEffect } from 'react'

/**
 * Necessary router imports
 */


/**
 * Services imports
 */
import browserServices from '../services/browser'
import personServices from '../services/person'
import basketServices from '../services/basket'
import login from '../services/login'

/**
 * Component imports
 */
import Login from './Login'
import Basket from './Basket'

const App = () => {
  const [person, setPerson] = useState(null)
  const [baskets, setBaskets] = useState([])

  /**
   * Basket-relevant functions
   */
  useEffect(() => {
    if (person) {
      syncBaskets(person.baskets)
    }
  }, [person])
  // Syncs baskets
  const syncBaskets = async (baskets) => {
    const data = await Promise.all(baskets.map(id => basketServices.getBasket(id)))
    setBaskets(data)
  }

  /**
   * Person-relevant functions
   */
  // Performs local storage check to auto-login on reload
  useEffect(() => {
    const storedPerson = browserServices.getPerson()
    if (storedPerson) {
      setPerson(storedPerson)
    }
  }, [])

  // Handles login, returns person if correct login
  const handleLogin = (person) => {
    login(person)
      .then((response) => {
        setPerson(response)
        browserServices.storePerson(response)
      })
      .catch((error) => console.log(error.response.data.error))
  }

  // Handles account creation, returns person if valid
  const handleCreate = (newPerson) => {
    personServices
      .addPerson(newPerson)
      .then((response) => {
        setPerson(response)
        browserServices.storePerson(response)
      })
      .catch((error) => console.log(error.response.data.error))
  }

  // Handles logout, sets person to null
  const handleLogout = () => {
    browserServices.removePerson()
    setPerson(null)
  }

  return (
    <div>
      <h1>Orchard</h1>
      <Login onLogin={handleLogin} onCreate={handleCreate} onLogout={handleLogout} person={person}/>
    </div>
  )
}

export default App