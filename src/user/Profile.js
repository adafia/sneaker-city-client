import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = props => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();
  const { name, email, password, error, success } = values;

  const init = userId => {
    read(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(props.match.params.userId);
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    update(props.match.params.userId, token, { name, email, password }).then(
      data => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateUser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if(success) {
      return <Redirect to='/cart' />
    }
  }

  const profileUpdate = (name, email, password) => {
    return (
      <form>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            className='form-control'
            type='text'
            onChange={handleChange('name')}
            value={name}
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input
            className='form-control'
            type='email'
            onChange={handleChange('email')}
            value={email}
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input
            className='form-control'
            type='password'
            onChange={handleChange('password')}
            value={password}
          />
        </div>
        <button onClick={clickSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
    );
  };
  return (
    <Layout
      title='Profile'
      description='Update your profile'
      className='container'
    >
      <h2 className='mb-4 display-4' style={{ fontSize: '30px' }}>
        Profile Update
      </h2>
      {profileUpdate(name, email, password)}
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
