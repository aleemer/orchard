/**
 * Necessary react imports
 */
import { useEffect } from 'react'

/**
 * Necessary Redux imports
 */
import { useDispatch, useSelector } from 'react-redux'
import { setFruits, appendFruit } from '../reducers/fruitReducer'

/**
 * Services imports
 */
import basketServices from '../services/basket'
import fruitServices from '../services/fruit'

/**
 * Component imports
 */
import Fruit from './Fruit'

const Basket = ({ basket }) => {
  const dispatch = useDispatch()
  const fruits = useSelector((store) => store.fruit)
  
  /**
   * First-load checks
   */
  // Initializes fruit if basket is available
  useEffect(() => {
    if (basket) {
      syncFruits()
    } else {
      dispatch(setFruits([]))
    }
  }, [basket]) // forces re-sync when data sent in changes
  const syncFruits = async () => {
    const fruitIds = (await basketServices.getBasket(basket.id)).fruits
    const data = await Promise.all(fruitIds.map(id => fruitServices.getOneFruit(id)))
    dispatch(setFruits(data))
  }

  // Adds another fruit
  const pickFruit = async (e) => {
    e.preventDefault()
    // Grab relevant values
    const name = e.target.fruit.value
    e.target.fruit.value = ''
    const newFruit = { name, sweet: true }
    const savedFruit = await fruitServices.addFruit(basket.id, newFruit)
    dispatch(appendFruit(savedFruit))
  }
  
  return (
    <div>
      <p>Here's the contents of <strong>{basket.name}</strong></p>
      <ul>
        {fruits.map((fruit) => (
          <Fruit key={fruit.id} basket={basket} fruit={fruit} />
        ))}
      </ul>
      <form onSubmit={pickFruit}>
        <div><input placeholder="pick me..." name="fruit"/></div>
        <button type="submit">pick!</button>
      </form>
    </div>
  )
}

export default Basket