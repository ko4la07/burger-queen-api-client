import React, { useEffect, useState } from "react";
import ProductTable from './ProductTable'
import '../styles/Products.css';
import CreateProduct from "./CreateProduct";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Products = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [product, setProduct] = useState([]);
  const [index, setIndex] = useState(1);
  
  const urlProducts = `https://lim015-burger-queen-api.herokuapp.com/products?page=${index}`;

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
  },[urlProducts])

  const onPrevious = () => {
    setIndex(index - 1);
  };

  const onNext = () => {
    setIndex(index + 1);
  };
  // console.log(index);

  return (
    <div className = 'container-products'>
      <CreateProduct fetchProducts = {fetchProducts} />
      <div>
      <ProductTable product = {product} fetchProducts = {fetchProducts}/>
      </div>
      <div className = 'container-links-pagination'>
        {
          index === 1 ? null : (<button onClick = {onPrevious} className = 'pagination'><MdKeyboardArrowLeft/>Página anterior</button>)
        }
        {
          product.length < 10 ? null : (<button onClick = {onNext} className = 'pagination'>Página siguiente <MdKeyboardArrowRight/></button>)
        }
      </div>
    </div>
  )
}

export default Products;
