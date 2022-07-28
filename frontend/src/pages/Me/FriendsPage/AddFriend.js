import React, { useState } from 'react'
import { useQueryClient } from 'react-query'
import classNames from 'classnames'

import { OUT_GOING_REQUESTS_KEY } from '../../../constants/queryKeys'
import { sendFriendRequest } from '../../../api/friend'
import AlertModal from '../../../components/shared/Modal/AlertModal'
import apiErrorHandler from '../../../utils/apiErrorHandler'
import AddFriendIcon from '../../../assets/add_friend_icon.svg'
import { GetMe } from '../../../hooks/actions'
import getSocket from '../../../api/socket'
import { ME_SOCKET } from '../../../constants/socket.routes'
import { useModal } from '../../../context/modal-context/modal-context'
import ReactGA from 'react-ga'
//
function EmptyState() {
  return (
    <div className='flex flex-col flex-1 justify-center w-full items-center'>
      <AddFriendIcon className='fill-current w-85 h-85' />
      <p className='p-2 text-tchatbox-popOutHeader mt-6'>
        Wumpus is waiting on friends. You don’t have to though!
      </p>
    </div>
  )
}

const alertTitle = 'Friend request failed'
const FRIEND_DESCRIPTION = {
  DEFAULT: "You can add a friend with their tchatbox Tag. It's cAsE sEnSitIvE!",
  SUCCESS: (input) => `Success! Your friend request to ${input} was sent.`,
}

export default function Online() {
  const me = GetMe()

  const cache = useQueryClient()
  const [input, setInput] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [friendDescription, setFriendDescription] = useState(
    FRIEND_DESCRIPTION.DEFAULT
  )
  const [successInvite, setSuccessInvite] = useState(false)

  const socket = getSocket(me?.tokens?.access?.token)
  const modal = useModal()

  function showAlert() {
    modal.showModal(
      <AlertModal
        onClose={modal.hideModal}
        message={alertMessage}
        title={alertTitle}
      />,
      true
    )
  }

  function isNumeric(value) {
    return /^\d+$/.test(value)
  }

  async function handleSendFriendRequest(e) {
    e.preventDefault()
    const [username, shortId] = input.split('#')

    if (!username) {
      setAlertMessage('Please enter a username')
      showAlert()
      return
    }
    if (!shortId || shortId.length !== 4) {
      setAlertMessage('Please enter user Id correctly')
      showAlert()
      return
    }
    if (!isNumeric(shortId)) {
      setAlertMessage('User Id should only contain numbers')
      showAlert()
      return
    }

    try {
      const result = await sendFriendRequest({ username, shortId })
      setInput('')
      ReactGA.event({
        category: 'Friend Request',
        action: 'Send Friend Request',
      })
      setFriendDescription(FRIEND_DESCRIPTION.SUCCESS(input))
      setSuccessInvite(true)

      cache.invalidateQueries(OUT_GOING_REQUESTS_KEY)

      socket.emit(ME_SOCKET.SEND_FRIEND_REQUEST, {
        receiverId: result?.data?.to,
      })
    } catch (e) {
      const result = apiErrorHandler(e)
      ReactGA.exception({
        description: result,
        fatal: true,
      })
      setAlertMessage(result)
      showAlert()
      setSuccessInvite(false)
      setFriendDescription(FRIEND_DESCRIPTION.DEFAULT)
    }
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='px-6 py-4'>
        <h6 className='text-white font-bold text-medium tracking-tight'>
          ADD FRIEND
        </h6>
        <p
          className={classNames('text-sm mt-2', {
            'text-tchatbox-500': !successInvite,
            'text-tchatbox-greenSuccess': successInvite,
          })}
        >
          {friendDescription}
        </p>
        <div
          className={classNames(
            'w-full mt-4 bg-tchatbox-deprecatedTextInput border-1 border-tchatbox-deprecatedTextInputBorder w-full rounded-lg',
            {
              'border-tchatbox-greenSuccess': successInvite,
              'border-tchatbox-deprecatedTextInputBorder': !successInvite,
            }
          )}
        >
          <form className='flex justify-between'>
            <input
              value={input}
              onInput={(e) => setInput(e.target.value)}
              type='text'
              placeholder='Enter a Username#0000'
              maxLength='37'
              className={classNames(
                'w-full text-tchatbox-100 p-3 bg-tchatbox-deprecatedTextInput placeholder-tchatbox-200 focus:outline-none leading-normal text-base'
              )}
            />
            <button
              type='button'
              disabled={!!input === false}
              onClick={handleSendFriendRequest}
              className={classNames(
                'text-xs rounded-md text-white px-0 w-56 m-2',
                {
                  'bg-tchatbox-experiment500Disabled': !!input === false,
                  'cursor-not-allowed': !!input === false,
                  'bg-tchatbox-experiment500': !!input,
                }
              )}
            >
              Send Friend Request
            </button>
          </form>
        </div>
      </div>
      <EmptyState />
    </div>
  )
}
