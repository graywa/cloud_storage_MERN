import { createSlice } from '@reduxjs/toolkit'

const uploadSlice = createSlice({
  name: 'upload-files',
  initialState: {
    isShowUploader: false,
    files: [],
    isLoading: false,
  },
  reducers: {
    setIsLoading(state, {payload: {isLoading}}) {
      state.isLoading = isLoading
    },
    showUploader(state) {
      state.isShowUploader = true
    },
    hideUploader(state) {
      state.isShowUploader = false
    },
    addFile(state, { payload: { fileToUpload } }) {
      state.files.unshift(fileToUpload)
    },
    removeFile(state, { payload: { id } }) {
      state.files = state.files.filter((file) => file.id !== id)
    },
    updateFileProgress(state, { payload: { id, progress } }) {
      const file = state.files.find((file) => file.id === id)
      file.progress = progress
    },
  },
})

export const {
  setIsLoading,
  showUploader,
  hideUploader,
  removeFile,
  addFile,
  updateFileProgress,
} = uploadSlice.actions

export default uploadSlice.reducer
