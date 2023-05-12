import React from "react";
import Card from "./card/Card";
import footer from "./footer";
import Navbar from "./Navbar";
import "./page.css";
import caraosel from "./caraosel/caraosel";
import Login from "./login/Login";

const Homepage = () => {
  function submit() {}

  return (
    <div>
      <section className="gradient-custom qwer">
        <div className="container ">
          <div className="row d-flex align-items-center">
            <div className=" col-4 goshop  ">
              <div className="brand">
                <h1 className="brand-head">GoShop!</h1>
                <p className="brandpar">Shop Easy and Fast</p>
              </div>
            </div>
            <div className="col-8">
            <Login className="form"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
