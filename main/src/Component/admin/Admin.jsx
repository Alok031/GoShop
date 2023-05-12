import React from "react";
import AdminLogin from "../login/AdminLogin";
import "../page.css";

function Admin() {
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
              <AdminLogin className="form" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Admin;
