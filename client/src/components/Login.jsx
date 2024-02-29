const Login = ({ onLogin, onCreate, onLogout, person }) => {
  // Handle either button click
  const handleSubmit = (e) => {
    e.preventDefault()
    // Grab relevant values
    const person = {
      name: e.target.name.value,
      password: e.target.password.value
    }
    // distinguish button click
    const clickType = e.nativeEvent.submitter.value
    if (clickType === 'login') {
      onLogin(person)
    } else {
      onCreate(person)
    }
  }

  return (
    <>
      {person ? 
      <div>
        <p><strong>{person.name}</strong> has logged in. </p>
        <button onClick={onLogout}>logout</button>
      </div>
      :
      <div>
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