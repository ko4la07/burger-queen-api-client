import React, { useState, useEffect  } from 'react';

const OrderChef = ({order, fetchOrders}) => {
  function getToken() {
    const token = JSON.parse(localStorage.getItem('token'))['token'];
    return token;
  };
  const token = getToken();

  const [status, setStatus] = useState(order.status);
  // console.log(status);

  const urlOrders = 'https://lim015-burger-queen-api.herokuapp.com/orders?limit=10000';
  const urlOrdersFetch = `https://lim015-burger-queen-api.herokuapp.com/orders/${order._id}`;

  const updateStatus = () => {
    const orderStatus = {status};
    fetch(urlOrdersFetch, {
      method :'PUT',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify(orderStatus)
      })
      .then(response => response.json())
      // .then((data) => console.log(data))
      .then(() => fetchOrders(urlOrders)) 
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    updateStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[status]);

  return (
    <div>
      {
        <div key = {order._id} className = 'one-order-box-chef'>
          <div className = 'one-order-rows'>
            <p className = 'rows-name'>Cliente</p>
            <p>{order.client}</p>
          </div>
          <div className = 'one-order-rows'>
            <p className = 'rows-name'>Estado</p>
            <p>{order.status}</p>
          </div>
          <div>
          <table>
            <thead>
              <tr className = 'products-order-header'>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            {
              order.products ? (order.products).map((product) => {
                  return(
                    <tbody key = {product._id}>
                      <tr  className = 'products-order-body'>
                        <td className = 'products-order-name'>{product.product["name"]}</td>
                        <td className = 'products-order-qty'>{product.qty}</td>
                      </tr>
                    </tbody>
                  )
                }):null
              }
          </table>
          </div>
          <div>
            <select name ="roles" onChange={(e) => setStatus(e.target.value)} defaultValue = {order.status} className = 'select-status'>
              <option value={'pending'}>pending</option>
              <option value={'preparing'}>preparing</option>
              <option value={'delivering'}>delivering</option>
            </select>
          </div>
        </div>
      }
    </div>
  )
};

export default OrderChef;