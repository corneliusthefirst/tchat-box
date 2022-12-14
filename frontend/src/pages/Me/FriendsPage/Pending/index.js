/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import PendingItem from './PendingItem'
import PendingProfileModal from './PendingProfileModal'
import {
  PendingRequests,
  OutGoingRequests,
} from '../../../../hooks/reactQuery/index'
import PendingUsersIcon from '../../../../assets/pending_users_icon.svg'
import { useAppState } from '../../../../context/app-state-context'
import { useModal } from '../../../../context/modal-context/modal-context'

function EmptyState() {
  return (
    <div className='flex flex-col justify-center w-full items-center'>
      <PendingUsersIcon className='fill-current w-85  h-85' />
      <p className='p-2 text-tchatbox-popOutHeader mt-6'>
        There are no pending friend requests. Here's Wumpus for now.
      </p>
    </div>
  )
}

function PendingHeader({ pendingRequestsData, outGoingRequests }) {
  const pendingCount =
    (pendingRequestsData?.length ?? 0) + (outGoingRequests?.length ?? 0)
  return (
    <div className='flex justify-start items-center w-full mt-2'>
      <h6 className='my-2 text-tchatbox-topIcons text-xs font-semibold'>
        PENDING — {pendingCount}
      </h6>
    </div>
  )
}
export default function Pending({ pendingRequestsData }) {
  const { appState } = useAppState()
  const { user } = appState
  const [pendingProfile, setPendingProfile] = useState(null)
  const { data: pendingRequests } = PendingRequests()
  const { data: outGoingRequests } = OutGoingRequests()
  const modal = useModal()

  // update incoming friend requests with fresh data
  if (pendingRequests?.length) {
    pendingRequestsData = pendingRequests
  }

  function toggleModal(pending) {
    pendingProfile &&
      modal.showModal(
        <PendingProfileModal user={user} pending={pendingProfile} />,
        true,
        true
      )

    if (pending) {
      setPendingProfile(pending)
    }
  }

  if (pendingRequestsData?.length || outGoingRequests?.length) {
    return (
      <div className='flex h-full flex-1'>
        <div className='flex flex-col w-full p-4 px-10'>
          <PendingHeader
            outGoingRequests={outGoingRequests}
            pendingRequestsData={pendingRequestsData}
          />

          <div className='flex w-full'>
            <ul className='w-full flex flex-col'>
              {pendingRequestsData?.map((pending, index) => (
                <PendingItem
                  key={index}
                  user={user}
                  pending={pending}
                  toggleModal={toggleModal}
                />
              ))}
              {outGoingRequests?.map((pending, index) => (
                <PendingItem
                  key={index}
                  user={user}
                  pending={pending}
                  toggleModal={toggleModal}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='flex h-full flex-1'>
      <EmptyState />
    </div>
  )
}
