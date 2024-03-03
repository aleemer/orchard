/**
 * Services imports
 */
import personServices from '../services/person'
import login from '../services/login'

/**
 * Necessary Redux imports
 */
import { useDispatch } from 'react-redux'
import { setPerson, logoutPerson, storeCookie } from '../reducers/personReducer'

const Login = ({ person }) => {
  // For dispatching actions
  const dispatch = useDispatch()

  // Handle either button click
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Grab relevant values
    const person = {
      name: e.target.name.value,
      password: e.target.password.value
    }
    // distinguish button click
    const clickType = e.nativeEvent.submitter.value
    if (clickType === 'login') {
      const loginPerson = await login(person)
      dispatch(setPerson(loginPerson))
      dispatch(storeCookie(loginPerson))
    } else {
      const savedPerson = await personServices.addPerson(person)
      dispatch(setPerson(savedPerson))
      dispatch(storeCookie(savedPerson))
    }
  }

  return (
    <>
      {person ? 
      <div>
        <p><strong>{person.name}</strong> has logged in. </p>
        <button onClick={(e) => dispatch(logoutPerson())}>logout</button>
      </div>
      :
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div><input placeholder="name" name="name"/></div>
          <div><input placeholder="password" name="password" type="password"/></div>
          <div>
            <button type="submit" name="submitType" value="login">login</button>
            <button type="submit" name="submitType" value="create">create</button>
          </div>
        </form>
      </div>
      }
    </>
  )
}

export default Login