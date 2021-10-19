import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

const ReturnButton = () => {
return (
  <div className = 'container-header-menu-views'>
    <h2>Mi área personal</h2>
    <Link to={'/principal/promo'}><MdKeyboardBackspace/>Inicio</Link>
  </div>
)
};

export default ReturnButton;
