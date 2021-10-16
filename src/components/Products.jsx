import React, { useEffect, useState } from "react";
import ProductTable from './ProductTable'
import '../styles/Products.css';
import CreateProduct from "./CreateProduct";

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
    // setInterval(() => {
      fetchProducts(urlProducts);
    // }, 1000);
    // fetchProducts(urlProducts);
    // return () => setProduct(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div className = 'container-products'>
      <CreateProduct />
      <div>
      <ProductTable product = {product} />
      </div>
    </div>
  )
}

export default Products;

