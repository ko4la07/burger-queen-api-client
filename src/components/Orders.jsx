import React, { useEffect, useState } from "react";
import '../styles/Orders.css';
import Order from "./Order";
import ReturnButton from "./ReturnButton";

const Orders = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [orders, setOrders] = useState([]);
  
  const urlOrders = 'https://lim015-burger-queen-api.herokuapp.com/orders?limit=1000';

  const fetchOrders = async (url) => {
    setOrders( await fetch(url, {
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
      fetchOrders(urlOrders);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[urlOrders])
  
  return (
    <div className = 'container-products'>
      <ReturnButton/>
      <h2>Orders</h2>
      <Order orders = {orders}/>
    </div>
  )
}

export default Orders;
