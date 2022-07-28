import React from 'react'
import ProfileWidget from './ProfileWidget'
import { Me } from '../hooks/reactQuery'

export default function Layout({ Component, user, ...props }) {
  const { data: me } = Me(user?.user)

  return (
    <>
      <Component
        user={me}
        ProfileWidgetComponent={<ProfileWidget user={me} />}
        {...props}
      />
    </>
  )
}
