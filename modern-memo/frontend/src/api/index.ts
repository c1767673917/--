import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { Memo } from '../store/slices/memoSlice'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest extends LoginRequest {
  username: string
}

export interface AuthResponse {
  user: {
    id: string
    username: string
    email: string
  }
  token: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials
      })
    }),
    getMemos: builder.query<Memo[], void>({
      query: () => '/memos'
    }),
    getMemoById: builder.query<Memo, string>({
      query: (id) => `/memos/${id}`
    }),
    createMemo: builder.mutation<Memo, Partial<Memo>>({
      query: (memo) => ({
        url: '/memos',
        method: 'POST',
        body: memo
      })
    }),
    updateMemo: builder.mutation<Memo, { id: string; memo: Partial<Memo> }>({
      query: ({ id, memo }) => ({
        url: `/memos/${id}`,
        method: 'PUT',
        body: memo
      })
    }),
    deleteMemo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/memos/${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMemosQuery,
  useGetMemoByIdQuery,
  useCreateMemoMutation,
  useUpdateMemoMutation,
  useDeleteMemoMutation
} = api 