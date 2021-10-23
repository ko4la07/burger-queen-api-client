import React from "react";
import Modal from "./Modal";
import { MdOutlineShoppingCart, MdCancel } from "react-icons/md";
// import { Link, useRouteMatch } from "react-router-dom";
import { useModal } from "../hooks/useModal";

const Cart = (props) => {
  // let { url } = useRouteMatch();
  // const { handleRemove,handleVaciar,productsOnCart } = props.data;
  const { handleRemove,handleVaciar,productsOnCart } = props;


  const remover = (product) => {
    handleRemove(product);
  }

  const vaciar = () => {
    handleVaciar();
  }

  const [isOpenModalCart, openModalCart, closeModalCart] = useModal(false);
  // console.log('total productos:',productsOnCart.length);
  
  let total = 0;

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
            <>mesero id</>
        </div>
        <div>
            <p>Cliente</p>
            <input></input>
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
          {productsOnCart ? productsOnCart.map((product, i) => {
            total += (product.price);
            return (
              <tbody key={i} className="item-carrito">
              <tr  className = 'products-order-body'>
                <td className = 'products-order-name'>{product.name}</td>
                <td>{product.price}</td>
                <td></td>
                <td><button className="boton-eliminar-item" onClick={() => remover(product)}><MdCancel/></button></td>
              </tr>
              </tbody>
            )
          }): <p>Loading...</p> }
        </table>
        <div className="total-price"><strong>{`Total: `}</strong> S/ {parseFloat(total.toFixed(2))}</div>
        <button className = 'btn-delete-product'>Enviar orden</button>
        </Modal>
      </div>
    </>
  )
};

export default Cart;
