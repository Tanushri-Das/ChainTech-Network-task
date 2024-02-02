// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  photo: '',
  phone: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        photo: action.payload.photo,
        phone: action.payload.phone,
      };
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export const selectUserInfo = (state) => state.user; // Selector to get user information
export default userSlice.reducer;
