import { createApi } from '@reduxjs/toolkit/dist/query/react'
import axios from 'axios'
import { setIsLoading, updateFileProgress } from '../store/reducers/uploadReducer'
import { baseUrl } from './base-url'

const axiosBaseQuery = ({ baseUrl }) => {
  return async ({ method, formData, dispatch, fileToUpload }) => {
    try {
      dispatch(setIsLoading({isLoading: true}))

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
            dispatch(updateFileProgress(updFileToUpload))
          }
        },
      })

      return { data: response.data }
    } catch (e) {
      return {
        error: {
          status: e.response?.status,
          data: e.response?.data || e,
        },
      }
    } finally {
      dispatch(setIsLoading({isLoading: false}))
    }
  }
}

export const uploadAPI = createApi({
  reducerPath: 'uploadAPI',
  baseQuery: axiosBaseQuery({
    baseUrl: baseUrl + 'api/file/upload',
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
