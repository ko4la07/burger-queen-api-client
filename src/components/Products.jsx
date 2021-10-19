import React, { useEffect, useState } from "react";
import ProductTable from './ProductTable'
import '../styles/Products.css';
import CreateProduct from "./CreateProduct";
// import UpdateProduct from "./UpdateProduct";

const Products = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [product, setProduct] = useState([]);
  
  const urlProducts = 'https://lim015-burger-queen-api.herokuapp.com/products';

  const fetchProducts = async (url) => {
    setProduct( await fetch(url, {
      method :'GET',
      headers : {
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error))
    )};

  useEffect(() => {
      fetchProducts(urlProducts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div className = 'container-products'>
      <CreateProduct fetchProducts = {fetchProducts} />
      <div>
      <ProductTable product = {product} fetchProducts = {fetchProducts}/>
      </div>
    </div>
  )
}

export default Products;
