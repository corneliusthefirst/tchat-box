import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import ThreeDotIcon from '../../../../assets/three_dot_icon.svg'
import DMIcon from '../../../../assets/dm_icon.svg'
import TchatBox from '../../../../assets/tchatbox_logo.svg' 

import { OPEN_ROOMS } from '../../../../constants/queryKeys'
import { DM_URL } from '../../../../constants/history.constants'
import LoadingCircle from '../../../../assets/loading_circle_icon.svg'
import { getOrCreateRoom } from '../../../../api/room'
import { isIncoming } from '../utils'
import AlertModal from '../../../../components/shared/Modal/AlertModal'
import apiErrorHandler from '../../../../utils/apiErrorHandler'
import { useModal } from '../../../../context/modal-context/modal-context'

export function friendObject(user, request) {
  if (isIncoming(user, request)) return request.from

  return request.to
}

export default function PendingItem({ user, friend }) {
  const [isLoading, setIsLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const modal = useModal()
  const cache = useQueryClient()
  const history = useHistory()

  async function openDM(e) {
    e.stopPropagation()
    setIsLoading(true)

    try {
      const { data } = await getOrCreateRoom(friendObject(user, friend).id)

      if (data) {
        cache.invalidateQueries(OPEN_ROOMS)
        history.push(DM_URL(data.id))
      } else {
        setIsLoading(false)
      }
    } catch (err) {
      const result = apiErrorHandler(err)
      setAlertMessage(result)
      modal.showModal(
        <AlertModal
          onClose={modal.hideModal}
          message={alertMessage}
          title={'Error'}
        />,
        true
      )
      setIsLoading(false)
    }
  }

  return (
    <li
      className='p-2 py-3 hover:bg-tchatbox-itemHover cursor-pointer border-t-1 border-tchatbox-backgroundModifierAccent'
      onClick={openDM}
    >
      <div className='flex justify-between items-center'>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <div
              className={`flex justify-center items-center w-8 h-8 bg-tchatbox-${
                isIncoming(user, friend)
                  ? friend?.from?.color
                  : friend?.to?.color
              } text-white hover:text-tchatbox-100 rounded-full`}
            >
              <TchatBox className='w-5 h-5' />
            </div>
            <span className='bg-tchatbox-green w-3 h-3 rounded-full absolute right-0 bottom-0 -mr-1 mb-1'></span>
          </div>
          <div className='flex items-start flex-col ml-4'>
            <p className='text-white text-sm font-bold'>
              {friendObject(user, friend).username}
            </p>
            <p className='text-tchatbox-mainText text-xs'>{'online'}</p>
          </div>
        </div>

        <div className='flex'>
          <button
            onClick={openDM}
            className='flex items-center justify-center p-2 mx-1 rounded-full bg-tchatbox-bgSecondary focus:outline-none'
          >
            {isLoading ? (
              <LoadingCircle className='animate-spin h-5 w-5 text-tchatbox-100' />
            ) : (
              <DMIcon className='fill-current w-5 h-5 text-tchatbox-topIcons hover:text-tchatbox-100' />
            )}
          </button>

          <button className='flex items-center justify-center p-2 mx-1 rounded-full bg-tchatbox-bgSecondary focus:outline-none'>
            <ThreeDotIcon className='fill-current w-5 h-5 text-tchatbox-topIcons hover:text-tchatbox-100' />
          </button>
        </div>
      </div>
    </li>
  )
}
