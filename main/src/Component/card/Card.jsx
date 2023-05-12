import React from "react";
import "./card.css";
import axios from "../../api/axios";
import Card2 from './Card2'

const Card = () => {
  
  const [card,setCard] = React.useState([]);
  React.useEffect(() => {
    axios.get("/items").then((res) => {
      setCard(res.data);
    })
    
  },[])
  return (
    <div>
      {card.map((item,index) => {
      return(<Card2 
        key={index}
        index={index}
        id={item._id}
        category={item.category}
        image={item.image}
      />)
    })}  
    </div>
  );
};

export default Card;
