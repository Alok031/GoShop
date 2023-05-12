import React from 'react'
import OrderCard from './OrderCard'
import axios from '../../api/axios'
import useAuth from "../../hooks/useAuth";

const Order = () => {

  const { auth } = useAuth()
  const userid = auth?.foundUser?._id;
    const [orders,setOrder] = React.useState([])

    React.useEffect(() => {
      axios.get("/viewOrder/"+userid).then((res)=>{
        setOrder(res.data)
      })
      
    })
  return (
    <div className='mb-2 card  text-white'>
      {orders.map((order,index) => {
              return(<OrderCard
                key={index}
                index={index+1}
                id={order._id}
                user={false}
                username={order.username}
                cart={order.cart}
                time={order.ordertime}
                total={order.total}
              />)
             })}    
    </div>
  )
}

export default Order
