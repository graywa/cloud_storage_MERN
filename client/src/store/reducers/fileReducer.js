import {createSlice} from '@reduxjs/toolkit'

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    currentDir: null
  },
  reducers: {
    setFiles(state, {payload: {files}}) {
      state.files = files
    },
    setCurrDir(state, {payload: {currDir}}) {
      state.currentDir = currDir
    },
    addDir(state, {payload: {file}}) {
      state.files.push(file)
    },
  }
})

export const {setCurrDir, setFiles, addDir} = fileSlice.actions

export default fileSlice.reducer
