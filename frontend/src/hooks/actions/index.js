import React from 'react'
import { useAppState } from '../../context/app-state-context'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

export function GetMe() {
  const { appState } = useAppState()
  return appState?.user ? appState?.user : null
}

export const RouteChangeTracker = withRouter(({ history }) => {
  history.listen((location, _action) => {
    ReactGA.set({ page: location.pathname })
    ReactGA.pageview(location.pathname)
  })

  return <div></div>
})
