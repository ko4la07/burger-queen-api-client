import React,{useState} from 'react';
import {
  // Switch,
  // Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Logout from './Logout.jsx';
import ProductsCart from "./ProductsCart";
import Cart from './Cart.jsx';

const MenuPrincipal = () => {
  const { url } = useRouteMatch();
  const [itemList, setItemList] = useState([]);
  // console.log(itemList);

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
        <Cart productsOnCart={itemList} handleRemove={handleRemove} handleVaciar={handleVaciar} handleAddition = {handleAddition}/>
      </div>
    </nav>
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
    </div>
    </div>
  )
}

export default MenuPrincipal;