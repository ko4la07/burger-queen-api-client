import React, { useState,useEffect } from 'react';
import { MdAddCircleOutline } from "react-icons/md";
// import usePrevious from '../hooks/usePrevious';


const ProductsToCart = ({product, data}) => {
  const [flag, setFlag] = useState(true);
  const { productsOnCart } = data;

  useEffect(() => {
    // console.log(product);
    // console.log(productsOnCart);
    if (!(productsOnCart.includes(product))) {
      setFlag(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsOnCart])

  const handleClickAgregar = () => {
    data.handleAddition(product);
    setFlag(!flag);
  }

  const handleClickRemover = () => {
    data.handleRemove(product);
    setFlag(true);
  }
  return (
    <div className = 'products-cart-box'>
      {
            <div key = {product._id} className = 'one-product-cart-box'>
              <div>
                {product.image ? (<img src={product.image} alt="bq" className = 'img-products-cart'/>) : ''}
              </div>
              <div className = 'name-product-cart'>{product.name}</div>
              <div className = 'price-product-cart'>S/.{product.price}</div>
              
              {
               flag ? (
                  <button className = 'button-product-cart' onClick={handleClickAgregar}>Agregar <MdAddCircleOutline/></button>
                ) : (
                  <button className = 'button-product-cart danger' onClick={handleClickRemover}>Eliminar</button>
                  )
              }
            </div>
        }
    </div>
  )
};

export default ProductsToCart;

