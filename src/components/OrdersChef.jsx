import React, { useEffect, useState } from "react";
import '../styles/Orders.css';
import OrderChef from "./OrderChef";
import ReturnButton from "./ReturnButton";

const OrdersChef = () => {
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

  const ordersToPrepare = (array) => {
    const arrayPrepare = array.filter((element) => element.status !== 'delivered');
    return arrayPrepare;
  };
  
  return (
    <div className = 'container-products'>
      <ReturnButton/>
      <h2>Orders to Chef</h2>
      <OrderChef orders = {ordersToPrepare(orders)}/>
    </div>
  )
}

export default OrdersChef;
