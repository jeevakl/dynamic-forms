import React, { useEffect, useState, createContext, useContext } from 'react'
import { Redirect, useHistory, Route } from 'react-router-dom'
import { me, api } from '../api'

export const AuthContext = createContext(
  {
    loading: false,
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    user: null
  }
)

export function Auth (props) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  const login = (user) => {
    setUser(user)
    setLoggedIn(true)
    setLoading(false)
  }
  const logout = () => {
    setUser(null)
    setLoggedIn(false)
    setLoading(false)
  }

  useEffect(
    () => {
      api.interceptors.response.use(response => {
        if (response.data && response.data.status === 401) {
          logout()
          history.push('/login')
        } else {
          return response
        }
      })
    },
    []
  )

  useEffect(
    () => {
      me().then(response => {
        if (response) {
          login(response.user)
        } else {
          history.push('/login')
        }
      })
    },
    []
  )

  return (
    <AuthContext.Provider value={{ isLoggedIn: loggedIn, login: login, logout: logout, user: user, loading }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function GuestRoute (props) {
  const authContext = useContext(AuthContext)

  if (authContext.loading) {
    return 'Loading...'
  } else if (authContext.isLoggedIn) {
    return <Redirect to='/' />
  } else {
    return <Route {...props} />
  }
}

export function AuthRoute (props) {
  const authContext = useContext(AuthContext)

  if (authContext.loading) {
    return 'Loading...'
  } else if (!authContext.isLoggedIn) {
    return <Redirect to='/login' />
  } else {
    return <Route {...props} />
  }
}
