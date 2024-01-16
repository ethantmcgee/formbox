import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, token) => {
      state.token = token.payload
    },
    unsetToken: (state) => {
      state.token = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, unsetToken } = authSlice.actions

export const selectToken = (state) => state.auth?.token

export default authSlice.reducer