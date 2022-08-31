import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    search: '',
    currentDir: {id: null, name: 'root'},
    dirStack: [],
  },
  reducers: {
    setFiles(state, { payload: { files } }) {
      state.files = files
    },
    setCurrDir(state, { payload: { currentDir } }) {
      state.currentDir = currentDir
    },
    addDir(state, { payload: { file } }) {
      state.files.push(file)
    },
    addDirToStack(state, { payload: {prevDir}}) {
      state.dirStack.push(prevDir)
    },
    delDirsFromStack(state, {payload: {id}}) {
      const lastIndex = state.dirStack.findIndex(dir => dir.id === id)
      state.dirStack = state.dirStack.slice(0, lastIndex)
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
  delDirsFromStack,
  setSearchToStore,
} = fileSlice.actions

export default fileSlice.reducer
