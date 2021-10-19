import React, { useEffect, useState } from 'react';
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";

const LookOrder = ({idOrder}) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [order, setOrder] = useState([]);
  
  // const urlOrders = 'https://lim015-burger-queen-api.herokuapp.com/orders';
  const urlOrderId = `https://lim015-burger-queen-api.herokuapp.com/orders/${idOrder}`;

  const fetchOrderId = async (url) => {
    setOrder( await fetch(url, {
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
      fetchOrderId(urlOrderId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [isOpenLookOrder, openModalLookOrder, closeModalLookOrder] = useModal(false);

  return (
    <div className = ''>
      <button id={order._id} className = 'button-order-look' onClick = {openModalLookOrder}>Ver orden</button>
      <Modal isOpen = {isOpenLookOrder} closeModal = {closeModalLookOrder}>
        <h2>Resumen de la orden</h2>
        <div>
          <p>Mesero Id</p>
          <p>{order.userId}</p>
        </div>
        <div>
          <p>Cliente</p>
          <p>{order.client}</p>
        </div>
        <div>
          <p>Estado</p>
          <p>{order.status}</p>
        </div>
        <div>
          <p>Orden</p>
          {/* {
            order.products.map((product) => {
              return(
                <div>
                  <div>{product.qty}</div>
                  <div>{product._id}</div>
                </div>
              )
            })
          } */}
        </div>
        <div>
          <p>Total</p>
        </div>
        <button id={order._id} className = 'btn-delete-product'>Modificar orden</button>
      </Modal>
    </div>
  )
};

export default LookOrder;