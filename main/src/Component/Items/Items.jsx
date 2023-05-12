import React from 'react'

const Items = (props) => {
    const id = props.id
  return (
    <div>
    {props.items.map((item,index) => {
        <h5 key={index}>
            {/* <th scope="row">{index+1}</th> */}
            {item.itemName}
        </h5>
    })}
      
    </div>
  )
}

export default Items
