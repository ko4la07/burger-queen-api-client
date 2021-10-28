import React from 'react';
import {
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
// import Products from './Products.jsx';
import OrdersUser from './OrdersUser.jsx';
// import Users from './Users.jsx';
import Logout from './Logout.jsx';
import '../styles/MenuViews.css';
import ModifyAccount from './ModifyAccount.jsx';

const UserView = ({userId}) => {
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
          <div><OrdersUser userId = {userId} /></div>
        </Route>
        <Route path={`${url}/account`}>
          <div><ModifyAccount /></div>
        </Route>
      </Switch>
    </div>
  )
}

export default UserView;
