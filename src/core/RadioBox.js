import React, { useState, useEffect } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setVales] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value)
    setVales(event.target.value)
  }

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
        type='radio'
        className='mr-2 ml-4'
      />
      <label className='form-radio-label'>{p.name}</label>
    </div>
  ));
};

export default RadioBox;
