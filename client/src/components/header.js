import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './auth'

export function Header (props) {
  const authContext = useContext(AuthContext)

  return (
    <div className='row'>
      <div className='col-sm-12'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <ul className='navbar-nav navbar-right'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>Home</Link>
            </li>
          </ul>
          <ul className='navbar-nav navbar-right ml-auto'>
            <li className='nav-item'>
              {
                !authContext.isLoggedIn &&
                  <Link to='/login' className='nav-link'>Login</Link>
              }
              {
                authContext.isLoggedIn &&
                  <a
                    className='nav-link' onClick={() => {
                      window.location.href = '/api/auth/logout'
                    }}
                  >Logout
                  </a>
              }
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
