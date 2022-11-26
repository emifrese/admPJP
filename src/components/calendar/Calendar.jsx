import React from "react";
import { useSelector } from "react-redux";
import { days, getDays, months } from "../../helpers/date";

const Calendar = ({ totalDays, month, year, initialDay, finalDay }) => {
  const turnos = useSelector((state) => state.appointments.appointments);
  console.log(turnos);
  if (turnos) {
    const twelveAppoint = turnos.find((el) => el.id === "12");
  }
  let squareDays = [];
  let diffInitialDay = initialDay;
  let diffFinalDay = 6 - finalDay;

  if (diffInitialDay > 0) {
    for (let i = 0; i < initialDay; i++) {
      const day = new Date(year, month - 1, getDays(year, month) + 1 - i);
      squareDays.unshift(
        <div
          key={Math.random().toString(16).slice(2)}
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
    const dayAppointments = turnos.find(
      (el) => el.id === day.getDate().toString()
    );
    let appointmentsDisplay;
    if (dayAppointments) {
      
      appointmentsDisplay = Object.entries(dayAppointments).filter(el => el[0] !== 'id').map((el) => {
        return (
          <p
            className={
              "border-2 border-zinc-300 rounded-md py-2 px-4 " +
              (el[1].pacientId !== null ? "bg-red-300" : "bg-green-300")
            }
          >
            {el[0]}
          </p>
        );
      });
    }
    squareDays.push(
      <div
        key={Math.random().toString(16).slice(2)}
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
          key={Math.random().toString(16).slice(2)}
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
    </div>
  );
};

export default Calendar;
