import React from "react";
import OrderListItem from "../components/OrderListItem";
export default function OrderHistory(props) {
  
  console.log(props.ordercart.delivered);
  // console.log('this # of pkgs', JSON.stringify(props.udata.packages[0])) //------------------------------

  // const packages = [];
  // let key = props.ordercart.delivered.length;
  // props.ordercart.delivered.forEach(pkg => {
  //   key += 1;
  //   packages.push(<PackageListItem key={key} {...pkg} />);
  // });
  
  return (
    <div className="m-5">
    <div className="row justify-content-center">
      <div className="col-12">
        <h2>My Past Orders</h2>
      </div>
    </div>
      <OrderListItem {...props} />
    </div>
  );
}