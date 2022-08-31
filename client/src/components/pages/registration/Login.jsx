import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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

  useEffect(() => {
    if (error?.data) {
      toast.error(error.data.message)
    }
    if (error?.error) {
      toast.error(error.error)
    }
  }, [error])

  return (
    <div className='registration container'>
      <div className='content'>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
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
            Login
          </button>

          {isLoading && <Loader />}
        </form>
      </div>
    </div>
  )
}

export default Login
