import React, { useState, useEffect } from 'react';
import LookOrder from './LookOrder';

const OrderUser = ({order, fetchOrders}) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();

  const [status, setStatus] = useState(order.status);
  // console.log(status);

  const urlOrders = 'https://lim015-burger-queen-api.herokuapp.com/orders?limit=10000';
  const urlOrdersFetch = `https://lim015-burger-queen-api.herokuapp.com/orders/${order._id}`;

  const updateStatus = () => {
    const orderStatus = {status};
    fetch(urlOrdersFetch, {
      method :'PUT',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(orderStatus)
      })
      .then(response => response.json())
      // .then((data) => console.log(data))
      .then(() => fetchOrders(urlOrders)) 
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    updateStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[status]);
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
          <select name ="roles" onChange={(e) => setStatus(e.target.value)} className = 'select-status-order-user'>
          <option defaultValue>status</option>
          <option value={'delivered'}>delivered</option>
          <option value={'canceled'}>canceled</option>
        </select>
          </div>
        </div>
        }
    </div>
  )
};

export default OrderUser;