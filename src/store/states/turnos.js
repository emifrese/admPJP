import { createSlice } from "@reduxjs/toolkit";

const initialTurnosState = {
  firstDay: "",
  turnos: [],
};

const turnosSlice = createSlice({
  name: "turnos",
  initialState: initialTurnosState,
  reducers: {
    firstEnteredData(state, action) {
      const result = { ...state, ...action.payload };
      return result;
    },
  },
});
