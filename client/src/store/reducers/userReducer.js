import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: false
  },
  reducers: {

  }
})

export const {} = userSlice.actions

export default userSlice.reducer