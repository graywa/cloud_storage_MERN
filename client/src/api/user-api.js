import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { baseUrl } from './base-url'

const baseQuery = {
  baseUrl: baseUrl + 'api/auth',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery(baseQuery),
  endpoints: (build) => ({
    registration: build.mutation({
      query: ({email, password, login}) => ({
        url: '/registration',
        method: 'POST',
        body: {
          email,
          password,
          login,
        }
      })
    }),
    login: build.mutation({
      query: ({email, password}) => ({
        url: '/login',
        method: 'POST',
        body: {
          email,
          password
        }
      })
    }),
    auth: build.query({
      query: () => ({
        url: '/auth',
        method: 'GET',
      })
    }),  
  })
})
