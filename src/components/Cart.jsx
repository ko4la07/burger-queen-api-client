import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { MdOutlineShoppingCart, MdCancel, MdAddCircle, MdRemoveCircle } from "react-icons/md";
// import { Link, useRouteMatch } from "react-router-dom";
import { useModal } from "../hooks/useModal";
// import { useEffect } from "react/cjs/react.development";
// import { useEffect } from "react/cjs/react.development";

const Cart = (props) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();

  // let { url } = useRouteMatch();
  // const { handleRemove,handleVaciar,productsOnCart } = props.data;
  const { handleRemove, handleVaciar, productsOnCart, handleAddition } = props;
  const [counts, setCounts] = useState({});
  // console.log(counts);
  const [userId, setUserId] = useState();
  const [client, setClient] = useState();
  const [products, setProducts] = useState([]);
  
  // const urlOrders = 'https://lim015-burger-queen-api.herokuapp.com/orders?limit=1000';
  const urlOrdersFetch = 'https://lim015-burger-queen-api.herokuapp.com/orders';

  const sendOrder = async () => {
    setProducts(productsOnCart.map((prod) => {
    const objectProduct = {
      qty: counts[prod._id],
      productId: prod._id
    }
    return objectProduct;
  }));
  // setProductsOrder(productsToOrder);
  console.log(products);

    const orderToSend = { userId, client, products};
    console.log(orderToSend);

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
      .then((data) => console.log(data))
      // .then(() => fetchProducts(urlOrders)) 
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

  return (
    <>
      <div>
        <p className = 'count-total'>{productsOnCart.length}</p>
        <button onClick ={openModalCart} className = 'icon-shopping-cart'><MdOutlineShoppingCart/></button>
      </div>
      <div className="modal-new-product">
        <Modal isOpen = {isOpenModalCart} closeModal = {closeModalCart}>
        <button className="btn-vaciar" onClick={() => vaciar()}>Vaciar</button>
          <h2>Carrito</h2>
          <div>
            <p>Mesero Id</p>
            <input type = 'text' onChange = {(e) => setUserId(e.target.value)}></input>
        </div>
        <div>
            <p>Cliente</p>
            <input type = 'text' onChange = {(e) => setClient(e.target.value)}></input>
        </div>
        {/* <div>
            <p>Estado</p>
            <span>estado</span>
        </div> */}
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
        <button type = 'submit' className = 'btn-delete-product' onClick = {sendOrder}>Enviar orden</button>
        </Modal>
      </div>
    </>
  )
};

export default Cart;
