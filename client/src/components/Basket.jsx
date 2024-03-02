/**
 * Necessary react imports
 */
import { useState, useEffect } from 'react'

/**
 * Necessary Redux imports
 */
import { useDispatch, useSelector } from 'react-redux'
import { setFruits, initializeFruits, addFruit } from '../reducers/fruitReducer'


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
      dispatch(initializeFruits(basket.id))
    } else {
      dispatch(setFruits([]))
    }
  }, [basket]) // forces re-sync when data sent in changes

  // Adds another fruit
  const pickFruit = (e) => {
    e.preventDefault()
    // Grab relevant values
    const name = e.target.fruit.value
    e.target.fruit.value = ''
    const newFruit = { name, sweet: true }
    dispatch(addFruit(basket.id, newFruit))
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