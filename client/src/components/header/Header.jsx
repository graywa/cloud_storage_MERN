import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchToStore } from '../../store/reducers/fileReducer'
import { logout } from '../../store/reducers/userReducer'
import storage from '../assets/storage.png'
import './Header.scss'

const Header = () => {
  const { isAuth } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  const searchHandler = async (e) => {
    const searchValue = e.target.value
    setSearch(searchValue)
    dispatch(setSearchToStore({search: searchValue}))
  }

  return (
    <div className='header'>
      <div className='content container'>
        <div className='logo'>
          <img width={40} src={storage} alt='storage' />
          <h3>Cloud Storage</h3>
        </div>
        {isAuth && (
          <input
            value={search}
            onChange={searchHandler}
            className='search'
            type='text'
            placeholder='search...'
          />
        )}
        <div className='account'>
          {!isAuth && (
            <>
              <Link to='/registration'>Sign Up</Link>
              <Link to='/login'>Sign In</Link>
            </>
          )}

          {isAuth && (
            <button type='button' onClick={logoutHandler}>
              Exit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
