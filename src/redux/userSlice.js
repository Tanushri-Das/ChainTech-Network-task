import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  profession: "",
  age: "",
  gender: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        profession: action.payload.profession,
        age: action.payload.age,
        gender: action.payload.gender,
      };
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export const selectUserInfo = (state) => state.user;
export default userSlice.reducer;
