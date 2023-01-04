import { createSlice } from "@reduxjs/toolkit";

const actualDate = new Date();

const initialTurnosState = {
  place: "BIGG",
  defAppointments: [],
  appointments: [],
  date: actualDate,
  testDay: date.getDate(),
  day: actualDate.getDate(),
  month: actualDate.getMonth(),
  year: actualDate.getFullYear(),
  time: "",
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
    defaultAppointments(state, action){
      return {...state, defAppointments: action.payload}
    }
    ,
    firstEnteredData(state, action) {
      return { ...state, appointments: action.payload };
    },
    moveMonth(state, action) {
      const currentYear = state.year;
      const currentMonth = state.month;
      switch (action.payload) {
        case 'increment':
          if (currentMonth === 11) {
            return {
              ...state,
              month: 0,
              year: currentYear + 1
            };
          }
          return {
            ...state,
            month: currentMonth + 1,
          };
        case 'reduction':
          if (currentMonth === 0){
            return {
              ...state,
              month: 11,
              year: currentYear - 1
            }
          } 
          return {
            ...state, 
            month: currentMonth - 1
          }
        default:
          break;
      }  
    },
    setDay(state,action){
      if(state.day !== action.payload){
        console.log('not the same')
        return {
          ...state,
          day: action.payload
        }
      }
        return {
          ...state
        }
    },
    setTime(state, action){
      return {
        ...state,
        time: action.payload
      }
    },
    changeDate(state, action){
      const stateDate = state.date
      const newDate = stateDate.setDate(stateDate.getDate() + 1);

      if(action.payload === 'add'){
        return {
          ...state,
          date: newDate
        }
      }
    }
  },
});

export const appointmentsActions = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
