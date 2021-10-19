import React from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

const DeleteProduct = ({dataProduct,fetchProducts}) => {
  
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const urlProducts = 'https://lim015-burger-queen-api.herokuapp.com/products';
  const urlProductsId = `https://lim015-burger-queen-api.herokuapp.com/products/${dataProduct._id}`;

  const deleteProducts = async () => {
    fetch(urlProductsId, {
      method :'DELETE',
      headers : {
        "Authorization" : `Bearer ${token}`,
      }
      })
      .then(response => response.json())
      .then((data) => notify(data.message))
      .then(() => fetchProducts(urlProducts))
      .catch((error) => console.log(error));
  };
  
  const deleteAndClose = () => {
    deleteProducts();
    closeModalDeleteProduct();
  };

  const [isOpenDeleteProduct, openModalDeleteProduct, closeModalDeleteProduct] = useModal(false);

  // funcion notificaciones de error en el auth
  const notify = (message) => toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  return (
    <>
      <button id = {dataProduct._id} onClick = {openModalDeleteProduct} className = 'btn-delete-table'><MdOutlineDeleteOutline /></button>
      <div>
      <Modal isOpen = {isOpenDeleteProduct} closeModal = {closeModalDeleteProduct}>
        <h2>Borrar producto</h2>
        <p>¿Está seguro que quiere borrar este producto?</p>
        <button type = 'submit' onClick = {deleteAndClose} className = 'btn-delete-product'>Sí, borrar.</button>
      </Modal>
      </div>
      <div className = 'message-error-auth'>
        <ToastContainer toastStyle={{ backgroundColor: 'rgba(45, 45, 48, 1)', padding: '15px', fontSize: '16px', color: 'white',}} />
      </div>
    </>
  )
}

export default DeleteProduct;