import React from 'react'
import { useQueryClient } from 'react-query'
import CloseIcon from '../../../../assets/close_icon.svg'
import MarkIcon from '../../../../assets/mark_icon.svg'
import TchatBox from '../../../../assets/tchatbox_logo.svg'
import ReactGA from 'react-ga'
import { isIncoming, pendingUserName } from '../utils'
import {
  PENDING_REQUESTS_KEY,
  OUT_GOING_REQUESTS_KEY,
  ALL_FRIENDS_KEY,
} from '../../../../constants/queryKeys'
import {
  cancelPendingRequestApi,
  acceptPendingRequestApi,
} from '../../../../api/friend'
import { GetMe } from '../../../../hooks/actions'
import getSocket from '../../../../api/socket'
import { ME_SOCKET } from '../../../../constants/socket.routes'
import apiErrorHandler from '../../../../utils/apiErrorHandler'

const PENDING_WAY = {
  INCOMING: 'Incoming Friend Request',
  OUTGOING: 'Outgoing Friend Request',
}

function pendingStatus(user, request) {
  if (isIncoming(user, request)) return PENDING_WAY.INCOMING

  return PENDING_WAY.OUTGOING
}

export default function PendingItem({ user, pending, toggleModal }) {
  const me = GetMe()

  const cache = useQueryClient()
  const [isLoading, setIsLoading] = React.useState(false)

  const socket = getSocket(me?.tokens?.access?.token)

  async function cancelPending(e) {
    e.stopPropagation()
    setIsLoading(true)

    try {
      await cancelPendingRequestApi(pending.id)
      if (isIncoming(user, pending)) {
        cache.invalidateQueries(PENDING_REQUESTS_KEY)
      } else {
        cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)
      }

      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  async function acceptPending(e) {
    e.stopPropagation()
    setIsLoading(true)

    try {
      const result = await acceptPendingRequestApi(pending.id)
      ReactGA.event({
        category: 'Friend Request',
        action: 'Accepted Friend Request',
      })
      cache.invalidateQueries(PENDING_REQUESTS_KEY)
      cache.invalidateQueries(ALL_FRIENDS_KEY)

      socket.emit(ME_SOCKET.SEND_ACCEPT_FRIEND_REQUEST, {
        receiverId: result?.data?.from,
      })

      setIsLoading(false)
    } catch (err) {
      ReactGA.exception({
        description: apiErrorHandler(err),
        fatal: true,
      })
      setIsLoading(false)
    }
  }

  return (
    <li
      className='p-2 py-3 hover:bg-tchatbox-itemHover cursor-pointer border-t-1 border-tchatbox-backgroundModifierAccent'
      onClick={() => {
        toggleModal(pending)
      }}
    >
      <div className='flex justify-between items-center'>
        <div className='flex'>
          <div className='relative flex items-center justify-center'>
            <div
              className={`flex justify-center items-center w-8 h-8 bg-tchatbox-${
                isIncoming(user, pending)
                  ? pending?.from?.color
                  : pending?.to?.color
              } text-white hover:text-tchatbox-100 rounded-full`}
            >
              <TchatBox className='w-5 h-5' />
            </div>
            <span className='bg-tchatbox-green w-3 h-3 rounded-full absolute right-0 bottom-0 -mr-1 mb-1'></span>
          </div>
          <div className='flex items-start flex-col ml-4'>
            <p className='text-white text-sm font-bold'>
              {pendingUserName(user, pending)}
            </p>
            <p className='text-tchatbox-mainText text-xs'>
              {pendingStatus(user, pending)}
            </p>
          </div>
        </div>

        <div className='flex'>
          {isIncoming(user, pending) && (
            <button
              onClick={acceptPending}
              disabled={isLoading}
              className='flex items-center justify-center p-2 mx-1 rounded-full bg-tchatbox-bgSecondary focus:outline-none'
            >
              <MarkIcon className='fill-current w-5 h-5 text-tchatbox-topIcons hover:text-tchatbox-lightGreen' />
            </button>
          )}

          <button
            onClick={cancelPending}
            disabled={isLoading}
            className='flex items-center justify-center p-2 mx-1 rounded-full bg-tchatbox-bgSecondary focus:outline-none'
          >
            <CloseIcon className='fill-current w-5 h-5 text-tchatbox-topIcons hover:text-tchatbox-redNotif' />
          </button>
        </div>
      </div>
    </li>
  )
}
