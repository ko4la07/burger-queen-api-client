import React from "react";
import Modal from "./Modal";
import { MdOutlineShoppingCart, MdCancel } from "react-icons/md";
// import { Link, useRouteMatch } from "react-router-dom";
import { useModal } from "../hooks/useModal";

const Cart = (props) => {
  // let { url } = useRouteMatch();
  const { handleRemove,handleVaciar,productsOnCart } = props.data;

  const remover = (product) => {
    handleRemove(product);
  }

  const vaciar = () => {
    handleVaciar();
  }

  const [isOpenModalCart, openModalCart, closeModalCart] = useModal(false);

  
  let total = 0;

  return (
    <>
      <li className = 'icon-shopping-cart'>
        <button onClick ={openModalCart} ><MdOutlineShoppingCart/></button>
      </li>
      <div className="modal-new-product">
        <Modal isOpen = {isOpenModalCart} closeModal = {closeModalCart}>
        <button waves="effect"className="boton-vaciar" onClick={() => vaciar()}>Vaciar</button>
          <h2>Resumen de la orden</h2>
          <ul>
          {productsOnCart ? productsOnCart.map((product, i) => {
            total += (product.id / 150);
            return (
              <li key={i} className="item-carrito">
                {`ID Producto: ${product.name}`}<button className="boton-eliminar-item" onClick={() => remover(product)}><MdCancel/></button>
              </li>
            )
          }): <p>Loading...</p> }
        </ul>
        <p className="multiline"><strong>{`Total: `}</strong> S/ {parseFloat(total.toFixed(2))}</p>
        </Modal>
      </div>
    </>
  )
};

export default Cart;
