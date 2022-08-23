import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    search: '',
    currentDir: null,
    dirStack: [],
  },
  reducers: {
    setFiles(state, { payload: { files } }) {
      state.files = files
    },
    setCurrDir(state, { payload: { currDir } }) {
      state.currentDir = currDir
    },
    addDir(state, { payload: { file } }) {
      state.files.push(file)
    },
    addDirToStack(state, { payload: { dirId } }) {
      state.dirStack.push(dirId)
    },
    delDirFromStack(state) {
      state.dirStack.pop()
    },
    setSearchToStore(state, { payload: { search } }) {
      state.search = search
    },
  },
})

export const {
  setCurrDir,
  setFiles,
  addDir,
  addDirToStack,
  delDirFromStack,
  setSearchToStore,
} = fileSlice.actions

export default fileSlice.reducer
