import React from "react";
import { useState } from "react/cjs/react.development";
import ChefView from "./ChefView";
import MenuViews from "./MenuViews";
import UserView from "./UserView";

const MenuByUserType = () => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();

  const [userRole, setUserRole] = useState();
  const [userId, setUserId] = useState();

  const email = localStorage.getItem('email');
  // console.log(email);

  const urlUserEmail = `https://lim015-burger-queen-api.herokuapp.com/users/${email}`;

  
  const loginType = () => {
    fetch(urlUserEmail, {
      method :'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      })
      .then(response => response.json())
      .then((data) => {
        // console.log(data);
        setUserRole(data.roles[0]);
        setUserId(data._id)
      })
      // .then(() => fetchProducts(urlOrders)) 
      .catch((error) => console.log(error));
  };
  loginType();

  // console.log(userId);

  const roleType = () => {
    switch (userRole) {
      case "615a747f726d6d07d7eae7a7":
        return (
          <MenuViews />
        );
      case "615a747f726d6d07d7eae7a5":
        return (
          <UserView userId = {userId}/>
        );
      case "6170ed4ac2fa424eb5cb9351":
        return (
          <ChefView />
        );
      default:
        return <h2>Cargando ...</h2>
    }
  }

  return (
    <>
      {roleType()}
    </>
  )
};

export default MenuByUserType;
