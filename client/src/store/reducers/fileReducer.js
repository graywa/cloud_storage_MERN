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
    setCurrDir(state, {currDir}) {
      state.currentDir = currDir
    },
  }
})

export const {setCurrDir, setFiles} = fileSlice.actions

export default fileSlice.reducer
