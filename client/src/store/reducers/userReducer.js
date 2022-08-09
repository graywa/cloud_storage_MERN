import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: {},
    isAuth: false
  },
  reducers: {
    setUser(state, {payload: {user}}) {
      console.log(user)
      state.currentUser = user
      state.isAuth = true
    },
    logout(state) {
      state.currentUser = {}
      state.isAuth = false
    }
  }
})

export const {setUser, logout} = userSlice.actions

export default userSlice.reducer