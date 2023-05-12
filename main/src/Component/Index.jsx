import React from "react";
import Navbar from "./Navbar";
import Card from "./card/Card";
import Caraosel from "./caraosel/caraosel";

const Index = () => {

  const [option, setOption] = React.useState(<Card/>)
  return ( 
    <div className="row">
      <Navbar />
      <div><Caraosel /></div>
      <div className="col-12 userhomebg bg-dark">{option}</div>
    </div>
  );
};

export default Index;
