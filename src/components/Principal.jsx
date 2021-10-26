import React from "react";
import Auth from "./Auth";
import '../styles/Principal.css';
import MenuPrincipal from "./MenuPrincipal";

const Principal = () => {

  function getToken() {
    const tokenString = localStorage.getItem('token');
    return tokenString;
  };
  
  return getToken()?(
    <div className = 'container-principal'>
      <div className = 'image-products-cart'>
        <div className = 'logo-products-cart'></div>
      </div>
      <div className = 'line-products-cart'></div>
      
      <MenuPrincipal/>
    </div>
  ):(<Auth />)
}

export default Principal;
