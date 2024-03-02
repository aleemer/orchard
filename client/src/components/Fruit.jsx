/**
 * Necessary Redux imports
 */
import { useDispatch } from 'react-redux'
import { tossFruit } from '../reducers/fruitReducer'


const Fruit = ({ basket, fruit }) => {
  const dispatch = useDispatch()

  return (
    <li key={fruit.id}>
      <p>
        {fruit.name} 
        <button onClick={(e) => dispatch(tossFruit(basket.id, fruit.id))}>toss</button>
      </p>
    </li>
  )
}

export default Fruit