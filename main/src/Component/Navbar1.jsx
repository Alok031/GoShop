import React from "react";
import Register from "./Register";
import AdminOrder from './order/AdminOrder'
import Dashboard from './Dashboard/Dashboard'
import ViewItems from './Items/ViewItems'
import Add from './Add'
import { useNavigate } from "react-router-dom";
import "./page.css";
import useLogout1 from "../hooks/useLogout1";

const Navbar1 = () => {

  const navigate = useNavigate();
  const Logout = useLogout1();
  const [isClicked, setIsClicked] = React.useState(false)
  const [isActive, setIsActive] = React.useState("Dashboard");
  const [option, setOption] = React.useState(<Dashboard />);

  const logout = async () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false),1000);
    await Logout();
    navigate("/admin")
  }

  function handleClick(event) {
    setIsActive(event.target.id);
    if (event.target.id === "orders") {
      setOption(<AdminOrder />);
    } else if (event.target.id === "additems") {
      setOption(<Add />);
    } else if (event.target.id === "viewitems") {
      setOption(<ViewItems />);
    } else if (event.target.id === "Dashboard") {
      setOption(<Dashboard />);
    // } else if (event.target.id === "addfood") {
    //   setOption(<ADDFOOD />);
    }
  }
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <a className="navbar-brand" to="/AdminPanel">
            <i className="fa-solid fa-basket-shopping  " /> GoShop
          </a>
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav  mb-2  left">
            <li className="nav-item">
                <a
                  // activeClassName="menu_active"
                  className={
                      isActive === "Dashboard" ? "nav-link navname active" : "navname nav-link"
                    }
                  aria-current="page"
                  id="Dashboard"
                  onClick={handleClick}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                      isActive === "orders" ? "nav-link navname active" : "navname nav-link"
                    }
                  aria-current="page"
                  id="orders"
                  onClick={handleClick}
                >
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                      isActive === "viewitems" ? "nav-link navname active" : "navname nav-link"
                    }
                  id="viewitems"
                  onClick={handleClick}
                >
                  View items
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                      isActive === "additems" ? "nav-link navname active" : "navname nav-link"
                    }
                  id="additems"
                  onClick={handleClick}
                >
                  Add items
                </a>
              </li>
              <li className="nav-item">
                <a
                  activeClassName="menu_active"
                  className=" navname nav-link"
                  id="logoutadmin"
                  onClick={logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {option}
    </div>
  );
};

export default Navbar1;
