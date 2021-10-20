import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";

const MenuCar = () => {
  let { url } = useRouteMatch();

  return (
    <div className = 'container-menu-car'>
      <div>
        <li className = 'link-personal-area'>
          <Link to={`/home/orders`}>Mi area personal</Link>
        </li>
        <li className = 'icon-shopping-cart'>
          <Link to={`${url}/cart`}><MdOutlineShoppingCart/></Link>
        </li>
      </div>
    </div>
  )
}

export default MenuCar;