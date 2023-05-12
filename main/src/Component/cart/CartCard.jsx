import React from 'react'
import "./cart.css"

const propsCard = (props) => {

  function handleRemove(event) {
    props.remove(event,props.index);
  }

  return (
    <div className='card col-5 new'>
      <div className="card-body2">
              <h5 className="card-title">{props.product}</h5>
              <p className="card-text">{props.type}</p>
              <div className=" w-100">
                Quantity: {props.quantity}
                {/* <div className="d-inline h-100 fs-5">{props.price}</div> */}
              </div>
              <div className="d-inline h-100 fs-5">Total: <i className="fa fa-indian-rupee-sign" />{" "+props.total}</div>
              <div className="qaa">
                <button className="btn btn-primary"><i className="fa-solid fa-trash-can" style={{color: "#000000"} } id ={props.id} onClick={handleRemove}></i>
                </button>
              </div>
            </div>
    </div>
  )
}

export default propsCard
