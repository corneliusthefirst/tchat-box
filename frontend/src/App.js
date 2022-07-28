import React, { useEffect } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import './index.scss'
import './app.styles.scss'
import Home from './pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Me from './pages/Me'
import Register from './pages/Register'
import PrivateRoute from './utils/PrivateRoute'
import { RouteChangeTracker } from './hooks/actions'

const App = () => {
  return (
    <Switch>
      <RouteChangeTracker />
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <PrivateRoute exact path='/channels' component={Home} />
      <PrivateRoute exact path='/channels/me' component={Me} />
      <PrivateRoute exact path='/channels/me/:dmId' component={Me} />
    </Switch>
  )
}

export default App
