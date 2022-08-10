import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const fileAPI = createApi({
  reducerPath: 'fileAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/file/'}),
  endpoints: (build) => ({   
    getFiles: build.query({
      query: ({dirId}) => ({
        url: `${dirId ? `?parent=${dirId}` : ''}`,
        method: 'GET',
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      })
    }),
  })
})
