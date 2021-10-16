import React, { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";

const CreateProduct = ({fetchProducts}) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  
  const urlProducts = 'https://lim015-burger-queen-api.herokuapp.com/products';

  const postProducts = async () => {
    const credentials = { name, type, price, image };
    console.log(credentials);
    fetch(urlProducts, {
      method :'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(credentials)
      })
      .then(response => response.json())
      .then((data) => console.log(data))
      .then(() => fetchProducts(urlProducts))
      .catch((error) => console.log(error));
  };

  const closeM = () => {
    postProducts();
    closeModalNewProduct();
  };

  const [isOpenNewProduct, openModalNewProduct, closeModalNewProduct] = useModal(false);

  return (
    <>
      <div className = 'btn-new-product'>
      <button onClick ={openModalNewProduct}>Crear nuevo producto</button>
      </div>
      <div className = 'modal-new-product'>
      <Modal isOpen = {isOpenNewProduct} closeModal = {closeModalNewProduct}>
        <h2>Nuevo producto</h2>
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" name = 'name' onChange = {(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="type">Tipo</label>
          <input type="text" name = 'type' onChange = {(e) => setType(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="price">Precio</label>
          <input type="text" name = 'price' onChange = {(e) => setPrice(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="image">Imagen</label>
          <input type="text" name = 'image' onChange = {(e) => setImage(e.target.value)}/>
        </div>
        <div>
          <button type = 'submit' onClick = {closeM}>Crear producto</button>
        </div>
      </Modal>
      </div>
    </>
  )
}

export default CreateProduct;