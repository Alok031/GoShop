import React from "react";
import Card1 from "./Card1";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import "./card.css"
const Card4 = () => {
  const location = useLocation();
  const id = location.state.id;
  const [item, setItems] = React.useState([]);
  React.useEffect(() => {
    axios.get("/add/" + id).then((res) => {
      setItems(res.data);
    });
  }, []);
  return (
    <div className="items">
      {item.map((item, index) => {
        return (
          <Card1
            key={index}
            name={item.itemName}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
          />
        );
      })}
    </div>
  );
};

export default Card4;
