import { createApi } from '@reduxjs/toolkit/dist/query/react'
import axios from 'axios'
import { updateFileProgress } from '../store/reducers/uploadReducer'

const axiosBaseQuery = ({ baseUrl }) => {
  return async ({ method, formData, dispatch, fileToUpload }) => {
    try {
      const response = await axios({
        url: baseUrl,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        method,
        data: formData,
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader(
                'x-decopressed-content-length'
              )
          if (totalLength) {
            const updFileToUpload = {...fileToUpload}
            updFileToUpload.progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            )
            console.log(updFileToUpload)
            dispatch(updateFileProgress(updFileToUpload))
          }
        },
      })

      return { data: response.data }
    } catch (e) {
      return {
        error: {
          status: e.response?.status,
          data: e.response?.data || e.message,
        },
      }
    }
  }
}

export const uploadAPI = createApi({
  reducerPath: 'uploadAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://localhost:5000/api/file/upload',
  }),
  endpoints: (build) => ({
    uploadFile: build.mutation({
      query: ({ formData, dispatch, fileToUpload }) => ({
        formData,
        dispatch,
        fileToUpload,
        method: 'POST',
      }),
    }),
  }),
})
