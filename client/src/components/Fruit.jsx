const Fruit = ({ fruit, onToss }) => {
  return (
    <li key={fruit.id}>
      <p>
        {fruit.name} 
        <button onClick={(e) => onToss(e, fruit.id)}>toss</button>
      </p>
    </li>
  )
}

export default Fruit