/**
 * Necessary react imports
 */
import { useState, useEffect } from 'react'

/**
 * Services imports
 */
import fruitServices from '../services/fruit'

/**
 * Component imports
 */
import Fruit from './Fruit'

const Basket = ({ basket }) => {
  const [fruits, setFruits] = useState([])
  
  /**
   * Fruit-relevant functions
   */
  useEffect(() => {
    syncFruits(basket.fruits)
  }, [basket]) // forces re-sync when data sent in changes
  // Syncs fruits
  const syncFruits = async (fruits) => {
    const data = await Promise.all(fruits.map(id => fruitServices.getOneFruit(id)))
    setFruits(data)
  }
  
  return (
    <div>
      <p>Here's the contents of <strong>{basket.name}</strong></p>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <p>{fruit.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Basket