import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { _axios, uri_api } from '../api';
import axios from 'axios';

export const userLogin = createAsyncThunk(
  'auth/login',
  async (routeParams, { getState }) => {
    const res = await api('login', routeParams);
    // console.log('res', res);
    return res.data;
  }
);

const initialState = { user: {}, islogin: false };

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {},
    logout: (state) => {}
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      console.log('user login loading');
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log('user login success', action.payload);
    },
    [userLogin.rejected]: (state, action) => {
      console.log('user login rejected', action.payload);
    }
  }
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
