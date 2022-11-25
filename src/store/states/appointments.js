import { createSlice } from "@reduxjs/toolkit";

const initialTurnosState = {
  firstDay: "",
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: "turnos",
  initialState: initialTurnosState,
  reducers: {
    firstEnteredData(state, action) {
      return action.payload;
    },
  },
});

export const appointmentsActions = appointmentsSlice.actions;

export default appointmentsSlice.reducer;