import React from 'react';
import Auth from './Auth';
import MenuViews from './MenuViews';
import '../styles/Home.css';

const Home = () => {
  function getToken() {
    const tokenString = localStorage.getItem('token');
    console.log(tokenString);
    return tokenString;
  };
  return getToken()?(
    <div className = 'container-home'>
      <MenuViews />
    </div>
  ):(<Auth />)
};

export default Home;
