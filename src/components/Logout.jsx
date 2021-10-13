import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {

  const [loggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    localStorage.clear('token');
    setLoggedOut(true);

  };
  if (loggedOut) {
    return <Redirect to="/" push={true} />
  }
  return <button onClick={logout}>Salir</button>;
};

export default Logout;
