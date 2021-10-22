import React, { useState,useEffect } from 'react';
// import { MdAddCircleOutline } from "react-icons/md";
import usePrevious from '../hooks/usePrevious';


const ProductsToCart = ({product, data}) => {
  const [flag, setFlag] = useState(true);
  const { productsOnCart } = data;
  const prevProductsOnCart = usePrevious(productsOnCart);
  // const { product,data } = props;

  useEffect(() => {
    if (productsOnCart.length === 0) {
      setFlag(true);
    } else if (prevProductsOnCart.indexOf(product) !== -1 && productsOnCart.indexOf(product) === -1) {
      setFlag(!flag);
    }

  }, [productsOnCart]);

  const handleClickAgregar = () => {
    data.handleAddition(product);
    setFlag(!flag);
  }

  const handleClickRemover = () => {
    data.handleRemove(product);
  }
  return (
    <div className = 'products-cart-box'>
      {
          // product.map((item, index) => (
            <div key = {product._id} className = 'one-product-cart-box'>
              <div>
                {product.image ? (<img src={product.image} alt="bq" className = 'img-products-cart'/>) : ''}
              </div>
              <div className = 'name-product-cart'>{product.name}</div>
              {/* <div>{product._id}</div> */}
              <div className = 'price-product-cart'>S/.{product.price}</div>
              {/* <button id={item._id} className = 'button-product-cart'>Agregar <MdAddCircleOutline/></button> */}
              {
               flag ? (
                  <button waves="effect" className="boton-agregar" onClick={handleClickAgregar}>Agregar</button>
                ) : (
                  <button waves="effect" className="boton-eliminar" onClick={handleClickRemover}>Eliminar</button>
                  )
              }
            </div>
          // ))
        }
    </div>
  )
};

export default ProductsToCart;

