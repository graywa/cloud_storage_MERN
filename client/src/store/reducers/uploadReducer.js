import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
  name: 'upload-files',
  initialState: {
    isShowUploader: false,
    files: [],
  },
  reducers: {
    showUploader(state) {
      state.isShowUploader = true
    },
    hideUploader(state) {
      state.isShowUploader = false
    },
    addFile(state, { payload: { fileToUpload } }) {
      state.files.push(fileToUpload)
    },
    removeFile(state, { payload: { id } }) {
      state.files = state.files.filter((file) => file.id !== id)
    },
    updateFileProgress(state, { payload: { id, progress } }) {
      console.log(id, progress)
      const file = state.files.find((file) => file.id === id)
      file.progress = progress
    },
  },
})

export const {
  showUploader,
  hideUploader,
  removeFile,
  addFile,
  updateFileProgress,
} = fileSlice.actions

export default fileSlice.reducer
