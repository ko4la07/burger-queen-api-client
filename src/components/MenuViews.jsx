import React from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Products from './Products.jsx';
import Orders from './Orders.jsx';
import Users from './Users.jsx';
import Logout from './Logout.jsx';
import '../styles/MenuViews.css';

const MenuViews = () => {
  let { url } = useRouteMatch();
  return (
    <div className = 'views-menu'>
      <div className = 'personal-menu'>
      <div className = 'logo-aside'></div>
      <div className = 'line-aside'></div>
        <li>
          <Link to={`${url}/orders`}>Ordenes</Link>
        </li>
        <li>
          <Link to={`${url}/users`}>Usuarios</Link>
        </li>
        <li>
          <Link to={`${url}/products`}>Productos</Link>
        </li>
        <div className = 'logout-menu'>
        <Logout/>
        </div>
      </div>
      <div className = 'line-menu'></div>
      <div className = 'line-mobile-menu'></div>
      <Switch>
        <Route path={`${url}/orders`}>
          <div><Orders /></div>
        </Route>
        <Route path={`${url}/users`}>
          <div><Users /></div>
        </Route>
        <Route path={`${url}/products`}>
          <div className = 'redirect-product'><Products/></div>
        </Route>
      </Switch>
    </div>
  )
}

export default MenuViews;
