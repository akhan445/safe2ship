import React from "react";
import PackageListItem from "../components/PackageListItem";

export default function OrderCart(props) {
  
  console.log(props);
  // console.log('this # of pkgs', JSON.stringify(props.udata.packages[0])) //------------------------------

  const packages = [];
  let key = props.udata.packages.length;
  props.udata.packages.forEach(pkg => {
    key += 1;
    if (pkg.status === 'ready') packages.push(<PackageListItem key={key} {...pkg} />);
  });
  
  return (
    <div className="m-5">
    <div className="row justify-content-center">
      <div className="col-12">
        <h2>My Cart</h2>
      </div>
    </div>
      { packages }
    </div>
  );
}