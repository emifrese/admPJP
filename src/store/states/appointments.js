import { createSlice } from "@reduxjs/toolkit";
import { months } from "../../helpers/date";

const actualDate = new Date();

const initialTurnosState = {
  place: "BIGG",
  month: months[actualDate.getMonth()].toLowerCase(),
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: initialTurnosState,
  reducers: {
    togglePlace(state, action) {
      if (action.payload !== state.place) {
        return { ...state, ...action.payload };
      } else {
        return state;
      }
    },
    firstEnteredData(state, action) {
      return { ...state, appointments: action.payload };
    },
  },
});

export const appointmentsActions = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
