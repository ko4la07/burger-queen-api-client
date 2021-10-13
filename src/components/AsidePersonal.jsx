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

const AsidePersonal = () => {
  let { url } = useRouteMatch();
  return (
    <aside>
      <ul>
        <li>
          <Link to={`${url}/orders`}>Todas las ordenes</Link>
        </li>
        <li>
          <Link to={`${url}/users`}>Usuarios</Link>
        </li>
        <li>
          <Link to={`${url}/products`}>Productos</Link>
        </li>
      </ul>
      <Logout/>
      <Switch>
        <Route path={`${url}/orders`}>
          <Orders />
        </Route>
        <Route path={`${url}/users`}>
          <Users />
        </Route>
        <Route path={`${url}/products`}>
          <Products/>
        </Route>
      </Switch>
    </aside>
  )
}

export default AsidePersonal;
