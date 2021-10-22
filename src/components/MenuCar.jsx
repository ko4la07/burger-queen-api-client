import React from "react";
import { Link } from "react-router-dom";
// import { MdOutlineShoppingCart } from "react-icons/md";
import Cart from "./Cart";

const MenuCar = (props) => {
  // let { url } = useRouteMatch();

  return (
    <nav className = 'container-menu-car'>
      <div>
        <li className = 'link-personal-area'>
          <Link to={`/home/orders`}>Mi área personal</Link>
        </li>
        <Cart data={props}/>
        {/* <li className = 'icon-shopping-cart'>
          <Link to={`${url}/cart`}><MdOutlineShoppingCart/></Link>
        </li> */}
      </div>
    </nav>
  )
}

export default MenuCar;