import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import Card from './Card';
import Checkout from './Checkout';
import { getCart } from './cardHelpers';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = items => {
    return (
      <Fragment>
        <h4 className='mb-4 display-4' style={{ fontSize: '30px' }}>
          Your cart has {`${items.length}`} items
        </h4>
        <hr />
        <div className='row'>
          {items.map((product, i) => (
            <Card
              key={i}
              product={product}
              cardSize={20}
              showAddToCartButton={false}
              cartUpdate={true}
              showRemoveProductButton={true}
              setRun={setRun}
              run={run}
            />
          ))}
        </div>
      </Fragment>
    );
  };

  const noItemsMessage = () => (
    <p>
      {' '}
      Your cart is empty. <Link to='/shop'>Continue shopping</Link>
    </p>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add, remove, checkout or continue shopping'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-8'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-4 text-center'>
          <h4 className='mb-4 display-4' style={{ fontSize: '30px' }}>
            Your cart summary
          </h4>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
