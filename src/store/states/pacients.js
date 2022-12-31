import { createSlice } from "@reduxjs/toolkit";

const initialPacientsState = {
  pacients: [],
  currentPacient: [],
};

const pacientsSlice = createSlice({
  name: "pacients",
  initialState: initialPacientsState,
  reducers: {
    fetchPacients(state, action) {
      return { ...state, pacients: action.payload };
    },
    setCurrentPacient(state, action) {
      return { ...state, currentPacient: action.payload };
    },
  },
});

export const pacientsActions = pacientsSlice.actions;

export default pacientsSlice.reducer;
