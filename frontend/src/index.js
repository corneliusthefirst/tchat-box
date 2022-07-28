import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppProviders from './AppProviders'

import ReactGA from 'react-ga'

const TRACKING_ID = 'G-GS3MZ3KVS3'

ReactGA.initialize(TRACKING_ID, {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 235791013,
    siteSpeedSampleRate: 100,
  },
})

class Index extends React.Component {
  render() {
    return (
      <AppProviders>
        <App />
      </AppProviders>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
