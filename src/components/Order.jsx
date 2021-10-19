import React from 'react';
import LookOrder from './LookOrder';

const Order = ({orders}) => {
  return (
    <div className = 'products-cart-box'>
      {
          orders.map((item, index) => (
            <div key = {index} className = 'one-order-box'>
              <div className = 'one-order-rows'>
                <p className = 'rows-name'>Cliente</p>
                <p>{item.client}</p>
              </div>
              <div className = 'one-order-rows'>
                <p className = 'rows-name'>Estado</p>
                <p>{item.status}</p>
              </div>
              <LookOrder idOrder = {item._id}/>
            </div>
          ))
        }
    </div>
  )
};

export default Order;