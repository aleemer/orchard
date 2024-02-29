const Basket = ({ basket }) => {
  console.log(basket)
  
  return (
    <div>
      <p>Here's the contents of {basket.name} </p>
    </div>
  )
}

export default Basket