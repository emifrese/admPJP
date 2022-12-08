import React from "react";
import Calendar from "../components/calendar/Calendar";
import { months, getDays } from "../helpers/date";

const AppointmentsAdmin = () => {
  const actualDate = new Date();
  console.log(actualDate.getMonth());

  const month = actualDate.getMonth();
  const year = actualDate.getFullYear();
  const totalDays = getDays(actualDate.getFullYear(), month);


  return (
    <>
      <h2>{months[month]}</h2>
      <p>
        Tiene {totalDays} días {month}
      </p>
      <Calendar/>
      <p>{actualDate.getDay()}</p>
    </>
  );
};

export default AppointmentsAdmin;
