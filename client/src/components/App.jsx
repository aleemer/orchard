/**
 * Necessary react imports
 */
import { useEffect } from 'react'

/**
 * Necessary router imports
 */
import { Routes, Route, Link } from 'react-router-dom'

/**
 * Necessary Redux imports
 */
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from '../reducers/personReducer'
import { setBaskets, initializeBaskets, weaveBasket, removeBasket } from '../reducers/basketReducer'

/**
 * Component imports
 */
import Login from './Login'
import Basket from './Basket'

const App = () => {
  const dispatch = useDispatch()
  const person = useSelector((store) => store.person)
  const baskets = useSelector((store) => store.baskets)

  /**
   * First-load checks
   */
  // Performs local storage check to auto-login on reload
  useEffect(() => {
    dispatch(getCookie())
  }, [])
  // Initializes baskets if person is logged in
  useEffect(() => {
    if (person) {
      dispatch(initializeBaskets(person.id))
    } else {
      dispatch(setBaskets([]))
    }
  }, [person])

  
  // Makes a basket
  const makeBasket = (e) => {
    e.preventDefault()
    // Grab relevant values
    const name = e.target.basket.value
    dispatch(weaveBasket(person.id, { name }))
  }

  // Removes a basket
  const disposeBasket = (e, basketId) => {
    e.preventDefault()
    dispatch(removeBasket(person.id, basketId))
  }

  

  return (
    <div>
      <h1>Orchard</h1>
      <Login person={person}/>
      {person && (
        <div>
          <h2>Your Baskets: </h2>
          <ul>
            {baskets.map((basket) => (
              <li key={basket.id}>
                <Link to={`/basket/${basket.id}`}>
                  <h3>{basket.name}</h3>
                </Link>
                <button onClick={(e) => disposeBasket(e, basket.id)}>dispose</button>
              </li>
            ))}
          </ul>

          <form onSubmit={makeBasket}>
            <div><input placeholder="make a basket..." name="basket"/></div>
            <button type="submit">make!</button>
          </form>

          {/** Routes for redirect */}
          <Routes>
            {baskets.map((basket) => (
              <Route key={basket.id} path={`/basket/${basket.id}`} element={<Basket basket={basket}/>} />
            ))}
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App