import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api/auth/'}),
  endpoints: (build) => ({
    registration: build.mutation({
      query: ({email, password}) => ({
        url: '/registration',
        method: 'POST',
        body: {
          email,
          password
        }
      })
    })
  })
})
