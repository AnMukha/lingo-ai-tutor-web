import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
    signedIn: boolean,
    userName: string | null,
    loading: boolean,
    errorMessage: string | null
}

export interface TokenResponse {
    token: string | null,
    message: string | null,
    userName: string | null, 
}

export interface LoginData {
    userName: string;
    password: string;
}

const initialState: AuthState = {
    signedIn: typeof localStorage.getItem('authToken') === 'string',
    userName: localStorage.getItem('userName'),
    loading: false,
    errorMessage: null
};

export const fetchAuthToken = createAsyncThunk<TokenResponse, LoginData>('general/login', async ({userName, password}) => {
    const response = await axios.post<TokenResponse>('https://localhost:7168/api/login', {userName, password});
    const token = response.data.token;
    if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', response.data.userName!);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return response.data;
  });
  

export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: { 
        signedOut: (state) => {            
            state.signedIn = false;
            state.userName = null;
        },
    },
    extraReducers:  (builder) => {
        builder
        .addCase(fetchAuthToken.pending, (state) => {
            console.log("login...");
            state.loading = true;
          })
        .addCase(fetchAuthToken.fulfilled, (state, action) => {
            state.loading = false;
            state.userName = action.payload.userName;
            state.errorMessage = action.payload.message;
            state.signedIn = action.payload.token != null;
          })
        .addCase(fetchAuthToken.rejected, (state, action) => {
            state.loading = false;
            state.errorMessage = "Something wrong, try again";
          });
          }
  });
  
  export const { signedOut } = generalSlice.actions;

  export default generalSlice.reducer;