import React from "react";
import "./package.css";

export default function OrderListItem(props) {
  console.log(props);

  return (
    <div className="row my-5" >
     
      <div className="col-8 mx-auto">
        <div className="card package-list-item">
          <div className="card-body">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-3">
                <div className="text-center">
                  <p>
                    <i className="bi bi-box box-size-small"></i>
                    <br></br>
                    <strong>{props.size}</strong>
                  </p>
                  <hr></hr>
                  <p className="price">${props.price/100}</p>
                </div>
              </div>
              <div className="col-sm-12 col-md-7">
                <p><strong>Customer ID:</strong>&nbsp;&nbsp; {props.customer_id}</p>
                <p><strong>Shipper:</strong>&nbsp;&nbsp; {props.user.name}</p>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <i className="bi bi-chevron-right" onClick={() => props.pkglItemClickHandler ? props.pkglItemClickHandler(props, 'pkg') : ''}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}