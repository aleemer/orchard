/**
 * Local storage helper functions
 */

const storePerson = (person) => {
  localStorage.setItem("person", JSON.stringify(person))
}

const getPerson = () => {
  return JSON.parse(localStorage.getItem("person"))
}

const removePerson = () => {
  localStorage.removeItem("person")
}

export default { storeUser, getUser, removeUser }