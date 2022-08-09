import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { userAPI } from '../api/user-api'
import files from '../store/reducers/fileReducer'
import user from '../store/reducers/userReducer'

export default configureStore({
  reducer: {
    files,
    user,
    [userAPI.reducerPath]: userAPI.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userAPI.middleware)  
})