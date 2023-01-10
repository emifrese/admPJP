import { configureStore } from "@reduxjs/toolkit";
import appointmentsReducer from "./states/appointments";
import pacientsReducer from "./states/pacients";
import responsiveReducer from "./states/responsive";

const store = configureStore({
  reducer: {
    appointments: appointmentsReducer,
    pacients: pacientsReducer,
    responsive: responsiveReducer,
  },
});

export default store;
