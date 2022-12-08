import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { days, getDays, months } from "../../helpers/date";
import { appointmentsActions } from "../../store/states/appointments";

const Calendar = () => {
  const month = useSelector((state) => state.appointments.month);
  const year = useSelector((state) => state.appointments.year);
  const turnos = useSelector((state) => state.appointments.appointments);
  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );
  const dispatch = useDispatch();
  const totalDays = getDays(year, month);

  const dayOne = new Date(year, month, 1);
  const initialDay = dayOne.getDay();
  const dayEnd = new Date(year, month, totalDays);
  const finalDay = dayEnd.getDay();

  let squareDays = [];
  let diffInitialDay = initialDay;
  let diffFinalDay = 6 - finalDay;

  if (diffInitialDay > 0) {
    // console.log(diffInitialDay, year, month, getDays(year,month))
    for (let i = 0; i < initialDay; i++) {
      const day = new Date(year, month - 1, getDays(year, month - 1) - i);
      // console.log(day)
      squareDays.unshift(
        <div
          key={Math.random().toString(32).slice(2)}
          className="bg-zinc-200 border-2 border-zinc-300"
        >
          {day.toDateString()}
          {days[day.getDay()]}
          {months[month - 1]}
        </div>
      );
    }
  }

  for (let i = 0; i < totalDays; i++) {
    const day = new Date(year, month, i + 1);
    const defDayAppointments = defAppointments.find(
      (el) => el.id === day.getDay().toString()
    );
    const dayAppointments = turnos.find(
      (el) => el.id === day.getDate().toString()
    );
    // console.log(dayAppointments);
    // console.log(turnos[0])
    let appointmentsDisplay;
    let scheduleAppointments;
    if (defDayAppointments) {
      // console.log(Object.entries(defDayAppointments));
      appointmentsDisplay = Object.entries(defDayAppointments)
        .filter((el) => el[0] !== "id")
        .map((el) => {
          // console.log(el);
          return (
            <p
              className={
                "border-2 border-zinc-300 rounded-md py-2 px-4 bg-green-300"
              }
            >
              {el[0]}
            </p>
          );
        });
    }
    if (dayAppointments) {
      // console.log(Object.entries(dayAppointments));
      scheduleAppointments = Object.entries(dayAppointments)
        .filter((el) => el[0] !== "id");
    }
    if(scheduleAppointments && appointmentsDisplay){
      console.log(appointmentsDisplay)
      for(let el of scheduleAppointments){
        const temp = {...appointmentsDisplay.filter(app => app.props.children === el[0])};
        const index = appointmentsDisplay.indexOf(temp[0]);
        const newTemp = {...temp[0], props: { ...temp[0].props, className: "border-2 border-zinc-300 rounded-md py-2 px-4 bg-red-300"}}
        console.log(index)
        appointmentsDisplay[index] = newTemp;
      }
    }
    squareDays.push(
      <div
        key={Math.random().toString(32).slice(2)}
        className="bg-white border-2 border-zinc-300 hover:animate-day-animation"
      >
        {day.toDateString()}
        {days[day.getDay()]}
        {appointmentsDisplay !== null && appointmentsDisplay}
      </div>
    );
  }

  if (diffFinalDay !== 0) {
    for (let i = 0; i < finalDay; i++) {
      const day = new Date(year, month + 1, i + 1);
      squareDays.push(
        <div
          key={Math.random().toString(32).slice(2)}
          className="bg-zinc-200 border-2 border-zinc-300"
        >
          {day.toDateString()}
          {days[day.getDay()]}
          {/* {months[month]} */}
        </div>
      );
    }
  }

  return (
    <div className="w-full grid justify-center content-center grid-cols-[repeat(7,_100px)] grid-rows-[repeat(7,_100px)]">
      {squareDays}
      <button
        onClick={() => dispatch(appointmentsActions.moveMonth("reduction"))}
      >
        Prev month
      </button>
      <button
        onClick={() => dispatch(appointmentsActions.moveMonth("increment"))}
      >
        Next month
      </button>
    </div>
  );
};

export default Calendar;
