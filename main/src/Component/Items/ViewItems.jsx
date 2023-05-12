import React from "react";
import axios from "../../api/axios";
// import "./fooditem.css";
import Items from "./Items";
import useAuth from "../../hooks/useAuth";

function ViewItems() {
  const { auth } = useAuth();
  const [itemarr, setItem] = React.useState(auth?.foundItems);
  console.log(itemarr);
  function removeitem(event) {
    // console.log(event.target);
    // console.log(event.target.id)
    // console.log(event.target.name);
  }

  return (
    <table className="table table-light fooditem" style={{ marginTop: "30px" }}>
      <thead>
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Item Name</th>
          <th scope="col">Price</th>
          <th scope="col">Category</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {itemarr.map((item, index) => {
          return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td scope="row">
                {item.items.map((item1, index) => {
                  return (
                    <tr className=" d-flex justify-content-center" key={index}>
                      <th scope="row">{index + 1}.</th>
                      <td scope="row">{item1.itemName}</td>
                    </tr>
                  );
                })}
              </td>
              <td scope="row">
                {item.items.map((item1, index) => {
                  return (
                    <tr className="d-flex justify-content-center">
                      {item1.quantity} / {item1.price}
                    </tr>
                  );
                })}
              </td>
              <td scope="row">{item.category}</td>
              <td scope="row">
                {item.items.map((item1, index) => {
                  return (
                    <tr className="d-flex justify-content-center">
                      <i
                        className="fa fa-trash"
                        // id={item1._id}
                        // name={item1.itemName}
                        onClick={() => {
                          axios
                            .delete(
                              "/item/" +
                              item1._id +
                                "/" +
                                item.category
                            )
                            .then((res) => {
                              console.log(res.data)
                              auth.foundItems = res.data;
                              setItem(auth.canteen.fooditems);
                            });
                        }}
                      />
                      <br />
                    </tr>
                  );
                })}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ViewItems;

// {/* <Items items={items} id={"itemName"}/> */}
