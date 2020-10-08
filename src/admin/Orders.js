import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h4 className='text-info display-4'>Total Orders: {orders.length}</h4>
      );
    } else {
      return <h4 className='text-info display-4'>No orders</h4>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input type='text' value={value} className='form-control' readOnly />
    </div>
  );

  const handleStatusChange = (event, orderId) => {
    updateOrderStatus(user._id, token, orderId, event.target.value).then(data => {
      if(data.error) {
        console.log('Status update failed')
      } else {
        loadOrders()
      }
    })
  };

  const showStatus = order => {
    return (
      <div className='form-group'>
        <h4 className='mark mb-4'>Status: {order.status}</h4>
        <select
          className='form-control'
          onChange={event => handleStatusChange(event, order._id)}
        >
          <option>Update Status</option>
          {statusValues.map((status, idx) => (
            <option key={idx} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <Layout
      title='Orders'
      description={`Hello ${user.name}, you can manage all the orders here`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength()}
          {orders.map((order, oIdx) => {
            return (
              <div
                key={oIdx}
                className='mt-5'
                style={{ borderBottom: '2px solid black' }}
              >
                <h2 className='mb-5'>
                  <span className='bg-primary'>Order ID: {order._id}</span>
                </h2>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(order)}</li>
                  <li className='list-group-item'>
                    Transaction ID: {order.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: ${order.amount}</li>
                  <li className='list-group-item'>
                    Ordered by: {order.user.name}
                  </li>
                  <li className='list-group-item'>
                    Ordered on: {moment(order.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Delivery Address: {order.address}
                  </li>
                </ul>
                <h3 className='mt-4 mb-4 font-italic'>
                  Total products in the order: {order.products.length}
                </h3>
                {order.products.map((p, pIdx) => {
                  return (
                    <div
                      key={pIdx}
                      className='mb-4'
                      style={{ padding: '20px', border: '1px solid grey' }}
                    >
                      {showInput('Product brand', p.brand)}
                      {showInput('Product model', p.model)}
                      {showInput('Product price', p.price)}
                      {showInput('Product total', p.count)}
                      {showInput('Product Id', p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
