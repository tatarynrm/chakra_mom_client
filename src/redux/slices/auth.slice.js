import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const fetchAuth = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    try {
      // api.defaults.withCredentials = true;
      const { data } = await api.post("/auth/login", params);
     
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegisterUser",
  async (params) => {
    const { data } = await api.post("/auth/register", params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMe",
  async (params) => {
    try {
      const data = await api.get("/auth/me", params);


      
   
  return data.data;
    } catch (error) {
      console.log('ERRRORR',error);
      if (error.response.data.alert === 'Invalid token') {
      return  window.localStorage.removeItem('token')
      }
      if (error.response.status === 403) {
      window.localStorage.removeItem('token')
      window.location.reload()
      }
      if (error.code === 'ERR_NETWORK') {
       return window.localStorage.clear()
      }
    }
  }
);


const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loaded";
    },
    loginUserWithGoogle:(state,action) =>{
      console.log(action);
      
      state.data = action.payload
      state.status = "loaded";
    }
  },
  
    extraReducers: (builder) => {
      builder.addCase(fetchAuth.pending, (state, action) => {
        // Add user to the state array
        state.data = [];
        state.status = "loading";
      });
      builder.addCase(fetchAuth.fulfilled, (state, action) => {
        // Add user to the state array
        state.data = action.payload;
        state.status = "loaded";
      });
      builder.addCase(fetchAuth.rejected, (state, action) => {
        // Add user to the state array
        state.data = [];
        state.status = "loading";
      });
      builder.addCase(fetchAuthMe.pending, (state, action) => {
        // Add user to the state array
        state.data = [];
        state.status = "loading";
      });
      builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
        // Add user to the state array
        state.data = action.payload;
        state.status = "loaded";
      });
      builder.addCase(fetchAuthMe.rejected, (state, action) => {
        // Add user to the state array
        state.data = [];
        state.status = "loading";
      });
  
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;

export const { logout,loginUserWithGoogle } = authSlice.actions;