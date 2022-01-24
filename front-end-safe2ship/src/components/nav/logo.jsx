import React from "react";
import logo1 from "./logo.jpg"


export default function Logo(props) {
   return (
    <div className="logotag rounded-pill">
      <div className="logo">
          <button type="button" id="logobtn" onClick={() => props.hv_handler('home')} className="btn btn-secondary rounded-pill"><h1>safe2ship</h1></button>
      </div>
      
      <div className="circle">
          <img src={logo1} id="logoimg" className="rounded rounded-pill" alt={"logo"}/>
      </div>
    </div>
   );
 }