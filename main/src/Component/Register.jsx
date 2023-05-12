import React,{useState} from "react";
import "./page.css";
import axios from "./../api/axios";
import { useNavigate,NavLink } from "react-router-dom";
import Navbar from "./Navbar1";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name:"",
    email: "",
    password: "",
    Confirm_Password:"",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const Post = async (e) => {
    e.preventDefault();
    try{
    const result = await axios.post("/register", user)
    console.log(result);
    if(result){
      if(result.data === "Registration Successfull"){
        alert("Registration Successfull");
        navigate("/");
      }
      else{
        alert("Email Already Exist");
      }
    }
  }
  catch(err){
    if(err){
      console.log(err);
    }
  }
  };


  return (
    <div>
    {/* <Navbar/> */}
      <section
        className=" bg-image qwer">
        <div className="mask d-flex align-items-center h-90 gradient-custom-2 asd">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-6 col-lg-7  col-xl-6">
                 <div className="card aswq" >
                  <div className="card-body p-1 ">
                    <h2 className="text-uppercase text-center mb-5 asd">
                      Create an account
                    </h2>

                    <form action="/register" method="post">
                      <div className="form-outline mb-3">
                        <label className="form-label asd" for="form3Example1cg">
                          Name: 
                        </label>
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-md"
                          required
                          name="name"
                          placeholder="Name"
                          value={user.name}
                          onChange={handleInputs}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example3cg">
                          Email:
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-md"
                          required
                          name="email"
                          placeholder="Email"
                          value={user.email}
                          onChange={handleInputs}
                          
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example4cg">
                          Password:
                        </label>
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-md col-xs-3"
                          required
                          name="password"
                          placeholder="Password"
                          value={user.password}
                          onChange={handleInputs}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example4cdg">
                          Confirm Password: 
                        </label>
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control form-control-md col-xs-3"
                          required
                          name="Confirm_Password"
                          placeholder="Confirm password"
                          value={user.Confirm_Password}
                          onChange={handleInputs}
                        />
                      </div>
                      {/* <div className="form-outline mb-3">
                        <label htmlFor="" className="form-label">
                          Photo
                        </label>
                        <input
                          type="file"
                          id="form3Example4cdg"
                          className="form-control form-control-md col-xs-3"
                          required
                          name="cpassword"
                          placeholder="photo"
                        />
                      </div> */}

                      {/* <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                  </label>
                </div> */}

                       <div className="d-flex azxs justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                          value="Register"
                          method="post"
                          name="register"
                          onClick={Post}
                        />
                      </div>

                      <p className="text-center  text-dark  mt-4 mb-0">
                        Have already an account ? 
                        <NavLink to="/" className="fw-bold text-body">
                          <u> Login here</u>
                        </NavLink>
                      </p>
                    </form>
                </div> 
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
};

export default Register;
