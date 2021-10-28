import React from 'react';
import Auth from './Auth';
// import MenuViews from './MenuViews';
// import '../styles/Home.css';
import MenuByUserType from './MenuByUserType';

const Home = () => {
  function getToken() {
    const tokenString = localStorage.getItem('token');
    // console.log(tokenString); // token
    return tokenString;
  };
  return getToken()?(
    <div className = 'container-home'>
      {/* <MenuViews /> */}
      <MenuByUserType/>
    </div>
  ):(<Auth />)
};

export default Home;
