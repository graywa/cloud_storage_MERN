import React from 'react'
import { Link } from 'react-router-dom'
import upload from '../assets/upload.png'
import './Header.scss'

const Header = () => {
  return (
    <div className='header'>
        <div className='content container'>
          <div className='logo'>
            <img width={40} src={upload} alt='upload' />
            <h3>MERN Storage</h3>
          </div>
          <div className='accaunt'>
            <Link to='/registration'>Sign Up</Link>
            <Link to='/login'>Sign In</Link>
          </div>
      </div>
    </div>
  )
}

export default Header
