import React from "react";
import "./card.css";
import { useNavigate } from "react-router-dom";
import Img from "./qaw.jpg";

const Card2 = (props) => {
  const navigate = useNavigate();

  function handleClick(event) {
    navigate("/vegies", {
      state: {
        name: props.category,
        id: props.id,
      },
    });
  }

  return (
    <a id="Vegetables" onClick={handleClick}>
      <div className="card mb-3 menucard" style={{ width: "12rem" }}>
        {/* <div className=""></div> */}
        {/* <img
          className="card-img-top h-10"
          alt="onion"
        /> */}
        <div className="card-body justify-content-center">
          <h5 className="card-title">{props.category}</h5>
          <p className="card-text ms-5">GoShop</p>
        </div>
      </div>
    </a>
  );
};

export default Card2;
