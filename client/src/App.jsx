import Header from './components/header/Header'
import './App.scss'
import Router from './components/router'
import { useEffect } from 'react'
import { userAPI } from './api/user-api'
import { useDispatch } from 'react-redux'
import { setUser } from './store/reducers/userReducer'

function App() {
  const dispatch = useDispatch()
  const { data, isLoading, error } = userAPI.useAuthQuery()

  useEffect(() => {
    if (data) {
      const { token, user } = data
      dispatch(setUser({user}))
      localStorage.setItem('token', token)
    }
  }, [data])

  return (
    <div className='app'>
      <Header />
      <Router />
    </div>
  )
}

export default App
