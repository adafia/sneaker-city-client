import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct, getCategories } from './apiAdmin';

const AddProduct = () => {
  const [values, setValues] = useState({
    brand: '',
    model: '',
    description: '',
    price: '',
    category: '',
    categories: [],
    size: '',
    quantity: '',
    photo: '',
    shipping: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  });

  const { user, token } = isAuthenticated();

  const {
    brand,
    model,
    description,
    price,
    category,
    categories,
    size,
    quantity,
    shipping,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories
  const init = () => {
    getCategories().then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, categories: data, formData: new FormData })
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({...values, [name]: value})
  } 

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: '', loading: true})

    createProduct(user._id, token, formData).then(data => {
      if(data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({
          ...values, brand: '', model: '', description: '', photo: '', price: '', quantity: '', size: '', loading: false, createdProduct: data.model
        })
      }
    })
  }

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Add Photo</h4>
      <div className="form-group">
        <label className='btn btn-secondary'>
        <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*'/>
        </label>
      </div>
      <div className="form-group">
        <label className='text-muted'>Brand name</label>
        <input onChange={handleChange('brand')} type='text' className='form-control' value={brand}/>
      </div>
      <div className="form-group">
        <label className='text-muted'>Model</label>
        <input onChange={handleChange('model')} type='text' className='form-control' value={model}/>
      </div>
      <div className="form-group">
        <label className='text-muted'>Description</label>
        <textarea onChange={handleChange('description')} className='form-control' value={description}/>
      </div>
      <div className="form-group">
        <label className='text-muted'>Price</label>
        <input onChange={handleChange('price')} type='number' className='form-control' value={price}/>
      </div>
      <div className="form-group">
        <label className='text-muted'>Size</label>
        <input onChange={handleChange('size')} type='number' className='form-control' value={size}/>
      </div>
      <div className="form-group">
        <label className='text-muted'>Quantity</label>
        <input onChange={handleChange('quantity')} type='number' className='form-control' value={quantity}/>
      </div>
      <div className="form-group">
        <label className='text-muted'>Category</label>
        <select onChange={handleChange('category')} className='form-control'>
          <option>Please select a category</option>
          {categories && categories.map((c, i) => (<option key={i}value={c._id}>{c.name}</option>))}
        </select>
      </div>
      <div className="form-group">
        <label className='text-muted'>Shipping</label>
        <select onChange={handleChange('shipping')} className='form-control'>
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  )

  const showError = () => (
    <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>{error}</div>
  )

  const showSuccess = () => (
    <div className='alert alert-info' style={{display: createdProduct ? '' : 'none'}}>
      {createdProduct} has been created successfully
    </div>
  )

  const showLoading = () => (
    loading && (<div className='alert alert-success'>Loading...</div>)
  )
  return (
    <Layout
      title='Add a new product'
      description={`Hello ${user.name}, ready to add a new product?`}
    >
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
