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

  console.log(basket)
  
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
  // Adds another fruit
  const pickFruit = (e) => {
    e.preventDefault()
  }
  // Removes an existing fruit
  const tossFruit = (e, fruitId) => {
    console.log('basket id', basket.id)
    console.log('fruit id', fruitId)

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