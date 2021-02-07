import React from 'react'
import './scss/app.scss'

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Home } from './pages/home'
import { Header } from './components/header'
import { Login } from './pages/login'
import { Form } from './pages/form'
import { Fill } from './pages/fill'
import { Auth, AuthRoute, GuestRoute } from './components/auth'

export function App () {
  return (
    <div className='container'>
      <Router>
        <Auth>
          <Header />
          <Switch>
            <GuestRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/' component={Home} />
            <AuthRoute exact path='/form' component={Form} />
            <AuthRoute exact path='/form/:_id' component={Form} />
            <AuthRoute exact path='/form/:_id/fill' component={Fill} />
          </Switch>
        </Auth>
      </Router>
    </div>
  )
}
