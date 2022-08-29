import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from '../api/user-api'
import { fileAPI } from '../api/file-api'
import files from '../store/reducers/fileReducer'
import user from '../store/reducers/userReducer'
import uploadFiles from '../store/reducers/uploadReducer'
import { uploadAPI } from '../api/upload-api'
import { unauthMiddleware } from './middleware/unauthMiddleware'

export default configureStore({
  reducer: {
    files,
    user,
    uploadFiles,
    [userAPI.reducerPath]: userAPI.reducer,
    [fileAPI.reducerPath]: fileAPI.reducer,
    [uploadAPI.reducerPath]: fileAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      fileAPI.middleware,
      userAPI.middleware,
      uploadAPI.middleware,
      unauthMiddleware,
    ),
})
