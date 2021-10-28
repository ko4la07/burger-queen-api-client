import React, { useEffect, useState } from "react";
import '../styles/Orders.css';
import OrderUser from "./OrderUser";
import Order from "./Order";
import ReturnButton from "./ReturnButton";

const OrdersUser = ({userId}) => {
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
  // console.log(userId);
  const ordersToDelivering = (array) => {
    const arrayPrepare = array.filter((element) => (element.status !== 'pending' && element.status !== 'preparing' && element.status !== 'delivered' && element.status !== 'canceled') && element.userId === userId);
    return arrayPrepare;
  };
  const allOrderPending = (array) => {
    const arrayPrepare = array.filter((element) => (element.status === 'pending' && element.userId === userId));
    return arrayPrepare;
  };
  const allOrderPreparing = (array) => {
    const arrayPrepare = array.filter((element) => (element.status === 'preparing' && element.userId === userId));
    return arrayPrepare;
  };
  
  return (
    <div className = 'container-products'>
      <ReturnButton/>
      <h2>Ordenes listas para servir</h2>
      <div className = 'container-orders-chef'>
      {
        ordersToDelivering(orders).map((order) => {
          return (
            <div className = 'products-cart-box' key = {order._id}>
              <OrderUser order = {order} fetchOrders = {fetchOrders}/>
            </div>
          )
        })
      }
      </div>
      <h2>Ordenes preparando en cocina</h2>
      <div className = 'container-orders-chef'>
      {
        allOrderPreparing(orders).map((order) => {
          return (
            <div className = 'products-cart-box' key = {order._id}>
              <Order order = {order} fetchOrders = {fetchOrders}/>
            </div>
          )
        })
      }
      </div>
      <h2>Ordenes pendientes</h2>
      <div className = 'container-orders-chef'>
      {
        allOrderPending(orders).map((order) => {
          return (
            <div className = 'products-cart-box' key = {order._id}>
              <OrderUser order = {order} fetchOrders = {fetchOrders}/>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default OrdersUser;