import React from 'react'
import { useRouteMatch, useLocation } from 'react-router-dom'
import InnerProfile from './InnerProfile'
import Friends from './FriendsPage'
import DMPage from './DMPage'
import { ME_PAGE } from '../../constants/history.constants'
import useMeSocket from '../../api/socket/useMeSocket'

export default function Index({ ProfileWidgetComponent }) {
  useMeSocket()

  const match = useRouteMatch()
  const location = useLocation()
  return (
    <div className='flex'>
      <div className='flex flex-1 flex min-h-screen h-screen w-full bg-tchatbox-700'>
        {match?.url === ME_PAGE ? <Friends /> : <DMPage />}
        <InnerProfile
          ProfileWidgetComponent={ProfileWidgetComponent}
          location={location}
        />
      </div>
    </div>
  )
}
