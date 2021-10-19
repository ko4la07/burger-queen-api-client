import React from "react";
import Auth from "./Auth";
import MenuCar from "./MenuCar";
// import ProductsCart from "./ProductsCart";
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
      <div className = 'menu-car-cart'>
        <MenuCar />
      </div>
      <MenuPrincipal/>
      {/* <div className = 'products-cart-principal'>
        <ProductsCart />
      </div> */}
    </div>
  ):(<Auth />)
}

export default Principal;
