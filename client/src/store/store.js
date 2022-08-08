import {configureStore} from '@reduxjs/toolkit'
import files from '../store/reducers/fileReducer'
import user from '../store/reducers/userReducer'

export default configureStore({
  reducer: {
    files,
    user
  }
})