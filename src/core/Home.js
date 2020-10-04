import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import Search from './Search';
import { getProducts } from './apiCore';

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);
  return (
    <Layout title='Sneaker City' description='Sponsored by Bank of Kigali' className='container'>
      <Search />
      <h2 className='mb-4 display-4' style={{ fontSize: '30px' }}>New Arrivals</h2>
      <div className='row'>
        {productsByArrival.map((product, idx) => (
          <Card key={idx} product={product} />
        ))}
      </div>
      <hr />
      <h2 className='mb-4 display-4' style={{ fontSize: '30px' }}>Best Selling Sneakers</h2>
      <div className='row'>
        {productsBySell.map((product, idx) => (
          <Card key={idx} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
