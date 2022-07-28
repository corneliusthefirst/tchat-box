import React from 'react'
import InviteOnlyLandingImage from '../../assets/invite_only_landing.svg'
import HangingOutEasyLandingImage from '../../assets/hanging_out_easy_landing.svg'
import FandomLandingImage from '../../assets/fandom_landing.svg'
import JustChilingLandingImage from '../../assets/just_chiling_landing.svg'
import TinyStarsLandingImage from '../../assets/tiny_stars_landing.svg'

export default function Footer() {
  return (
    <div className='flex flex-col'>
      <div className='flex md:flex-row justify-center items-center sm:my-28 my-18 px-4'>
        <div className='flex flex-col md:flex-row justify-center items-center'>
          <InviteOnlyLandingImage className='w-11/12 md:w-5/12 lg:w-6/12 xl:w-6/12 2xl:w-4/12' />
          <div className='w-11/12 md:w-5/12 lg:w-4/12  xl:w-3/12 2xl:w-3/12  md:ml-20 '>
            <h1 className='text-left md:text-5xl text-xl leading-8 font-bold tracking-tight md:leading-13 md:mt-0 mt-8'>
              Create an invite place where you belong with your crew
            </h1>
            <p className='mt-4 text-left md:text-lg text-base text-tchatbox-notQuiteDark'>
              tchatbox servers are organized into topic-based channels where you
              can collaborate, share, and just talk in a group chat.
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-center items-center sm:my-28 my-18 px-4'>
        <FandomLandingImage className='w-11/12 md:w-5/12 lg:w-6/12 xl:w-6/12 2xl:w-4/12' />
        <div className='w-11/12 md:w-5/12 lg:w-4/12  xl:w-3/12 2xl:w-3/12  md:ml-20 '>
          <h1 className='text-left md:text-5xl text-xl leading-8 font-bold tracking-tight md:leading-13 md:mt-0 mt-8'>
            From few to many
          </h1>
          <p className='mt-4 text-left text-base text-tchatbox-notQuiteDark'>
            Get any community running with moderation tools and custom member
            access. Give members special powers, set up private channels, and
            more.
          </p>
        </div>
      </div>

    </div>
  )
}
