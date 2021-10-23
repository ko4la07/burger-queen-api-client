import React,{useState} from 'react';
import {
  // Switch,
  // Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Logout from './Logout.jsx';
import '../styles/MenuPrincipal.css';
import ProductsCart from "./ProductsCart";
import Cart from './Cart.jsx';

const MenuPrincipal = () => {
  let { url } = useRouteMatch();
  const [itemList, setItemList] = useState([]);

  const handleAddition = (item) => {
    setItemList([...itemList, item]);
  };

  const handleRemove = (item) => {
    const newItemList = itemList.filter(product => product._id !== item._id);
    setItemList(newItemList);
  };

  const handleVaciar = () => {
    setItemList([]);
  };
  
  return (
    <div>
      <nav>
      <div className = 'container-menu-car'>
        <li className = 'link-personal-area'>
          <Link to={`/home/orders`}>Mi área personal</Link>
        </li>
        <Cart productsOnCart={itemList} handleRemove={handleRemove} handleVaciar={handleVaciar}/>
      </div>
    </nav>
      <div className = 'menu-car-cart'>
        {/* <MenuCar productsOnCart={itemList} handleRemove={handleRemove} handleVaciar={handleVaciar}/> */}
      </div>
    <div className = 'views-menu'>
      <div className = 'personal-menu principal-menu'>
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
      <ProductsCart type={'promo'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList} />
      <ProductsCart type={'burgers'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList} />
      <ProductsCart type={'complements'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList} />
      <ProductsCart type={'salad'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList} />
      <ProductsCart type={'drinks'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList} />
      {/* <Switch>
        <Route path={`${url}/promo`}>
          <div className = 'products-cart-principal'>
            <h1>Promociones</h1>
            <ProductsCart type = {'promo'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList} />
          </div>
        </Route>
        <Route path={`${url}/burgers`}>
          <div className = 'products-cart-principal'>
            <h1>Burgers</h1>
            <ProductsCart type = {'burgers'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList}/>
          </div>
        </Route>
        <Route path={`${url}/complements`}>
          <div className = 'products-cart-principal'>
            <h1>Complementos</h1>
            <ProductsCart type = {'complements'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList}/>
          </div>
        </Route>
        <Route path={`${url}/salad`}>
          <div className = 'products-cart-principal'>
            <h1>Ensaladas</h1>
            <ProductsCart type = {'salad'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList}/>
          </div>
        </Route>
        <Route path={`${url}/drinks`}>
          <div className = 'products-cart-principal'>
            <h1>Bebidas</h1>
            <ProductsCart type = {'drinks'} handleAddition={handleAddition} handleRemove={handleRemove} productsOnCart={itemList}/>
          </div>
        </Route>
      </Switch> */}
    </div>
    </div>
  )
}

export default MenuPrincipal;