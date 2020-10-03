import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#29b1e3' };
  } else {
    return { color: '#292525' };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className='nav'>
      <li className='nav-item'>
        <Link className='nav-link' style={isActive(history, '/')} to='/'>
          Home
        </Link>
      </li>
      {!isAuthenticated() && (
        <Fragment>
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/signin')}
              to='/signin'
            >
              Signin
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              className='nav-link'
              style={isActive(history, '/signup')}
              to='/signup'
            >
              Signup
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li className='nav-item'>
          <span
            className='nav-link'
            style={{ cursor: 'pointer', color: '#292525' }}
            onClick={() =>
              signout(() => {
                history.push('/');
              })
            }
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
