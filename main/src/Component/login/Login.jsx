import React, { useState } from "react";
import "../page.css";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const register = () => {
    navigate("/register");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  };

  const Post = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/login", user, {
        withCredentials: true,
      });
      if (result) {
        if (result?.data?.foundUser) {
          const foundUser = result?.data?.foundUser;
          const role = result?.data?.role;
          const accessToken = result?.data?.accessToken;
          const foundItems = result?.data?.items;
          setAuth({ foundUser, role, accessToken, foundItems });
          alert("Login Successfull");
          result?.data?.role && navigate("/index");
        } else {
          alert(result.data);
        }
      }
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="col-7 ms-3  ">
      <div className="card2 ">
        <div className="card-body p-3 text-center">
          <div className="">
            <h1 className="h3 fw-normal">Login</h1>
            <div className="form-floating text-black  ">
              <input
                onChange={handleChange}
                name="email"
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={user.email}
              />
              {/* <p>{formErrors.email}</p> */}
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <br />
            <div className="form-floating text-black">
              <input
                onChange={handleChange}
                name="password"
                type={passwordShown ? "text" : "password"}
                className="form-control col-4"
                id="floatingPassword"
                placeholder="Password"
                value={user.password}
              />
              {/* <p>{formErrors.password}</p> */}

              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="row justify-content-end">
              <div className="col-6">
                <a className="btn2 " onClick={togglePassword}>
                  <p>
                    {passwordShown ? (
                      <i className="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    )}
                    {passwordShown ? " Hide password" : "Show password"}
                  </p>
                </a>
              </div>
            </div>

            <button className=" btn btn-success text-white" onClick={Post}>
              Sign in
            </button>
            <br />
            <button
              className=" btn btn-outline-danger text-white"
              onClick={register}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
