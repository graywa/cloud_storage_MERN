import {configureStore} from '@reduxjs/toolkit'
import { userAPI } from '../api/user-api'
import { fileAPI } from '../api/file-api'
import files from '../store/reducers/fileReducer'
import user from '../store/reducers/userReducer'

export default configureStore({
  reducer: {
    files,
    user,
    [userAPI.reducerPath]: userAPI.reducer,
    [fileAPI.reducerPath]: fileAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(userAPI.middleware)  
})