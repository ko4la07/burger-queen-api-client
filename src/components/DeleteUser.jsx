import React from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { MdOutlineDeleteOutline } from "react-icons/md";

const DeleteUser = ({dataUser,fetchUsers}) => {
  
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const urlUsers = 'https://lim015-burger-queen-api.herokuapp.com/users?limit=100';
  const urlUserId = `https://lim015-burger-queen-api.herokuapp.com/users/${dataUser._id}`;

  const deleteUser = async () => {
    fetch(urlUserId, {
      method :'DELETE',
      headers : {
        "Authorization" : `Bearer ${token}`,
      }
      })
      .then(response => response.json())
      .then((data) => data)
      .then(() => fetchUsers(urlUsers))
      .catch((error) => console.log(error));
  };
  
  const deleteAndClose = () => {
    deleteUser();
    closeModalDeleteUser();
  };

  const [isOpenDeleteUser, openModalDeleteUser, closeModalDeleteUser] = useModal(false);

  return (
    <>
      <button id = {dataUser._id} onClick = {openModalDeleteUser} className = 'btn-delete-table'><MdOutlineDeleteOutline /></button>
      <div>
      <Modal isOpen = {isOpenDeleteUser} closeModal = {closeModalDeleteUser}>
        <h2>Eliminar Usuario</h2>
        <span>¿Está seguro que desea eliminar este usuario?</span>
        <span style = {{fontWeight: 'bold'}}>{dataUser.email}</span>
        <button type = 'submit' onClick = {deleteAndClose} className = 'btn-delete-product'>Sí, eliminar.</button>
      </Modal>
      </div>
    </>
  )
}

export default DeleteUser;
