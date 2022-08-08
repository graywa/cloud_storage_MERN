import { useForm } from 'react-hook-form'
import './Registration.scss'

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <div className='registration container'>
      <h3>Registration</h3>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <input
          type='email'
          placeholder='email'
          {...register('email', { required: true })}
        />
        <input
          type='password'
          placeholder='password'
          {...register('password', { required: true })}
        />
        <button type='submit' disabled={false}>
          Registration
        </button>
      </form>
    </div>
  )
}

export default Registration
