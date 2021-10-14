import React from "react";
import Auth from "./Auth";
import MenuCar from "./MenuCar";

const Principal = () => {

  function getToken() {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };
  return getToken()?(
    <div>
      <div>
        <MenuCar />
      </div>
      <h1>Principal</h1>
    </div>
  ):(<Auth />)
}

export default Principal;
