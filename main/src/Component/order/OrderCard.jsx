import React from 'react'
import { Modal,Button } from "react-bootstrap";
import "./order.css"

const OrderCard = (props) => {
  
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card m-2 dflex" style={{backgroundColor:"rgb(218, 214, 214)"}}>
      <div className="card-body col-12 row justify-content-start" >
      <p style={{fontWeight:"bold"}}>{props.id}. Rs  {props.total}</p>
      <p style={{fontSize:"14px"}}>Placed on {props.time}</p>
      </div>
      <div className='col-4'>
      <button className="btn btn-outline-primary" onClick={handleShow}>view details</button></div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.cart.map((item,index) => {
            return(
              <div className="card mb-2" key={index}>
                <div className="card-body d-flex justify-content-space-between">
                  <p className='col-10'>{item.quantity}-{item.product}</p>
                  <h6>₹ {item.quantity*item.price}</h6>
                </div>
              </div>
            )
          })}
          <div className="card" style={{backgroundColor:"rgb(125,182,157"}}>
            <h4 className='col-10 p-2'>Bill Details:</h4>
            <div className="card-body row">
              <h5 className="col-9">Total</h5>
              <h5 className="col-3">₹ {props.total}</h5>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" ><UpdateUser/></Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrderCard
