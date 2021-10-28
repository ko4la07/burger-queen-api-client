import React from 'react';
import LookOrder from './LookOrder';

const Order = ({order, fetchOrders}) => {
  return (
    <div className = 'products-cart-box'>
      {
        <div key = {order._id} className = 'one-order-box'>
          <div className = 'one-order-rows'>
              <p className = 'rows-name'>Cliente</p>
              <p>{order.client}</p>
            </div>
            <div className = 'one-order-rows'>
              <p className = 'rows-name'>Estado</p>
              <p>{order.status}</p>
            </div>
          <div className = 'container-btns-order'>
          <LookOrder idOrder = {order._id}/>
          </div>
        </div>
      }
    </div>
  )
};

export default Order;