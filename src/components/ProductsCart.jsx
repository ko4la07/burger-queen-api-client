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
  const [active, setActive] = useState(false);
  
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

  // let tab;

  useEffect(() => {
    let tab = window.location.pathname.split('/')[2];
    // console.log('tab: ', tab);
    (type === tab)? setActive(true) : setActive(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

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

  const titulo = () => {
    switch (type) {
      case "promo":
        return <h1>Promociones</h1>
      case "burgers":
        return <h1>Hamburguesas</h1>
      case "complements":
        return <h1>Complementos</h1>
      case "salad":
        return <h1>Ensaladas</h1>
      case "drinks":
        return <h1>Bebidas</h1>
      default:
        return <h1>Sin título</h1>
    }
  }

  return (
    <div className={`products-cart-principal ${!active ? 'hide' : ''}`}>
      {titulo()}
      <div className = 'container-products-cart'>
        {
          dataTypes(type).map((product) => (
        <ProductsToCart key={product._id} product = {product} data = {{handleAddition,handleRemove,productsOnCart}} />
          ))
        }
      </div>
    </div>
  )
}

export default ProductsCart;
