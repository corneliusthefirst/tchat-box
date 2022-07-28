import React from 'react'
import FRENCHEFlag from '../../assets/french.png'
import TwitterIcon from '../../assets/twitter_icon.svg'
import InstagramIcon from '../../assets/instagram_icon.svg'
import FacebookIcon from '../../assets/facebook_icon.svg'
import YoutubeIcon from '../../assets/youtube_icon.svg'
import TchatBox from '../../assets/tchatbox_logo.svg' 

export default function Footer() {
  return (
    <div className='bg-tchatbox-notQuiteDark flex flex-col py-16 sm:px-20 px-6'>
      <div className='flex flex-col md:flex-row sm:justify-between sm:justify-items-center'>
        <div className='flex flex-col items-start'>
          <h4 className='text-tchatbox-experiment500 text-4xl font-extrabold uppercase leading-none'>
            Find a<br /> your crew's place 
          </h4>
          <a href='#' className='text-white mt-6 font-light'>
            <span>
              <img
                src={FRENCHEFlag}
                alt='French'
                className='w-6 h-4 inline-block mr-2'
              />
            </span>
            French, EUROPE
          </a>
          <div className='mt-4 flex flex-row items-start justify-between'>
            <a href='#' className='text-white font-light'>
              <TwitterIcon className='fill-current mr-4 w-6 h-6' />
            </a>
            <a href='#' className='text-white font-light'>
              <InstagramIcon className='fill-current mr-4 w-6 h-6' />
            </a>
            <a href='#' className='text-white font-light'>
              <FacebookIcon className='fill-current mr-4 w-6 h-6' />
            </a>
            <a href='#' className='text-white font-light'>
              <YoutubeIcon className='fill-current mr-4 w-6 h-6' />
            </a>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:flex-1 md:justify-between md:ml-20'>
          <div className='flex flex-row md:hidden justify-between mt-10 md:mt-0'>
            <div>
                <ul>
                  <li className='text-tchatbox-textLink bg-tchatbox-offWhite p-2 rounded-lg'>
                    <a className='text-tchatbox-textLink' href='#'>Home</a>
                  </li>

                  <li className='p-2 rounded-lg'>
                    <a className='font-semibold text-white p-4 hover:underline' href='#'>Blog</a>
                  </li>

                  <li className='p-2 rounded-lg'>
                    <a className='font-semibold text-white p-4 hover:underline' href='#'>Download</a>
                  </li>          

                  <li className='p-2 rounded-lg'>
                    <a className='font-semibold text-white p-4 hover:underline' href='#'>Support</a>
                  </li>
                </ul>
            </div>

            <div>
              <ul>
                <li>
                  <a href='#' className='text-tchatbox-experiment500 text-sm'>
                    Company
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    About
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Jobs
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Branding
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Newsroom
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-row md:hidden justify-between mt-10 md:mt-0'>
            <div>
              <ul>
                <li>
                  <a href='#' className='text-tchatbox-experiment500 text-sm'>
                    Resources
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Collage
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Support
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Safety
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Blog
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Feedback
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    Developrs
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm'>
                    StreamKit
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <a
                    href='#'
                    className='text-tchatbox-experiment500 text-sm sm:text-xs'
                  >
                    Policies
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm sm:text-xs'>
                    Terms
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm sm:text-xs'>
                    Privacy
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm sm:text-xs'>
                    Guidelines
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm sm:text-xs'>
                    Acknowledgements
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm sm:text-xs'>
                    Licenses
                  </a>
                </li>
                <li className='mt-2'>
                  <a href='#' className='text-white text-sm sm:text-xs'>
                    Moderation
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='hidden md:block'>
            <ul>
              <li>
                <a href='#' className='text-tchatbox-experiment500 text-sm'>
                  Product
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Download
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Status
                </a>
              </li>
            </ul>
          </div>
          <div className='hidden md:block'>
            <ul>
              <li>
                <a href='#' className='text-tchatbox-experiment500 text-sm'>
                  Company
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  About
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Jobs
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Branding
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Newsroom
                </a>
              </li>
            </ul>
          </div>
          <div className='hidden md:block'>
            <ul>
              <li>
                <a href='#' className='text-tchatbox-experiment500 text-sm'>
                  Resources
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Collage
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Support
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Safety
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Blog
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Feedback
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  Developrs
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm'>
                  StreamKit
                </a>
              </li>
            </ul>
          </div>
          <div className='hidden md:block'>
            <ul>
              <li>
                <a
                  href='#'
                  className='text-tchatbox-experiment500 text-sm sm:text-xs'
                >
                  Policies
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm sm:text-xs'>
                  Terms
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm sm:text-xs'>
                  Privacy
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm sm:text-xs'>
                  Guidelines
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm sm:text-xs'>
                  Acknowledgements
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm sm:text-xs'>
                  Licenses
                </a>
              </li>
              <li className='mt-2'>
                <a href='#' className='text-white text-sm sm:text-xs'>
                  Moderation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between justify-items-center items-center pt-8 mt-8 border-t-2 border-tchatbox-experiment500'>
        <span className='text-white'>
          <TchatBox className='w-24 h-24 text-center  mx-auto' />
        </span>
        <a
          href='#'
          className='px-4 py-2 ease-linear transition duration-150 hover:shadow-lg hover:bg-tchatbox-indigo rounded-full bg-tchatbox-experiment500 text-white text-sm'
        >
          Sign up
        </a>
      </div>
    </div>
  )
}
