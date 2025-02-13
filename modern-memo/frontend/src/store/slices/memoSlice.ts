import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Memo {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  createdAt: string
  updatedAt: string
}

interface MemoState {
  memos: Memo[]
  selectedMemo: Memo | null
  loading: boolean
  error: string | null
}

const initialState: MemoState = {
  memos: [],
  selectedMemo: null,
  loading: false,
  error: null
}

const memoSlice = createSlice({
  name: 'memo',
  initialState,
  reducers: {
    setMemos: (state, action: PayloadAction<Memo[]>) => {
      state.memos = action.payload
      state.loading = false
      state.error = null
    },
    setSelectedMemo: (state, action: PayloadAction<Memo>) => {
      state.selectedMemo = action.payload
    },
    addMemo: (state, action: PayloadAction<Memo>) => {
      state.memos.push(action.payload)
    },
    updateMemo: (state, action: PayloadAction<Memo>) => {
      const index = state.memos.findIndex(memo => memo.id === action.payload.id)
      if (index !== -1) {
        state.memos[index] = action.payload
      }
    },
    deleteMemo: (state, action: PayloadAction<string>) => {
      state.memos = state.memos.filter(memo => memo.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const {
  setMemos,
  setSelectedMemo,
  addMemo,
  updateMemo,
  deleteMemo,
  setLoading,
  setError
} = memoSlice.actions

export default memoSlice.reducer 