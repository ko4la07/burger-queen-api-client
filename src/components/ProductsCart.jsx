import React, { useEffect, useState } from "react";
import '../styles/ProductsCart.css';
import ProductsToCart from "./ProductsToCart";

const ProductsCart = ({type,handleAddition,handleRemove,productsOnCart}) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [product, setProduct] = useState([]);
  
  const urlProducts = 'https://lim015-burger-queen-api.herokuapp.com/products?limit=1000';

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
    return () => setProduct(false); // cancela el estado
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const dataTypes = (entrada) => {
    let arrayResult = [];
    product.forEach((element) => {
      if(element.type === entrada) {
        arrayResult.push(element);
      }
    })
    return arrayResult;
  };
  // console.log(dataTypes('promo'));

  return (
    <div className = 'container-products-cart'>
      <div>
      <div>
        {
          dataTypes(type).map((product) => (
        <ProductsToCart key={product._id} product = {product} data = {{handleAddition,handleRemove,productsOnCart}} />
          ))
        }
      </div>
      </div>
    </div>
  )
}

export default ProductsCart;
