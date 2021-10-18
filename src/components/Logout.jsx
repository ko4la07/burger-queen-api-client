import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MdLogout } from "react-icons/md";

const Logout = () => {

  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    localStorage.clear('token');
    setLoggedOut(true);

  };
  if (loggedOut) {
    return <Redirect to="/" push={true} />
  }
  return <button onClick={logout}><MdLogout/> Salir </button>;
};

export default Logout;
