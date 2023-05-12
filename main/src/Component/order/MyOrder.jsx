import React from "react";
import Navbar from "../Navbar";
import useAuth from "../../hooks/useAuth";
import Order from "./Order";
import MyWallet from '../Wallet/MyWallet'
import Address from '../address/Address'
import "./order.css"

const MyOrder = () => {

  const { auth } = useAuth()
  const userName = auth?.foundUser?.Name;
  const email = auth?.foundUser?.Email
  const [isActive,setIsActive] = React.useState("order")
  const [option,setOption] = React.useState(<Order />)

  function handleClick(event) {
    setIsActive(event.target.id);
    if (event.target.id === "order") {
        setOption(<Order />);
    } else if (event.target.id === "wallet") {
        setOption(<MyWallet />);
        } else if (event.target.id === "address") {
            setOption(<Address />);
          }
        }

  return (
<>
    <Navbar/>
    <div className="container h-100">
      <div className="contatiner h-100 d-flex mt-5 justify-content-center">
        <div className=" button1 col-10">
          <div className="col-3" style={{height:"100%"}}>
            <div className="bg">
            <p className="" style={{height:"200px"}}>{userName}</p>
            <p>{email}</p></div>
            <div className={isActive==="order" ? "bg active1" : "bg"}>
            <button className="btn" id="order" onClick={handleClick}>My Orders</button></div>
            <div className={isActive==="address" ? "bg active1" : "bg"}>
            <button className="btn" id="address" onClick={handleClick}>My Addresses</button></div>
            <div className={isActive==="wallet" ? "bg active1" : "bg"}>
            <button className="btn" id="wallet" onClick={handleClick}>My Wallet</button></div>
            </div>
          <div className="col-9">
             {option}
          </div>
        </div>
      </div>
    </div></>
  );
};

export default MyOrder;
