import { useSelector } from 'react-redux'
import Profile from './pages/profile/Profile'
import Login from './pages/registration/Login'
import Registration from './pages/registration/Registration'
import Storage from './pages/storage/Storage'

const { Routes, Route, Navigate } = require('react-router-dom')

const Router = () => {
  const { isAuth } = useSelector((state) => state.user)

  return (
    <>
      {!isAuth && (
        <Routes>
          <Route path='/registration' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      {isAuth && (
        <Routes>
          <Route path='/' element={<Storage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  )
}

export default Router
