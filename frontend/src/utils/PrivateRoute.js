import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Layout from '../components/Layout'

import { LOGIN_PAGE } from '../constants/history.constants'
import { useAppState } from '../context/app-state-context'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { appState } = useAppState()
  const user = appState.user

  function renderComponent(props) {
    if (user) {
      return <Layout Component={Component} user={user} {...props} />
    }

    return (
      <Redirect
        to={{ pathname: LOGIN_PAGE, state: { from: props.location } }}
      />
    )
  }
  return <Route {...rest} render={renderComponent} />
}
