import React, { useState } from 'react'
import Menu from './Menu'
import Online from './Online'
import AddFriend from './AddFriend'
import Blocked from './Blocked'
import Pending from './Pending'
import All from './All'
import { PendingRequests } from '../../../hooks/reactQuery'

function showSubPage(page, setPage, componentData) {
  let component

  switch (page) {
    case 'online':
      component = <Online />
      break
    case 'all':
      component = <All setPage={setPage} />
      break
    case 'pending':
      component = <Pending {...componentData} />
      break
    case 'add_friend':
      component = <AddFriend />
      break
    case 'blocked':
      component = <Blocked />
      break
    default:
      component = <Online />
      break
  }

  return component
}

export default function Friends() {
  const [page, setPage] = useState('online')

  const { data: pendingRequestsData } = PendingRequests()

  return (
    <div className='flex-1 w-full flex-col overflow-hidden'>
      <Menu
        setPage={setPage}
        page={page}
        pendingRequests={pendingRequestsData?.length}
      />
      <div className='flex-1 flex bg-tchatbox-selectMuted min-h-screen h-screen'>
        <div className='flex flex-1'>
          {showSubPage(page, setPage, { pendingRequestsData })}
        </div>
      </div>
    </div>
  )
}
