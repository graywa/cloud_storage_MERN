import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = {
  baseUrl: 'http://localhost:5000/api/file/',
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
      query: ({ dirId, sort, search = '' }) => {
        const parent = dirId ? dirId : undefined
        return { url: '/', method: 'GET', params: {parent, sort, search} }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'File', id })),
              { type: 'File', id: 'LIST' },
            ]
          : [{ type: 'File', id: 'LIST' }],
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
      invalidatesTags: [{ type: 'File', id: 'LIST' }],
    }),

    deleteFile: build.mutation({
      query: ({ id }) => {
        return {
          url: '/',
          method: 'DELETE',
          params: {
            id,
          },
        }
      },
      invalidatesTags: [{ type: 'File', id: 'LIST' }],
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
