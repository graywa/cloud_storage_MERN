import Registration from './pages/registration/Registration'

const { Routes, Route } = require('react-router-dom')

const Router = () => {
  return (
    <Routes>
      <Route path='/registration' element={<Registration />}/>
    </Routes>
  )
}

export default Router