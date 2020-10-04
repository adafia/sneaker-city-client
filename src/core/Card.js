import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cardHelpers';

const Card = ({
  product,
  cardSize = 18,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to='/cart' />;
    }
  };

  const handleChange = productId => event => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className='input-group mb-3'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Adjust Quantity</span>
            </div>
            <input
              type='number'
              className='form-control'
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className='btn btn-outline-danger mt-2 mb-2'
        >
          Remove Product
        </button>
      )
    );
  };

  return (
    <div className='col-4 mb-3'>
      <div className='card' style={{ width: `${cardSize}rem` }}>
        {shouldRedirect(redirect)}
        <ShowImage item={product} url='product' />
        <div className='card-body'>
          <h5 className='card-title'>
            {product.brand}: {product.model}
          </h5>
          <p className='card-text'>
            {product.description}{' '}
            <span class='badge badge-info p-2 ml-2'>
              {product.category.name}
            </span>
            <span class='badge badge-warning p-2 ml-2'>${product.price}</span>
          </p>
          <Link to={`/product/${product._id}`}>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              View Sneaker
            </button>
          </Link>
          {showAddToCartButton && (
            <button onClick={addToCart} className='btn btn-warning mt-2 mb-2'>
              Add to cart
            </button>
          )}
          {showRemoveButton(showRemoveProductButton)}
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Card;
