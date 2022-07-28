import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import RegisterSchema from '../../validation/register.schema'
import TextField from '../../components/shared/Inputs/TextField'
import { register } from '../../api/auth'
import { ME_PAGE } from '../../constants/history.constants'
import apiErrorHandler from '../../utils/apiErrorHandler'
import TchatBox from '../../assets/tchatbox_logo.svg'
import { useAppState } from '../../context/app-state-context'
import ReactGA from 'react-ga'

export default function Index() {
  const history = useHistory()
  const { setAppState } = useAppState()

  async function handleRegisterSubmit(values, { setErrors }) {
    try {
      const { data } = await register(values)
      console.log('register1', data)
      if (data) {
        ReactGA.event({
          category: 'User',
          action: 'Created an Account',
        })
        setAppState({ user: data })
        history.push(ME_PAGE)
      }
    } catch (error) {
      ReactGA.exception({
        description: apiErrorHandler(error),
        fatal: true,
      })
      setErrors(apiErrorHandler(error))
    }
  }

  return (
    <div className='flex flex-col   relative bg-tchatbox-semi600 h-screen w-full'>
      <Link
        to='/'
        className='z-10 text-white mt-16 sm:self-start mx-auto sm:ml-8 sm:mt-8'
      >
        <TchatBox className='w-24 h-24 text-center mx-auto' />
      </Link>

      <div className='z-10 bg-tchatbox-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-2/6 rounded-md p-5 m-12 flex flex-row mx-auto mt-16'>
        <div className='flex flex-col w-full'>
          <h4 className='text-xl text-white font-semibold text-center'>
            Create an account
          </h4>

          <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  fieldClass='mb-4 mt-4'
                  labelClass='block text-tchatbox-sideBarChannels font-semibold text-xs mb-2'
                  inputClass='focus:outline-none border-tchatbox-transparentBlack1 border-1
                   focus:ring-2 focus:ring-blue-400 bg-tchatbox-transparentBlack2 text-white
                    w-full rounded py-1 px-2'
                  label='EMAIL'
                  name='email'
                  type='email'
                />

                <TextField
                  fieldClass='mb-4 mt-4'
                  labelClass='block text-tchatbox-sideBarChannels font-semibold text-xs mb-2'
                  inputClass='focus:outline-none border-tchatbox-transparentBlack1 border-1
                   focus:ring-2 focus:ring-blue-400 bg-tchatbox-transparentBlack2 text-white
                    w-full rounded py-1 px-2'
                  label='USERNAME'
                  name='username'
                  type='text'
                />

                <TextField
                  fieldClass='mb-4 mt-4'
                  labelClass='block text-tchatbox-sideBarChannels font-semibold text-xs mb-2'
                  inputClass='focus:outline-none border-tchatbox-transparentBlack1 border-1
                   focus:ring-2 focus:ring-blue-400 bg-tchatbox-transparentBlack2 text-white
                    w-full rounded py-1 px-2'
                  label='PASSWORD'
                  name='password'
                  type='password'
                />
                <button
                  type='submit'
                  className='w-full rounded p-2 mt-8 block bg-tchatbox-experiment500 hover:bg-tchatbox-experiment560 text-white font-semibold'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg
                      className='animate-spin h-5 w-5 text-white mx-auto'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  ) : (
                    'Continue'
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <div className='mt-2'>
            <Link
              to='/login'
              href='#'
              className='text-xs text-tchatbox-textLink hover:underline'
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
