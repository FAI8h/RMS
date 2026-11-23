import { createSlice } from '@reduxjs/toolkit';
import { login, loginTeacher, fetchMe, logoutUser } from './services/authThunks';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  status: 'idle',
  checking: true, // true until the first fetchMe finishes
  error: null
};

const resetSession = (state) => {
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
  state.error = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      resetSession(state);
    }
  },
  extraReducers: (builder) => {
    const pending = (state) => {
      state.status = 'loading';
      state.error = null;
    };
    const fulfilled = (state, action) => {
      state.status = 'succeeded';
      state.checking = false;          // <- add
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    };
    const rejected = (state, action) => {
      state.status = 'failed';
      state.error = action.payload?.message || 'Login failed';
    };

    builder
      .addCase(login.pending, pending)
      .addCase(login.fulfilled, fulfilled)
      .addCase(login.rejected, rejected)
      .addCase(loginTeacher.pending, pending)
      .addCase(loginTeacher.fulfilled, fulfilled)
      .addCase(loginTeacher.rejected, rejected)
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.checking = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.checking = false;
        resetSession(state);
      })
      .addCase(logoutUser.fulfilled, resetSession)
      .addCase(logoutUser.rejected, resetSession);
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;