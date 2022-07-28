import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import LoginSchema from '../../validation/login.schema'
import TextField from '../../components/shared/Inputs/TextField'
import { login } from '../../api/auth'
import { ME_PAGE } from '../../constants/history.constants'
import apiErrorHandler from '../../utils/apiErrorHandler'
import LoadingCircle from '../../assets/loading_circle_icon.svg'
import TchatBox from '../../assets/tchatbox_logo.svg'
import { useAppState } from '../../context/app-state-context'
import ReactGA from 'react-ga'

export default function Index() {
  const history = useHistory()
  const { appState, setAppState } = useAppState()

  useEffect(() => {
    if (appState?.user) {
      history.push(ME_PAGE)
    }
  }, [appState?.user, history])

  async function handleLoginSubmit(values, { setErrors }) {
    try {
      const { data } = await login(values)
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
      if (error.response.status === 401) {
        setErrors({ email: error.response.data.message })
      } else {
        setErrors(apiErrorHandler(error))
      }
    }
  }

  return (
    <div className='flex flex-col  relative bg-teal-500 h-screen w-full'>
      <Link
        to='/'
        className='z-10 text-white mt-16 sm:self-start mx-auto sm:ml-8 sm:mt-8'
      >
        <TchatBox className='w-24 h-24 text-center mx-auto' />
      </Link>

      <div className='z-10 bg-tchatbox-semi600 w-full sm:w-4/6 md:w-4/6 lg:w-4/6 xl:w-2/5 rounded-md p-5 m-12 flex flex-row mx-auto mt-16'>
        <div className='flex flex-col w-full'>
          <h4 className='text-xl text-white font-semibold'>Welcome back!</h4>
          <p className='text-sm text-tchatbox-mainText'>
            We're so excited to see you again!
          </p>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextField
                  fieldClass='mb-4 mt-4'
                  labelClass='block text-tchatbox-500 font-semibold text-xs mb-2'
                  inputClass='focus:outline-none border-tchatbox-transparentBlack1 border-1
                   focus:ring-2 focus:ring-blue-400 bg-tchatbox-transparentBlack2 text-white
                    w-full rounded py-1 px-2'
                  label='EMAIL'
                  name='email'
                  type='email'
                />
                <TextField
                  fieldClass='mb-4 mt-4'
                  labelClass='block text-tchatbox-500 font-semibold text-xs mb-2'
                  inputClass='focus:outline-none border-tchatbox-transparentBlack1 border-1
                   focus:ring-2 focus:ring-blue-400 bg-tchatbox-transparentBlack2 text-white
                    w-full rounded py-1 px-2'
                  label='PASSWORD'
                  name='password'
                  type='password'
                />
                <a
                  href='#'
                  className='text-xs text-tchatbox-textLink hover:underline'
                >
                  Forgot your password?
                </a>

                <button
                  type='submit'
                  className='transition-colors duration-300 focus:outline-none w-full rounded p-2 mt-8 block bg-tchatbox-experiment500 hover:bg-tchatbox-experiment500Disabled text-white font-semibold'
                >
                  {isSubmitting ? (
                    <LoadingCircle className='animate-spin h-5 w-5 text-white mx-auto' />
                  ) : (
                    'Login'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className='mt-2'>
            <span className='text-xs text-tchatbox-popOutHeader mr-2'>
              Need an account?
            </span>
            <Link
              to='/register'
              className='text-xs text-tchatbox-textLink hover:underline'
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
