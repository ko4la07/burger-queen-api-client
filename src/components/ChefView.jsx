import React from 'react';
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Logout from './Logout.jsx';
import '../styles/MenuViews.css';
import ModifyAccount from './ModifyAccount.jsx';
import OrdersChef from './OrdersChef.jsx';

const ChefView = () => {
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
          <Link to={`${url}/account`}>Modificar cuenta</Link>
        </li>
        <div className = 'logout-menu'>
        <Logout/>
        </div>
      </div>
      <div className = 'line-menu'></div>
      <div className = 'line-mobile-menu'></div>
      <Switch>
        <Route path={`${url}/orders`}>
          <div><OrdersChef /></div>
        </Route>
        <Route path={`${url}/account`}>
          <div><ModifyAccount /></div>
        </Route>
      </Switch>
    </div>
  )
}

export default ChefView;