import React from "react";
import axios from "./../api/axios";
import "./add.css";
import useAuth from "./../hooks/useAuth";
import img from "./../public/Uploadicon.png";
import {useNavigate} from 'react-router-dom'

function Add() {
  const { auth } = useAuth();
  const Navigate = useNavigate();
  const [src, setSrc] = React.useState(img);
  const [isUploaded, setIsUploaded] = React.useState(false);
  const [image, setImage] = React.useState("");
  const cid = auth?.foundAdmin?._id;
  const [items, setItem] = React.useState({
    name: "",
    quantity:"",
    category: "",
    price: "",
    image: "",
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(true);

  const handleClick = async (event) => {
    event.preventDefault();
    setFormErrors(validate(items));
    if (isUploaded) {
      const formdata = new FormData();
      formdata.append("testimg", image);
      const res = await axios.post(`/uploadimage/${cid}`, formdata);
      items.image = res.data.imagepath;
      if (Object.keys(formErrors).length === 0 && isValid) {
        setIsValid(false);
        axios.post("/items/" + cid, items, {
          withCredentials: true,
        }).then((res)=>{
          // auth.canteen = res.data
          console.log(res)
          window.location.reload()
        });
      }
    } else {
      if (Object.keys(formErrors).length === 0 && isValid) {
        setIsValid(false);
        axios.post("/items/" + cid, items, {
          withCredentials: true,
        }).then((res)=>{
          console.log(res);
          // auth.canteen = res.data
          window.location.reload()
        });
      }
    }
  };

  const handleImg = async (e) => {
    setSrc(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    setIsUploaded(true);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((previtems) => {
      return { ...previtems, [name]: value };
    });
  }

  function validate(items) {
    const errors = {};
    if (items.name === "") {
      errors.name = "Items Name is required!";
      setIsValid(false);
    }
    if (!items.price || items.price <= 0) {
      errors.price = "Enter valid price!";
      setIsValid(false);
    }
    if (items.quantity === "") {
      errors.type = "Enter Valid Quantity";
      setIsValid(false);
    }
    if (items.category === "") {
      errors.type = "Select Category";
      setIsValid(false);
    }
    return errors;
  }

  return (
    <div className="row justify-content-start addfood">
      <div
        className="col-6 imgdiv1 justify-content-center"
        onChange={handleImg}
      >
        <label htmlFor="file-upload">
          <img src={src} className="img-fluid rounded-end" alt="..." style={{width:"200px", height:"140px"}} />
          {!isUploaded && (
            <h5 style={{ textAlign: "center", marginTop: "4px" }}>
              Click Above to Add Image
            </h5>
          )}
        </label>
        <input
          name="name"
          type="file"
          id="file-upload"
          className="imageitems"
          placeholder="items Image"
        />
      </div>
      <div className="col-6">
        <h1 className="h3 mb-3 fw-normal">Add items</h1>
        <select
          name="category"
          onChange={handleChange}
          className="form-select"
          value={items.category}
        >
          <option value="Vegetables">Vegetables</option>
          <option value="Drinks">Drinks</option>
          <option value="Fruits">Fruits</option>
          <option value="Medicines">Medicine</option>
          <option value="Dairy product">Dairy Product</option>
        </select>
        <p>{formErrors.type}</p>
        <div className="form-floating">
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="items Name"
            value={items.name}
          />
          <p>{formErrors.name}</p>
          <label htmlFor="floatingInput">Item Name</label>
        </div>
        <div className="form-floating">
          <input
            name="quantity"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="quantity"
            value={items.quantity}
          />
          <p>{formErrors.quantity}</p>
          <label htmlFor="floatingInput">Quantity</label>
        </div>
        <div className="form-floating">
          <input
            name="price"
            onChange={handleChange}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Price"
            value={items.price}
          />
          <p>{formErrors.price}</p>
          <label htmlFor="floatingInput">Price</label>
        </div>
        
        {/* <select
          name="category"
          onChange={handleChange}
          className="form-select"
          value={items.category}
        >
          <option value="Starter">Starter</option>
          <option value="Fast items">Fast items</option>
          <option value="Main-Course">Main-Course</option>
          <option value="Breads">Breads</option>
          <option value="Beverage">Beverage</option>
          <option value="Dessert">Dessert</option>
        </select> */}
        {/* <p>{formErrors.category}</p> */}
        <div className="form-floating"></div>
        <button
          type="submit"
          className="w-100 btn btn-lg btn-primary"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Add;
