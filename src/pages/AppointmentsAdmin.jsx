import React from "react";
import Calendar from "../components/calendar/Calendar";
import { months, getDays } from "../helpers/date";

const AppointmentsAdmin = () => {
  const actualDate = new Date();
  console.log(actualDate.getMonth());

  const month = actualDate.getMonth();
  const year = actualDate.getFullYear();
  const totalDays = getDays(actualDate.getFullYear(), month);

  const dayOne = new Date(year, month, 1);
  const initialDay = dayOne.getDay();
  const dayEnd = new Date(year, month, totalDays);
  const finalDay = dayEnd.getDay();

  return (
    <>
      <h2>{months[month]}</h2>
      <p>
        Tiene {totalDays} días {month}
      </p>
      <Calendar
        totalDays={totalDays}
        month={month}
        year={year}
        initialDay={initialDay}
        finalDay={finalDay}
      />
      <p>{actualDate.getDay()}</p>
    </>
  );
};

export default AppointmentsAdmin;
