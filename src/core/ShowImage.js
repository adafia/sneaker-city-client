import React from 'react';
import { API } from '../config';

const ShowImage = ({ item, url }) => (
  <img
    className='card-img-top'
    src={`${API}/${url}/photo/${item._id}`}
    alt={item.model}
    style={{ maxHeight: '100%', maxWidth: '100%' }}
  />
);

export default ShowImage;
