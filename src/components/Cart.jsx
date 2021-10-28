import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { MdOutlineShoppingCart, MdCancel, MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { useModal } from "../hooks/useModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = (props) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();

  const { handleRemove, handleVaciar, productsOnCart, handleAddition } = props;
  const [counts, setCounts] = useState({});
  // console.log(productsOnCart);
  const [userId, setUserId] = useState();
  const [client, setClient] = useState();
  
  // const urlOrders = 'https://lim015-burger-queen-api.herokuapp.com/orders?limit=1000';
  const urlOrdersFetch = 'https://lim015-burger-queen-api.herokuapp.com/orders';

    const products = [...new Set(productsOnCart)].map((prod) => {
      const objectProduct = {
        qty: counts[prod._id],
        productId: prod._id
      }
      return objectProduct;
    });
    // console.log(products);

  const sendOrder = () => {
    const orderToSend = { userId, client, products};
    // console.log(orderToSend);

    fetch(urlOrdersFetch, {
      method :'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(orderToSend)
      })
      .then(response => response.json())
      // .then((data) => console.log(data))
      .then(() => {
        notifySuccess('The order was sent successfully ');
      }) 
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    checkProductsQTY();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[productsOnCart]);

  const removerOne = (product) => {
    productsOnCart.splice(productsOnCart.indexOf(product), 1);
    checkProductsQTY();

    if (!(counts[product._id])) {
      handleRemove(product);
    }
  };

  const remover = (product) => {
    handleRemove(product);
  };

  const vaciar = () => {
    handleVaciar();
  };

  const [isOpenModalCart, openModalCart, closeModalCart] = useModal(false);
  // console.log('total productos:',productsOnCart.length);
  
  let total = 0;

  const checkProductsQTY = () => {
    const cont = {};
    for(const product of productsOnCart) {
      cont[product._id] = cont[product._id] ? cont[product._id] + 1 : 1;
    }
    setCounts(cont);
  };

  const addOne = (product) => {
    handleAddition(product);
  };

  const notifySuccess = (message) => toast.success(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  // --------
  // const orderId = localStorage.getItem('orderId');
  // const urlOrderId = `https://lim015-burger-queen-api.herokuapp.com/orders/${orderId}`;

  // const orderToModify = async (url) => {
  //   fetch(url, {
  //     method :'GET',
  //     headers : {
  //       'Accept': 'application/json',
  //       "Authorization" : `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       data.products.forEach((element) => {
  //         productsOnCart.push(element.product);
  //       })
  //     })
  //     .catch((error) => console.log(error))
  // };
  // console.log(productsOnCart);

  //   useEffect(() => {
  //     // orderToModify(urlOrderId);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[productsOnCart])
  // --------

  const sendAndClose = () => {
    sendOrder();
    closeModalCart();
    vaciar();
    document.querySelector('#inputMesero').value = '';
    document.querySelector('#inputClient').value = '';
  };

  return (
    <>
      <div>
        <p className = 'count-total'>{productsOnCart.length}</p>
        <button onClick ={openModalCart} className = 'icon-shopping-cart'><MdOutlineShoppingCart/></button>
      </div>
      <div className="modal-new-product">
        <Modal isOpen = {isOpenModalCart} closeModal = {closeModalCart}>
        <div>
        <button className="btn-vaciar" onClick={() => vaciar()}>Vaciar</button>
        {/* <button className="btn-vaciar" onClick = {() => orderToModify(urlOrderId)}>Orden por modificar</button> */}
        </div>
          <h2>Carrito</h2>
          <div>
            <p>Mesero Id</p>
            <input id = 'inputMesero' type = 'text' onChange = {(e) => setUserId(e.target.value)}></input>
        </div>
        <div>
            <p>Cliente</p>
            <input id = 'inputClient' type = 'text' onChange = {(e) => setClient(e.target.value)}></input>
        </div>
          <table>
          <thead>
            <tr className = 'products-order-header'>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th></th>
            </tr>
          </thead>
          {productsOnCart ? [...new Set(productsOnCart)].map((product, i) => {
            total += (product.price*counts[product._id]);
            return (
              <tbody key={i} className="item-carrito">
              <tr  className = 'products-order-body'>
                <td className = 'products-order-name'>{product.name}</td>
                <td>{product.price}</td>
                <td className = 'products-order-count'>
                <button onClick={() => removerOne(product)} className = 'btn-add-remove'><MdRemoveCircle/></button>
                  {counts[product._id]}
                  <button onClick={() => addOne(product)} className = 'btn-add-remove'><MdAddCircle/></button>
                  </td>
                <td><button className="boton-eliminar-item" onClick={() => remover(product)}><MdCancel/></button></td>
              </tr>
              </tbody>
            )
          }): <p>Loading...</p> }
        </table>
        <div className="total-price"><strong>{`Total: `}</strong> S/ {parseFloat(total.toFixed(2))}</div>
        <button type = 'submit' className = 'btn-delete-product' onClick = {sendAndClose}>Enviar orden</button>
        </Modal>
      </div>
      <div className = 'message-error-auth'>
          <ToastContainer toastStyle={{ backgroundColor: 'rgba(45, 45, 48, 1)', padding: '15px', fontSize: '16px', color: 'white',}} />
      </div>
    </>
  )
};

export default Cart;
