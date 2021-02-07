import React from 'react'

export function Login (props) {
  return (
    <div className='row'>
      <div className='col-sm-12'>
        <div className='jumbotron text-center'>
          <button
            className='btn btn-primary' onClick={() => {
              window.location.href = '/api/auth/google'
            }}
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  )
}
