import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (value) => {
    axios.defaults.headers.common.Authorization = value;
  };

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post('/users/signup', credentials);
            setAuthHeader(`Bearer ${response.data.token}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
      try {
        const response = await axios.post('/users/login', credentials);
        setAuthHeader(`Bearer ${response.data.token}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  

  
export const refreshUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
      try {
        const reduxState = thunkAPI.getState();
        setAuthHeader(`Bearer ${reduxState.auth.token}`);
        const response = await axios.get('/users/current');
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    },
    {
      condition: (_, thunkAPI) => {
        const reduxState = thunkAPI.getState();
        return reduxState.auth.token !== null;
      },
    }
  );


  export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axios.post('/users/logout');
            setAuthHeader('');
            return response.data;  
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }

    }
  )