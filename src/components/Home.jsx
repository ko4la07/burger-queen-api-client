import React from 'react';
import Auth from './Auth';
// import MensajeReutilizableDayana from './MensajeReutilizableDayana';
import AsidePersonal from './AsidePersonal';

const Home = () => {
  function getToken() {
    const tokenString = localStorage.getItem('token');
    console.log(tokenString);
    return tokenString;
  };
  return getToken()?(
    <div>
      <AsidePersonal />
      <h1>Dayana!</h1>
    </div>
  ):(<Auth />)
};

export default Home;
