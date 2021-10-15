import React from 'react';

const Product = ({product}) => {
  return (
    // debemos de hacer aqui la tabla con los valores
    <div>
      {
          product.map((item, index) => (
            <div key = {index}>
              <div>{item.name}</div>
              <div>{item.type}</div>
              <div>S/.{item.price}</div>
              <div>
                <img src={item.image} alt="burger" className = 'img-products'/>
              </div>
            </div>
          ))
        }
    </div>
  )
};

export default Product;