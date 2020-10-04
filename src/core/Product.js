import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Layout from './Layout';
import ShowImage from './ShowImage';
import Card from './Card';
import { read, listRelated } from './apiCore';

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProduct(data);
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  const showAddToCartButton = () => {
    return <button className='btn btn-warning mt-2 mb-2'>Add to cart</button>;
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className='badge badge-success  p-2 ml-3'>{quantity} In Stock</span>
    ) : (
      <span className='badge badge-danger p-2 ml-3'>Out of Stock</span>
    );
  };

  return (
    <Layout
      title={product && product.brand}
      description={product && `${product.model} : ${product.description}`}
      className='container'
    >
      <div className='row'>
        <div className='col-9'>
          <div class='card' style={{ width: '50rem' }}>
            <ShowImage item={product} url='product' />
            <div class='card-body'>
              <h5 class='card-title'>
                {product.model}{' '}
                <span class='badge badge-primary p-2 ml-3'>
                  Price: ${product.price}
                </span>
              </h5>
              <p class='card-text'>
                {product.description}{' '}
                <span class='badge badge-warning badge-pill p-2 ml-3'>
                  {product.category && product.category.name}
                </span>
              </p>
            </div>
            <ul class='list-group list-group-flush'>
              <li class='list-group-item'>
                Size:
                <span class='badge badge-light p-2 ml-3'>
                  {product.size} (EUR)
                </span>
              </li>
              <li class='list-group-item'>
                Availability: {showStock(product.quantity)}
              </li>
              <li class='list-group-item text-center'>
                <em>Added {moment(product.createdAt).fromNow()}</em>
              </li>
            </ul>
            <div class='card-body text-right'>{showAddToCartButton()}</div>
          </div>
        </div>
        <div className='col-3'>
          <h4>Related Products</h4>
          {relatedProducts.map((p, i) => (
            <Card key={i} product={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
