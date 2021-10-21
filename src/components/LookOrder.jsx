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
  // console.log(order);
  // const urlOrders = 'https://lim015-burger-queen-api.herokuapp.com/orders';
  const urlOrderId = `https://lim015-burger-queen-api.herokuapp.com/orders/${idOrder}`;

  const fetchOrderId = async (url) => {
    setOrder(await fetch(url, {
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
  
// const openModalFetchUserId = () => {
//   openModalLookOrder();
//   fetchOrderId(urlOrderId);
// };

  const totalCst = (parameter) => {
    const array = parameter.products;
    let sum = 0;
    if (array) {
      array.forEach((prod) => {
        sum+= prod.product["price"];
      })
    }
    return sum;
  };

  return (
    <div className = 'container-one-order-look'>
      <button id={order._id} className = 'button-order-look' onClick = {openModalLookOrder}>Ver orden</button>
      <Modal isOpen = {isOpenLookOrder} closeModal = {closeModalLookOrder}>
        <h2>Resumen de la orden</h2>
        <div>
          <p>Mesero Id</p>
          <span>{order.userId}</span>
        </div>
        <div>
          <p>Cliente</p>
          <span>{order.client}</span>
        </div>
        <div>
          <p>Estado</p>
          <span>{order.status}</span>
        </div>
        <div>
          <p>Orden</p>
          <table>
          <thead>
            <tr className = 'products-order-header'>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          {
           order.products ? (order.products).map((product) => {
              return(
                <tbody key = {product._id}>
                  <tr  className = 'products-order-body'>
                    <td className = 'products-order-name'>{product.product["name"]}</td>
                    <td>{product.product["price"]}</td>
                    <td>{product.qty}</td>
                  </tr>
                </tbody>
              )
            }):null
          }
          </table>
        </div>
        <div>
          <p>Total</p>
          <span>S/ {totalCst(order)}</span>
        </div>
        <button id={order._id} className = 'btn-delete-product'>Modificar orden</button>
      </Modal>
    </div>
  )
};

export default LookOrder;