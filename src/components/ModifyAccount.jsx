import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReturnButton from "./ReturnButton";
import '../styles/ModifyAccount.css';

const ModifyAccount = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();
  // console.log(token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [roles, setRoles] = useState([]);
  // console.log(email);
  // const urlUsers = 'https://lim015-burger-queen-api.herokuapp.com/users?limit=1000';
  const urlUsersFetch = `https://lim015-burger-queen-api.herokuapp.com/users/${email}`;

  const putUser = () => {
    const credentials = { email, password};
    // console.log(credentials);
    fetch(urlUsersFetch, {
      method :'PUT',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(credentials)
      })
      .then(response => response.json())
      .then((data) => {
        notifySuccess('The information was successfully changed');
      })
      // .then(() => fetchUsers(urlUsers))
      .catch((error) => {
        // console.log(error);
        notify('The email does not correspond to the user :c');
      });
  };
  const notify = (message) => toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const notifySuccess = (message) => toast.success(message, {
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
      <ReturnButton/>
    <div className = 'container-account'>
      <h2>Ingresa tu nueva información</h2>
        <div className = 'account-rows'>
          <label htmlFor="email">Ingresar email</label>
          <input type="text" name = 'email' onChange = {(e) => setEmail(e.target.value)}/>
        </div>
        <div className = 'account-rows'>
          <label htmlFor="password">Ingresar password</label>
          <input type="text" name = 'password' onChange = {(e) => setPassword(e.target.value)}/>
        </div>
        <button type = 'submit' onClick = {putUser} className = 'btn-create-product'>Enviar y modificar.</button>
        <div className = 'message-error-auth'>
          <ToastContainer toastStyle={{ backgroundColor: 'rgba(45, 45, 48, 1)', padding: '15px', fontSize: '16px', color: 'white',}} />
        </div>
    </div>
    </>
  )
};

export default ModifyAccount;
