import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export const selectAuth = state => state.auth;
export default authSlice.reducer;
