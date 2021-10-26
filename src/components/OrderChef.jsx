import React from 'react';
// import LookOrder from './LookOrder';

const Order = ({orders}) => {
  return (
    <div className = 'products-cart-box'>
      {
          orders.map((item, index) => (
            <div key = {index} className = 'one-order-box-chef'>
              {/* <div className = 'one-order-rows'>
                <p className = 'rows-name'>User Id</p>
                <p>{item.userId}</p>
              </div> */}
              <div className = 'one-order-rows'>
                <p className = 'rows-name'>Cliente</p>
                <p>{item.client}</p>
              </div>
              <div className = 'one-order-rows'>
                <p className = 'rows-name'>Estado</p>
                <p>{item.status}</p>
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
                  item.products ? (item.products).map((product) => {
                      return(
                        <tbody key = {product._id}>
                          <tr  className = 'products-order-body'>
                            <td className = 'products-order-name'>{product.product["name"]}</td>
                            {/* <td>{product.product["price"]}</td> */}
                            <td className = 'products-order-qty'>{product.qty}</td>
                          </tr>
                        </tbody>
                      )
                    }):null
                  }
              </table>
              </div>
              <button className = 'btn-listo-chef'>Listo</button>
              {/* <LookOrder idOrder = {item._id}/> */}
            </div>
          ))
        }
    </div>
  )
};

export default Order;