const Fruit = ({ fruit }) => {
  return (
    <li key={fruit.id}>
      <p>{fruit.name}</p>
    </li>
  )
}

export default Fruit