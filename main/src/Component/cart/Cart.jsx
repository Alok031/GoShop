import axios from '../../api/axios'
import React from 'react'
import CartCard from "./CartCard"
import useAuth from '../../hooks/useAuth'

const Cart = () => {
  const { auth } = useAuth();
  const userid = auth?.foundUser?._id;
  const username = auth?.foundUser?.Name;
  let orderTotal=0;
  const [cart,setCart] = React.useState([]);
  React.useEffect(() => {
    axios.get("/cart").then((res) => {
      setCart(res.data);
    })
    // console.log(item);
  },[])

  function remove(event,id) {
    setCart((prevCart) => {
      return prevCart.filter((cartItem,index) => {
        return index !== id;
      });
    });
    axios.delete("/cart/"+event.target.id).then(res => console.log(res.data));
    
  }

  function order(event){
    if(orderTotal > 0){
      axios.post("/order/"+userid+"/"+username+"/"+orderTotal,cart)
      .then(res=>console.log(res));
      setCart([]);
      axios.delete("/cart");
    }
    else{
      alert("Can't Place Empty Order");
    }
  }

  return (
    <div className='row'>{cart.map((item,index) => {
      orderTotal=orderTotal+item.total;
      return(<CartCard 
        key={index}
        index={index}
        id={item._id}
        product={item.product}
        type={item.type}
        quantity={item.quantity}
        price={item.price}
        total={item.total}
        remove={remove}
      />)
    })}
    
    <div className='qaz sticky-bottom'><p className='qwsa'>
    Total : <i className="fa fa-indian-rupee-sign" /> {" "+orderTotal}<hr/>
    </p> 
      
    <button className='asxz btn' onClick={order}>Order</button>
    {/* <Footer/> */}
    </div>
    </div>
  )
}

export default Cart
