import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
  sider: {
    collapsed: false,
  },
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppTheme(state, action) {
      state.theme = action.payload
    },
    setAppSiderCollapsed(state, action) {
      state.sider.collapsed = action.payload
    },
  },
})

export const { setAppTheme, setAppSiderCollapsed } = appSlice.actions
export const appReducer = appSlice.reducer
