/**
 * Necessary Redux imports
 */
import { useDispatch } from 'react-redux'
import { removeFruit } from '../reducers/fruitReducer'

/**
 * Services imports
 */
import fruitServices from '../services/fruit'


const Fruit = ({ basket, fruit }) => {
  const dispatch = useDispatch()

  const handleToss = async (e) => {
    e.preventDefault()
    await fruitServices.removeFruit(basket.id, fruit.id)
    dispatch(removeFruit(fruit.id))
  }

  return (
    <li key={fruit.id}>
      <p>
        {fruit.name} 
        <button onClick={(e) => handleToss(e)}>toss</button>
      </p>
    </li>
  )
}

export default Fruit