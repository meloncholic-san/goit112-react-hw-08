import { createSlice } from "@reduxjs/toolkit";
import { login, register, refreshUser, logOut } from "./operations";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: {
        name: null,
        email: null,
      },
      token: null,
      isLoggedIn: false,
      isRefreshing: false,
    },
    extraReducers: (builder) =>
        builder
    //Чи є сенс додавати статуси для pending та reject, наприклад isLoading, error? Для цього
    //треба в стані буде створити додоткові елементи, і нічого страшного, що вони будуть такі
    //самі, як в contacts? є варіант змінювати isLoading контактів
    // через extraReducers на action register. Чи нормально так робити? 
    .addCase(register.pending, state =>{
        state.isLoggedIn = false;
    })
    .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
    })
    .addCase(login.pending, state => {
        state.isLoggedIn = false;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
    })
    .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
    })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRefreshing = false;
        state.isLoggedIn = true;
    })
    .addCase(refreshUser.rejected, state =>{
        state.isRefreshing = false;
    })
})


export default authSlice.reducer;