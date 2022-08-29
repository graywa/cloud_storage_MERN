import { isRejectedWithValue } from '@reduxjs/toolkit'
import { logout } from '../reducers/userReducer'

export const unauthMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (
      isRejectedWithValue(action) &&
      action.payload.status === 401
    ) {
      console.log(action)
      dispatch(logout())
    }

    return next(action)
  }
