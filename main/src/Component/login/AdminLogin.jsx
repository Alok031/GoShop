import React from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
// import "./loginstyles.css";

import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [admin, setAdmin] = React.useState({
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => {
      return {
        ...prevAdmin,
        [name]: value,
      };
    });
  };
  const register = () => {
    navigate("/adminregister");
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      setFormErrors(validate(admin));
      if (Object.keys(formErrors).length === 0 && isValid) {
        setIsValid(false);
        const response = await axios.post("/admin", admin, {
          withCredentials: true,
        });
        if (response?.data?.foundAdmin) {
          const foundAdmin = response?.data?.foundAdmin;
          const accessToken = response?.data?.accessToken;
          const role = response?.data?.role;
          const foundItems = response?.data?.items;
          setAuth({ foundAdmin, role, accessToken, foundItems });
          response?.data?.role && navigate("/adminpanel");
          setFormErrors({});
        } else {
          alert(response?.data);
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validate = (admin) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!admin.email) {
      errors.email = "Email is required!";
      setIsValid(false);
    } else if (!regex.test(admin.email)) {
      errors.email = "Enter a valid Email";
      setIsValid(false);
    }
    if (!admin.password) {
      errors.password = "Password is required!";
      setIsValid(false);
    }
    return errors;
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="col-7 ms-3  ">
      <div className="card2 ">
        <div className="card-body p-3 text-center">
          <div className="">
            <h1 className="h3 fw-normal">Please sign in</h1>

            <div className="form-floating text-black  ">
              <input
                onChange={handleChange}
                name="email"
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={admin.email}
              />
              <p>{formErrors.email}</p>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating text-black">
              <input
                onChange={handleChange}
                name="password"
                type={passwordShown ? "text" : "password"}
                className="form-control col-4"
                id="floatingPassword"
                placeholder="Password"
                value={admin.password}
              />
              <p>{formErrors.password}</p>

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
                    )}{passwordShown ? " Hide password" : "Show password"}
                  </p>
                </a>
              </div>
            </div>
            <button className=" btn btn-success text-white" onClick={submit}>
              Sign in
            </button><br />
            <button className=" btn btn-outline-danger text-white" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
