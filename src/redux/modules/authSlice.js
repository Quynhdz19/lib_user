import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: getLocalStorageObj('user'),
  accessToken: localStorage.getItem('access_token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    setAuthAccessToken(state, action) {
      state.accessToken = action.payload
      localStorage.setItem('access_token', action.payload)
    },
    logout(state) {
      state.user = undefined
      state.accessToken = undefined
      localStorage.removeItem('user')
      localStorage.removeItem('access_token')
    },
  },
})

export const { setAuthUser, setAuthAccessToken, logout } = authSlice.actions
export const authReducer = authSlice.reducer

function getLocalStorageObj(key) {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : undefined
}
