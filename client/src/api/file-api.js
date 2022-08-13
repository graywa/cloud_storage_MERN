import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const fileAPI = createApi({
  reducerPath: 'fileAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/file/' }),
  tagTypes: ['File'],
  endpoints: (build) => ({
    getFiles: build.query({
      query: ({ dirId }) => ({
        url: `${dirId ? `?parent=${dirId}` : ''}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
      providesTags: ['File'],
    }),

    createDir: build.mutation({
      query: ({ name, dirId }) => ({
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
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

  }),
})
