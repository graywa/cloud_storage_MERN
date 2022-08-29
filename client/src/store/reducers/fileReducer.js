import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    search: '',
    currentDir: {id: null, name: '\\'},
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
