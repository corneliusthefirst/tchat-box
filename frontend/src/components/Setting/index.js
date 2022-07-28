import React from 'react'
import Account from './Account'

export default function Setting({ onClose }) {
  return (
    <div className='flex w-full'>
      <div className='mx-auto flex w-2/3'>
        <div className='flex-1 px-4'>
          <Account onClose={onClose} />
        </div>
      </div>
    </div>
  )
}
