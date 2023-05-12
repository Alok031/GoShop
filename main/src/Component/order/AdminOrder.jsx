import React from "react";
import axios from "../../api/axios";
import OrderCardAdmin from "./OrderCardAdmin";
import useAuth from "../../hooks/useAuth";

function AdminOrder(){
    const {auth} = useAuth();
    const id = auth?.foundAdmin?._id;
    const [orders,setOrders] = React.useState([]);

    React.useEffect(()=>{
        axios.get("/allorder/"+id)
        .then((res)=>{setOrders(res.data)}
        );
    },[]);

    return(<div className="Menu ms-5 me-5">
        {orders.slice(0).reverse().map((order,index)=>{
            return(<OrderCardAdmin
            username={order.username}
            key={index}
            id = {order._id}
            user={false}
            index={index+1}
            cart={order.cart}
            time = {order.ordertime}
            total = {order.total}
            // canteen_name = {order.canteen_name}
            // status = {order.status}
        />)
        })}
        
    </div>);
}

export default AdminOrder;