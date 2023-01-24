import { createSlice } from "@reduxjs/toolkit";

const initialResponsiveState = {
  width: window.innerWidth,
};

const responsiveSlice = createSlice({
  name: "responsive",
  initialState: initialResponsiveState,
  reducers: {
    setWidth(state, action) {
        return {
            ...state,
            width: action.payload
        }
    }
  },
});

export const responsiveActions = responsiveSlice.actions;

export default responsiveSlice.reducer;