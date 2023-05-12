import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./profile.css";
import useAuth from "../../hooks/useAuth";
import UpdateUser from "../Updation/Update";

function Profile() {

  const { auth } = useAuth();
  const name = auth?.foundUser?.Name;
  const email = auth?.foundUser?.Email;
  const userid = auth?.foundUser?._id
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p className="qasw" variant="primary " onClick={handleShow}>
        Profile
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>User id:{" "+userid}</p>
          <p>Name:{" "+name}</p>
          <p>Email:{" "+email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" ><UpdateUser/></Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;
