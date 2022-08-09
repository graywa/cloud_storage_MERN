import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store/reducers/userReducer'
import upload from '../assets/upload.png'
import './Header.scss'

const Header = () => {
  const { isAuth } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  return (
    <div className='header'>
      <div className='content container'>
        <div className='logo'>
          <img width={40} src={upload} alt='upload' />
          <h3>MERN Storage</h3>
        </div>
        <div className='account'>
          {!isAuth && (
            <>
              <Link to='/registration'>Sign Up</Link>
              <Link to='/login'>Sign In</Link>
            </>
          )}

          {isAuth && <button type='button' 
          onClick={logoutHandler}>Exit</button>}
        </div>
      </div>
    </div>
  )
}

export default Header
