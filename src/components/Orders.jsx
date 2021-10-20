import React, { useEffect, useState } from "react";
import '../styles/Orders.css';
import Order from "./Order";
import ReturnButton from "./ReturnButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Orders = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [orders, setOrders] = useState([]);
  const [index, setIndex] = useState(1);
  
  const urlOrders = `https://lim015-burger-queen-api.herokuapp.com/orders?page=${index}`;

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

  const onPrevious = () => {
    setIndex(index - 1);
  };

  const onNext = () => {
    setIndex(index + 1);
  };
  // console.log(index);
  
  return (
    <div className = 'container-products'>
      <ReturnButton/>
      <h2>Orders</h2>
      <Order orders = {orders}/>
      <div className = 'container-links-pagination'>
        {
          index === 1 ? null : (<button onClick = {onPrevious} className = 'pagination'><MdKeyboardArrowLeft/>Página anterior</button>)
        }
        {
          orders.length < 10 ? null : (<button onClick = {onNext} className = 'pagination'>Página siguiente <MdKeyboardArrowRight/></button>)
        }
      </div>
    </div>
  )
}

export default Orders;
