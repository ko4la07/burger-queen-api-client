import React from "react";

const Products = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();

  let response = fetch('https://lim015-burger-queen-api.herokuapp.com/products', {
      method :'GET',
      headers : {
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      });
      response
        .then((response) => response.json())
        .then((data) => console.log(data));
      
  return (
    <div>
      <h1 className="mensajeJ">Aquí van los productos!!!</h1>
      <h2 className="mensajeJ">Aquí van los productos!!!</h2>
    </div>
  )
}

export default Products;

