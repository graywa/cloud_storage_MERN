import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { setSearchToStore } from '../../store/reducers/fileReducer'
import { logout } from '../../store/reducers/userReducer'
import storage from '../assets/storage.png'
import './Header.scss'
import { baseUrl } from '../../api/base-url'
import avatarLogo from '../assets/avatar.png'
import exit from '../assets/exit.png'

const Header = () => {
  const { isAuth, currentUser: user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const avatar = user?.avatar ? baseUrl + user.avatar : avatarLogo 

  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  const searchHandler = async (e) => {
    const searchValue = e.target.value
    setSearch(searchValue)
    dispatch(setSearchToStore({ search: searchValue }))
  }

  return (
    <div className='header'>
      <div className='content container'>
        <NavLink className='logo' to='/' title='To main'>          
          <img width={40} src={storage} alt='storage' />
          <h3>Cloud Storage</h3>
        </NavLink>
        {isAuth && (
          <input
            value={search}
            onChange={searchHandler}
            className='search'
            type='text'
            placeholder='search...'
          />
        )}
        <div className='header__account'>
          {!isAuth && (
            <>
              <Link to='/registration'>Sign Up</Link>
              <Link to='/login'>Sign In</Link>
            </>
          )}

          {isAuth && (
            <div className="header__user">
              <span>{user?.login || 'anonymous'}</span>
              <NavLink to='/profile' title='To profile' >
                <img src={avatar} alt='avatar' />
              </NavLink>
              <button className='exit-btn' type='button' onClick={logoutHandler}>
                <img width={24} src={exit} alt='exit' />
                Exit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
