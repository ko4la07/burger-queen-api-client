import React from 'react';

const ProductToCard = ({product}) => {
  return (
    <div className = 'products-cart-box'>
      {
          product.map((item, index) => (
            <div key = {index} className = 'one-product-cart-box'>
              <div>
                <img src={item.image} alt="burger" className = 'img-products-cart'/>
              </div>
              <div className = 'name-product-cart'>{item.name}</div>
              {/* <div>{item._id}</div> */}
              <div className = 'price-product-cart'>S/.{item.price}</div>
              <button id={item._id} className = 'button-product-cart'>Agregar</button>
            </div>
          ))
        }
    </div>
  )
};

export default ProductToCard;