import React from 'react'
import classNames from 'classnames'

import FriendsIcon from '../../../assets/friends.svg'

export default function Friends({ setPage, page, pendingRequests = 0 }) {
  return (
    <div className='flex pt-3 px-2 border-b-1 border-tchatbox-900 w-full pb-2 bg-tchatbox-selectMuted'>
      <h6 className='text-white font-semibold'>
        <FriendsIcon className='w-6 h-6 mr-3 inline-block text-tchatbox-sideBarChannels' />
        Friends
      </h6>
      <ul className='flex ml-6'>
        <li className='ml-2'>
          <a
            href='#'
            onClick={() => setPage('online')}
            className={classNames('hover:text-tchatbox-100', {
              'text-white': page === 'online',
              'text-tchatbox-sideBarChannels': page !== 'online',
            })}
          >
            Online
          </a>
        </li>
        <li className='ml-8'>
          <a
            href='#'
            onClick={() => setPage('all')}
            className={classNames('hover:text-tchatbox-100', {
              'text-white': page === 'all',
              'text-tchatbox-sideBarChannels': page !== 'all',
            })}
          >
            All
          </a>
        </li>
        <li className='ml-8 flex justify-center items-center'>
          <a
            href='#'
            onClick={() => setPage('pending')}
            className={classNames('hover:text-tchatbox-100', {
              'text-white': page === 'pending',
              'text-tchatbox-sideBarChannels': page !== 'pending',
            })}
          >
            Pending
          </a>
          {!!pendingRequests && (
            <span className='rounded-full h-5 w-5 flex items-center justify-center ml-1 bg-tchatbox-redNotif text-white text-xs'>
              {pendingRequests}
            </span>
          )}
        </li>
        <li className='ml-8'>
          <a
            href='#'
            onClick={() => setPage('blocked')}
            className={classNames('hover:text-tchatbox-100', {
              'text-white': page === 'blocked',
              'text-tchatbox-sideBarChannels': page !== 'blocked',
            })}
          >
            Blocked
          </a>
        </li>
        <li className='ml-8'>
          <button
            onClick={() => setPage('add_friend')}
            className={classNames(
              'text-white text-sm p-px px-2 rounded-md focus:outline-none',
              {
                'text-tchatbox-lightGreen': page === 'add_friend',
                'bg-transparent': page === 'add_friend',
                'bg-tchatbox-lightGreen': page !== 'add_friend',
              }
            )}
          >
            Add Friend
          </button>
        </li>
      </ul>
    </div>
  )
}
