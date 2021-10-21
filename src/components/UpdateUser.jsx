import React, { useState } from "react";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import { MdModeEdit } from "react-icons/md";

const UpdateUser = ({dataUser, fetchUsers}) => {
  
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  
  const [email, setEmail] = useState(dataUser.email);
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState(dataUser.roles[0].name);
  // console.log(dataUser._id);
  const urlUsers = 'https://lim015-burger-queen-api.herokuapp.com/users?limit=100';
  const urlUsersId = `https://lim015-burger-queen-api.herokuapp.com/users/${dataUser.email}`;

  const updateUser = () => {
    const credentials = { email, password, roles };
    // console.log(credentials);
    fetch(urlUsersId, {
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
      .then(() => fetchUsers(urlUsers))
      .catch((error) => console.log(error));
  };
  
  const updateAndClose = () => {
    updateUser();
    closeModalUpdateUser();
  };

  const [isOpenUpdateUser, openModalUpdateUser, closeModalUpdateUser] = useModal(false);

  return (
    <>
      <button id = {dataUser._id} onClick = {openModalUpdateUser} className = 'btn-update-table'><MdModeEdit /> </button>
      <div>
      <Modal isOpen = {isOpenUpdateUser} closeModal = {closeModalUpdateUser}>
        <h2>Actualizar usuario</h2>
        <div>
          <label htmlFor="email">Email</label>
          <input type="" name = 'email' onChange = {(e) => setEmail(e.target.value)} value = {email}/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="" name = 'password' onChange = {(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="roles">Roles</label>
          <select name ="roles" onChange={(e) => setRoles(e.target.value)} defaultValue = {dataUser.roles[0]._id} className = 'select-roles'>
            <option value={'615a747f726d6d07d7eae7a7'}>admin</option>
            <option value={'615a747f726d6d07d7eae7a5'}>user</option>
            <option value={'6170ed4ac2fa424eb5cb9351'}>chef</option>
            <option value={'615a747f726d6d07d7eae7a6'}>moderator</option>
          </select>
        </div>
        <button type = 'submit' onClick = {updateAndClose} className = 'btn-update-product'>Enviar y actualizar</button>
      </Modal>
      </div>
    </>
  )
}

export default UpdateUser;