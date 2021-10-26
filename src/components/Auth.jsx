import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../styles/Auth.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();

   useEffect(() => {
    if(localStorage.getItem('token')) {
       history.push('/principal/promo');
     } 
   });
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

  const login = async () => {
    const credentials = { email, password };
    let response = await fetch('https://lim015-burger-queen-api.herokuapp.com/auth', {
      method :'POST',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials)
      });
      response = await response.json();
      console.log(response); // obteniendo token

      // Acceso a la pagina, validando token de auth
      if (!response.token) {
        notify(response.message);
      } else {
        localStorage.setItem('token', JSON.stringify(response));
        localStorage.setItem('email', email);
        history.push('/principal/promo');
      }
  };

  return (
    <section className = 'container-login'>
      <div className = 'logo-bq-login box-login-grid'></div>
      <div className = 'box-login box-login-grid'>
        <div>
          <p>Todo empieza aquí !!!</p>
        </div>
        <div>
          <div className = 'input-login'>
            <label htmlFor="emailAuth">Ingresar correo</label>
            <input type="text" name = 'emailAuth' 
            onChange = {(e) => setEmail(e.target.value)} 
            placeholder = 'ejemplo@email.com'/>
          </div>
          <div className = 'input-login'>
            <label htmlFor="passwordAuth">Ingresar password</label>
            <input type="password" name = 'passwordAuth'
            onChange = {(e) => setPassword(e.target.value)} 
            placeholder = 'password'/>
          </div>
          <div>
          <button type = 'submit' onClick = {login}>Ingresar</button>
          </div>
          <div className = 'message-error-auth'>
          <ToastContainer toastStyle={{ backgroundColor: 'rgba(45, 45, 48, 1)', padding: '15px', fontSize: '16px', color: 'white',}} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Auth;
