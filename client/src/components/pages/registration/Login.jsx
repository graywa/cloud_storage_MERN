import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { userAPI } from '../../../api/user-api'
import { setUser } from '../../../store/reducers/userReducer'
import Loader from '../../loader/Loader'
import './Registration.scss'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const [login, { data, isLoading, error }] = userAPI.useLoginMutation()

  const onSubmit = ({ email, password }) => {
    login({ email, password })
  }

  useEffect(() => {
    if (data) {
      const { user, token } = data
      localStorage.setItem('token', token)
      dispatch(setUser({ user }))
    }
  }, [data])

  return (
    <div className='registration container'>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <div>
          <input
            type='email'
            placeholder='email'
            {...register('email', { required: true })}
          />
          {errors.email && <span className='error'>Field is required</span>}
        </div>

        <div>
          <input
            type='password'
            placeholder='password'
            {...register('password', { required: true })}
          />
          {errors.password && <span className='error'>Field is required</span>}
        </div>

        <button type='submit' disabled={false}>
          Login
        </button>

        {isLoading && <Loader />}
        {error && <h3 className='error'>{error.data.message}</h3>}
      </form>
    </div>
  )
}

export default Login
