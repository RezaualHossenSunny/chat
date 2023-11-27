import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice'
import activeChatSlice from './Slices/activeChatSlice'

export const store = configureStore({
  reducer: {
    userLoginInfo:userSlice,
    activeChatSlice:activeChatSlice
  },
})