import React from "react";
import Navbar from "../Navbar";
import Add from "../Add";
import Card4 from "./Card4";
import "./card.css";
import { useNavigate } from "react-router-dom";

const Vegies = () => {
  const navigate = useNavigate();
  const HandleClick = (event) =>{
    // setOption(<Card4/>)
    navigate("/vegies", {
      state: {
        name: event.target.name,
        id: event.target.id,
      },
    },
    );
    window.location.reload()
  }

  const [option, setOption] = React.useState(<Card4 />);
  return (
    <div className="row">
      <Navbar />
      {/* <Add id={id}/>   */}
      <div className="plm">
        <div className="col-2 h-100 text-white left-section bg-dark menucard3">
          <h1 className="head">Categories</h1>
          <hr />
            <button className="btna" onClick={HandleClick} id="643e8e1f5aab92ef06ea391b" name="Vegetables">Vegetables</button>
            <button className="btna" onClick={HandleClick} id="643e8dea5aab92ef06ea3919" name="Drinks">Drinks</button>
            <button className="btna" onClick={HandleClick} id="644c248674dd3b569b5b07b2" name="Fruits">Fruits</button>
            <button className="btna" onClick={HandleClick} id="644c24af74dd3b569b5b07b3" name="Medicine">Medicine</button>
            <button className="btna" onClick={HandleClick} id="644c24ce74dd3b569b5b07b4" name="Dairy Products">Dairy Products</button>
        </div>
        <div className="col-10 right-section">{option}</div>
      </div>
    </div>
  );
};

export default Vegies;
