import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({ product }) => {
  return (
    <div className='col-4 mb-3'>
      <div className='card' style={{width: '18rem'}}>
        <ShowImage item={product} url='product' />
        <div className='card-body'>
          <h5 className='card-title'>{product.brand}: {product.model}</h5>
          <p className='card-text'>
          {product.description}
          </p>
          <p>Size: {product.size}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.price}</p>
          <Link to='/'>
            <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>
              View Sneaker
            </button>
          </Link>
          <button className='btn btn-outline-warning mt-2 mb-2'>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
