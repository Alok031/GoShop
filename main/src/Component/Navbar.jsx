import React, { useState } from "react";
import Cart from "./cart/Cart";
import useLogout from "./../hooks/useLogout.js";
import { NavLink, useNavigate } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import "./page.css";
import Profile from "./profile/Profile";

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = useLogout();
  const logout = async () => {
    await Logout();
    // axios.delete("/cart");
    navigate("/");
  };


  const [options, setOptions] = useState(<Cart />);
  const searchForm = document.querySelector(".search-form1");
  const handleClick = () => {
    searchForm.classList.add("active");
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  React.useEffect(() => {
      function handleClick1(event) {
      console.log("asd");
    }
  },[])
  function gotoorder(e) {
    navigate("/myorder")
  }

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg  navbar-dark bg-secondary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/index">
            <i className="fa-solid fa-basket-shopping  " /> GoShop
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarTogglerDemo02"
          ></div>
          <div className="icons">
            <div className="div fa fa-bars" id="menu-btn"></div>
            <div
              className="div fa fa-search"
              type="text"
              id="search-btn"
              onClick={handleClick}
            >
              <form className="search-form1">
                <input type="text" id="search-box" placeholder="search here" />
                <i className="clear-icon fa-regular fa-circle-xmark" />
              </form>
            </div>
            <div
              className="fa fa-user dropdown dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <ul
                className="dropdown-menu dropdown-end"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a
                    className="dropdown-item"
                  >
                  <Profile/>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={gotoorder}>
                    My Order
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <div
              variant="primary"
              onClick={handleShow}
              className="div fa fa-shopping-cart"
              id="shopping-btn"
            ></div>
            <Offcanvas
              show={show}
              onHide={handleClose}
              backdrop="static"
              placement={"end"}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="cart">{options}</div>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
