import { useForm } from 'react-hook-form'
import { userAPI } from '../../../api/user-api'
import './Registration.scss'

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [registration, {data, isLoading, error} ] = userAPI.useRegistrationMutation()

  const onSubmit = async ({email, password}) => {
    const res = await registration({email, password})
    console.log(res)
  }

  console.log(errors)
  
  return (
    <div className='registration container'>
      <h3>Registration</h3>
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
          Registration
        </button>

        {isLoading && <h3>Loading...</h3>}
        {error && <h3 className='error'>{error.data.message}</h3>}
      </form>
    </div>
  )
}

export default Registration
