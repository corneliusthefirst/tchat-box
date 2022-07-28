import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppStateContextProvider } from './context/app-state-context'
import { ModalProvider } from './context/modal-context/modal-context'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // staleTime: Infinity,
    },
  },
})

const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <AppStateContextProvider>
        <ModalProvider>
          <Router>{children}</Router>
        </ModalProvider>
      </AppStateContextProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
