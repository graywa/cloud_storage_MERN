import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { userAPI } from '../../../api/user-api'
import { setUser } from '../../../store/reducers/userReducer'
import Loader from '../../loader/Loader'
import './Registration.scss'

const Registration = () => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const [registration, { data: regData, isLoading, error }] =
    userAPI.useRegistrationMutation()

  const [login, { data: loginData }] = userAPI.useLoginMutation()

  const onSubmit = ({ email, password, login }) => {
    registration({ email, password, login }).unwrap()
  }

  useEffect(() => {
    if (regData?.message === 'User was created') {
      const email = getValues('email')
      const password = getValues('password')
      login({ email, password })
    }
  }, [regData])

  useEffect(() => {
    if (loginData) {
      const { user, token } = loginData
      localStorage.setItem('token', token)
      dispatch(setUser({ user }))
    }
  }, [loginData])

  if (error) console.log(error)

  return (
    <div className='registration container'>
      <div className='content'>
        <h3>Registration</h3>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <label>
            <input
              type='text'
              placeholder='login'
              {...register('login', { required: true })}
            />
            {errors.login && <span className='error'>field is required</span>}
          </label>

          <label>
            <input
              type='email'
              placeholder='email'
              {...register('email', { required: true })}
            />
            {errors.email && <span className='error'>field is required</span>}
          </label>

          <label>
            <input
              type='password'
              placeholder='password'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='error'>field is required</span>
            )}
          </label>

          <button type='submit' disabled={isLoading}>
            Registration
          </button>

          {isLoading && <Loader />}
          {error && <h3 className='error'>{error.data.message}</h3>}
        </form>
      </div>
    </div>
  )
}

export default Registration
