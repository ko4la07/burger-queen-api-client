import React, { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { MdModeEdit } from "react-icons/md";

const UpdateProduct = ({dataProduct,fetchProducts}) => {
  
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [name, setName] = useState(dataProduct.name);
  const [type, setType] = useState(dataProduct.type);
  const [price, setPrice] = useState(dataProduct.price);
  const [image, setImage] = useState(dataProduct.image);
  
  const urlProducts = 'https://lim015-burger-queen-api.herokuapp.com/products';
  const urlProductsId = `https://lim015-burger-queen-api.herokuapp.com/products/${dataProduct._id}`;

  const updateProducts = () => {
    const credentials = { name, type, price, image };
    console.log(credentials);
    fetch(urlProductsId, {
      method :'PUT',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(credentials)
      })
      .then(response => response.json())
      // .then((data) => console.log(data))
      .then(() => fetchProducts(urlProducts))
      .catch((error) => console.log(error));
  };
  
  const updateAndClose = () => {
    updateProducts();
    closeModalUpdateProduct();
  };

  const [isOpenUpdateProduct, openModalUpdateProduct, closeModalUpdateProduct] = useModal(false);

  return (
    <>
      <button id = {dataProduct._id} onClick = {openModalUpdateProduct} className = 'btn-update-table'><MdModeEdit /> </button>
      <div>
      <Modal isOpen = {isOpenUpdateProduct} closeModal = {closeModalUpdateProduct}>
        <h2>Actualizar producto</h2>
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name = 'name' onChange = {(e) => setName(e.target.value)} value = {name}/>
        </div>
        <div>
          <label htmlFor="type">Tipo</label>
          <input type="text" name = 'type' onChange = {(e) => setType(e.target.value)} value = {type}/>
        </div>
        <div>
          <label htmlFor="price">Precio</label>
          <input type="number" name = 'price' onChange = {(e) => setPrice(Number(e.target.value))} value = {price}/>
        </div>
        <div>
          <label htmlFor="image">Imagen</label>
          <input type="text" name = 'image' onChange = {(e) => setImage(e.target.value)} value = {image}/>
        </div>
        <button type = 'submit' onClick = {updateAndClose} className = 'btn-update-product'>Enviar y actualizar</button>
      </Modal>
      </div>
    </>
  )
}

export default UpdateProduct;