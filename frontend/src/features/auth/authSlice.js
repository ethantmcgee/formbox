import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: null,
    refreshToken: null
  },
  reducers: {
    setAuthToken: (state, token) => {
      state.authToken = token.payload
    },
    setRefreshToken: (state, token) => {
      state.refreshToken = token.payload
    },
    logout: (state) => {
      state.authToken = null
      state.refreshToken = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthToken, setRefreshToken, logout  } = authSlice.actions

export const selectToken = (state) => state.auth?.authToken

export default authSlice.reducer