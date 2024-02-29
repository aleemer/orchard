/**
 * Necessary react imports
 */
import { useState, useEffect } from 'react'

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
  const [fruits, setFruits] = useState([])
  
  /**
   * Fruit-relevant functions
   */
  useEffect(() => {
    syncFruits()
  }, [basket]) // forces re-sync when data sent in changes
  // Syncs fruits
  const syncFruits = async () => {
    const fruitIds = (await basketServices.getBasket(basket.id)).fruits                   // Need updated fruit ids (might have tossed or picked)
    const data = await Promise.all(fruitIds.map(id => fruitServices.getOneFruit(id)))     // Fetch all the fruits
    setFruits(data)
  }
  // Adds another fruit
  const pickFruit = (e) => {
    e.preventDefault()
  }
  // Removes an existing fruit
  const tossFruit = (e, fruitId) => {
    e.preventDefault()
    fruitServices
      .removeFruit(basket.id, fruitId)
      .then(() => syncFruits())
      .catch((error) => console.log(error))
  }
  
  return (
    <div>
      <p>Here's the contents of <strong>{basket.name}</strong></p>
      <ul>
        {fruits.map((fruit) => (
          <Fruit key={fruit.id} fruit={fruit} onToss={tossFruit} />
        ))}
      </ul>
    </div>
  )
}

export default Basket