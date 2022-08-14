import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = {
  baseUrl: 'http://localhost:5000/api/file',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
}

export const fileAPI = createApi({
  reducerPath: 'fileAPI',
  baseQuery: fetchBaseQuery(baseQuery),
  tagTypes: ['File'],
  endpoints: (build) => ({
    getFiles: build.query({
      query: ({ dirId }) => ({
        url: `/${dirId ? `?parent=${dirId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['File'],
    }),

    createDir: build.mutation({
      query: ({ name, dirId }) => ({
        method: 'POST',
        body: {
          name,
          parent: dirId,
          type: 'dir',
        },
      }),
      invalidatesTags: ['File'],
    }),

    uploadFile: build.mutation({
      query: (body) => {
        return {
          url: '/upload',
          method: 'POST',
          body,
          onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthCumputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader('content-length') ||
                progressEvent.target.getResponseHeader(
                  'x-decopressed-content-length'
                )
            console.log(totalLength)
            if (totalLength) {
              let progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              )
              console.log(progress)
            }
          },
        }
      },
      invalidatesTags: ['File'],
    }),

    downloadFile: build.query({
      query: ({ _id }) => ({
        url: '/download',
        method: 'GET',
        params: {
          _id,
        },
        responseHandler: async (response) => {  
          return window.URL.createObjectURL(await response.blob())
        },
        cache: 'no-cache',
      }),
    }),
  }),
})
