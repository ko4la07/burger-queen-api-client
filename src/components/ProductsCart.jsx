import React, { useEffect, useState } from "react";
import '../styles/ProductsCart.css';
import ProductToCard from "./ProductsToCart";

const ProductsCart = ({type}) => {
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
        <ProductToCard product = {dataTypes(type)} />
      </div>
      </div>
    </div>
  )
}

export default ProductsCart;
