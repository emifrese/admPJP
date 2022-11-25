import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./states/appointments";
import pacientsReducer from "./states/pacients";

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    pacients: pacientsReducer,
  },
});

export default store;
