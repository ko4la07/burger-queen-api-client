import React, { useEffect, useState } from "react";
import Product from './Product'
import '../styles/Products.css';

const Products = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [product, setProduct] = useState([]);
  
  const urlProducts = 'https://lim015-burger-queen-api.herokuapp.com/products';

  const fetchProducts = (url) => {
    fetch(url, {
      method :'GET',
      headers : {
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      })
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // setProduct(true);
    fetchProducts(urlProducts);
    // return () => setProduct(false);
  },[])
  
  return (
    <div className = 'container-products'>
      <h1 className="mensajeJ">Aquí van los productos!!!</h1>
      <div>
      <Product product = {product} />
      </div>
    </div>
  )
}

export default Products;

