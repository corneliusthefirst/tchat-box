import React from 'react'
import friendObject from '../../../utils/friendObject'
import AtSignIcon from '../../../assets/at_sign_icon.svg'
import OfflineStatusIcon from '../../../assets/offline_status_icon.svg'

export default function Header({ user, room }) {
  let userName
  if (room && user) {
    userName = friendObject(
      user,
      room,
      'sender.id',
      'sender',
      'receiver'
    ).username
  }

  return (
    <div className='flex text-white h-12 border-b-1 border-tchatbox-900'>
      <div className='flex-1 flex items-center justify-between bg-tchatbox-600 border-b border-tchatbox-900 px-4'>
        <div className='flex items-center'>
          <div className='text-tchatbox-200 text-2xl'>
            <AtSignIcon className='w-6 h-6' />
          </div>
          <h5 className='flex justify-start items-center ml-2 cursor-pointer text-sm text-white font-bold'>
            {userName} <OfflineStatusIcon className='w-4 h-4 ml-1' />
          </h5>
        </div>
      </div>
    </div>
  )
}
