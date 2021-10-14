import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

const MenuCar = () => {
  let { url } = useRouteMatch();

  return (
    <div>
      <div className = 'personal-menu'>
        <li>
          <Link to={`/home/orders`}>Mi area personal</Link>
        </li>
        <li>
          <Link to={`${url}/cart`}>carrito</Link>
        </li>
      </div>
    </div>
  )
}

export default MenuCar;