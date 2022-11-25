import { createSlice } from "@reduxjs/toolkit";

const initialPacientsState = {
  pacients: [],
};

const pacientsSlice = createSlice({
  name: "pacients",
  initialState: initialPacientsState,
  reducers: {
    fetchPacients(state, action) {
      return action.payload;
    },
  },
});

export const pacientsActions = pacientsSlice.actions;

export default pacientsSlice.reducer;