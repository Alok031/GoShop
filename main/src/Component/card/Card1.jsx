import React from "react";
import "./card.css";
import Img from "./qaw.jpg";
import Vegies from "./Vegies";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Card1 = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [isActive, setIsActive] = React.useState("vegies");
  // const [option, setOption] = React.useState(<Vegies />);
  const baseurl = `http://localhost:4000/uploads/${props.image}`;
  const Title = location.state.name;
  const [count, setCount] = React.useState(0);
  const [added, setAdded] = React.useState(false);
  console.log(baseurl);
  const cart = {
    name: props.name,
    type: Title,
    price: props.price,
    total: count * props.price,
  };

  function add() {
    setCount(count + 1);
    setAdded(true);
  }
  function minus() {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setAdded(false);
    }
  }

  function handleClick(event) {
    navigate("/vegies");
  }

  function addToCart(events) {
    setCount(0);
    if (added) {
      cart.quantity = count;
      axios.post("/cart", cart).then();
      alert("Added in cart");
    }
  }

  return (
    <div className="col-3 menu">
      <a id="vegies">
        <div className="card mb-3 menucard1" style={{ maxWidth: "14rem" }}>
          <div className="">
            <div
              className="card top "
              style={{ width: "15rem", maxHeight: "350px" }}
            >
            <div className="imgdiv7" style={{width:"15rem", height:"160px"}}>
              <img
                src={
                  props.image
                    ? baseurl
                    : "https://cdn-icons-png.flaticon.com/128/737/737967.png"
                }
                className="card-img-top h-10"
                alt={props.name}
                style={{width:"12rem", height:"140px",margin:"10px"}}
              />
            </div>
              <div className="card-body1">
                <h5 className="card-title azxc">{props.name}</h5>
                <div className="d-box boxdes">
                  <p>{props.quantity}</p>
                  <div className=" h-100 fs-5 ">
                    <i className="fa fa-indian-rupee-sign" />
                    {" " + props.price}
                  </div>
                  <br />
                  <div className="added">
                    <i onClick={minus} className="fa-solid fa-minus"></i>
                    <span>{count}</span>
                    <i onClick={add} className="fa-solid fa-plus "></i>
                  </div>
                </div>
                <hr />
                <button className="btn btn-outline-success" onClick={addToCart}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card1;
