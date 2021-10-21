import React, { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { MdAddCircleOutline } from "react-icons/md";
import ReturnButton from "./ReturnButton";

const CreateUser = ({fetchUsers}) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  
  const urlUsers = 'https://lim015-burger-queen-api.herokuapp.com/users?limit=1000';

  const postUser = async () => {
    const credentials = { email, password, roles };
    // console.log(credentials);
    fetch(urlUsers, {
      method :'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(credentials)
      })
      .then(response => response.json())
      // .then((data) => console.log(data))
      .then(() => fetchUsers(urlUsers))
      .catch((error) => console.log(error));
  };

  const postAndClose = () => {
    postUser();
    closeModalNewUser();
  };

  const [isOpenNewUser, openModalNewUser, closeModalNewUser] = useModal(false);

  return (
    <>
      <ReturnButton/>
      <div className = 'btn-new-product'>
      <button onClick ={openModalNewUser}><MdAddCircleOutline/> Crear nuevo usuario</button>
      </div>
      <div className = 'modal-new-product'>
      <Modal isOpen = {isOpenNewUser} closeModal = {closeModalNewUser}>
        <h2>Nuevo usuario</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name = 'email' onChange = {(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name = 'password' onChange = {(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input type="text" name = 'role' onChange = {(e) => setRoles([e.target.value])}/>
        </div>
        <button type = 'submit' onClick = {postAndClose} className = 'btn-create-product'>Crear usuario</button>
      </Modal>
      </div>
    </>
  )
}

export default CreateUser;