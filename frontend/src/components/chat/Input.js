import React, { useEffect, useState, useRef } from 'react'
import { useQueryClient } from 'react-query'

import friendObject from '../../utils/friendObject'
import getSocket from '../../api/socket'
import { sendMessage } from '../../api/messages'
import { GetMe } from '../../hooks/actions'
import { ROOM_MESSAGES_KEY } from '../../constants/queryKeys'
import { ROOM_SOCKET } from '../../constants/socket.routes'

export default function Input({ user, room }) {
  const me = GetMe()
  const [socket, setSocket] = useState(null)
  const [isTyping, setTyping] = useState(false)
  const [text, setText] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const inputRef = useRef(null)
  const cache = useQueryClient()

  // connect to socket on component mount.
  useEffect(() => {
    const newSocket = getSocket(me?.tokens?.access?.token)
    setSocket(newSocket)
  }, [setSocket, me?.tokens?.access?.token])

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

  function handleInputChange(e) {
    const chatText = e.target.value

    if (chatText.trim().length === 1 && !isTyping) {
      setTyping(true)
      socket.emit('startTyping', room.id)
    } else if (chatText.length === 0) {
      setTyping(false)
      socket.emit('stopTyping', room.id)
    }

    if (chatText.trim().length <= 3000) setText(chatText)
  }

  async function handleInputSubmit(e) {
    if (e.key === 'Enter') {
      if (!text) return
      socket.emit('stopTyping', room.id)
      setSubmitting(true)
      setTyping(false)

      const data = new FormData()
      data.append('roomId', room.id)
      data.append('text', text.trim())

      try {
        const result = await sendMessage(data)
        socket.emit(ROOM_SOCKET.ROOM_SEND_MESSAGE, {
          msg: result?.data,
          receiverId: friendObject(
            user,
            room,
            'sender.id',
            'sender',
            'receiver'
          ).id,
        })

        setText('')
        setSubmitting(false)
        inputRef?.current?.focus()

        // populate actual sender object
        result.data.senderId = me?.user

        cache.setQueryData(ROOM_MESSAGES_KEY(room.id), (d) => {
          if (d?.pages[0]?.results[0]?.id !== result?.data?.id) {
            d?.pages[0]?.results.unshift(result?.data)
          }

          return d
        })
      } catch (e) {
        console.log('e: ', e)
        setText('')
        setSubmitting(false)
      }
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='bg-tchatbox-chatInputBg flex items-center m-4 rounded-lg p-1 mb-5'>
        <button className='flex items-center focus:outline-none p-2 text-tchatbox-topIcons hover:text-tchatbox-100  rounded-lg'>
          <svg width='24' height='24' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z'
            ></path>
          </svg>
        </button>
        <div className='flex flex-1 bg-tchatbox-chatInputBg'>
          <input
            disabled={isSubmitting}
            type='text'
            className='flex-1 bg-tchatbox-chatInputBg placeholder-tchatbox-200 p-1 text-tchatbox-100 text-sm focus:outline-none leading-normal'
            placeholder={`Message #${userName}`}
            onChange={handleInputChange}
            onKeyDown={handleInputSubmit}
            value={text}
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  )
}
