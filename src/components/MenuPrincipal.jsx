import React from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
// import Products from './Products.jsx';
// import Orders from './Orders.jsx';
// import Users from './Users.jsx';
import Logout from './Logout.jsx';
import '../styles/MenuPrincipal.css';
import ProductsCart from "./ProductsCart";

const MenuPrincipal = () => {
  let { url } = useRouteMatch();
  return (
    <div className = 'views-menu'>
      <div className = 'personal-menu principal-menu'>
      {/* <div className = 'logo-aside'></div> */}
      <div className = 'line-aside'></div>
        <li>
          <Link to={`${url}/promo`}>Promociones</Link>
        </li>
        <li>
          <Link to={`${url}/burgers`}>Burgers</Link>
        </li>
        <li>
          <Link to={`${url}/complements`}>Complementos</Link>
        </li>
        <li>
          <Link to={`${url}/salad`}>Ensaladas</Link>
        </li>
        <li>
          <Link to={`${url}/drinks`}>Bebidas</Link>
        </li>
        <div className = 'logout-menu'>
        <Logout/>
        </div>
      </div>
      {/* <div className = 'line-menu'></div>
      <div className = 'line-mobile-menu'></div> */}
      <Switch>
        <Route path={`${url}/promo`}>
          <div className = 'products-cart-principal'>
            <h1>Promociones</h1>
            <ProductsCart type = {'promo'} />
          </div>
        </Route>
        <Route path={`${url}/burgers`}>
          <div className = 'products-cart-principal'>
            <h1>Burgers</h1>
            <ProductsCart type = {'burgers'} />
          </div>
        </Route>
        <Route path={`${url}/complements`}>
          <div className = 'products-cart-principal'>
            <h1>Complementos</h1>
            <ProductsCart type = {'complements'} />
          </div>
        </Route>
        <Route path={`${url}/salad`}>
          <div className = 'products-cart-principal'>
            <h1>Ensaladas</h1>
            <ProductsCart type = {'salad'} />
          </div>
        </Route>
        <Route path={`${url}/drinks`}>
          <div className = 'products-cart-principal'>
            <h1>Bebidas</h1>
            <ProductsCart type = {'drinks'} />
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default MenuPrincipal;