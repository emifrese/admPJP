import React from "react";
import { days, months } from "../../helpers/date";

const MonthDayWrapper = ({ day, today, rowStart, colStart, children }) => {
  // console.log(rowStart, day)
  const classDiv = `flex flex-col content-center bg-white rounded-md hover:animate-day-animation shadow-month-day overflow-hidden w-36 h-28 row-start-${rowStart} col-start-${colStart}${
    day.getDate() === today.getDate() &&
    day.getMonth() === today.getMonth() ?
    " bg-red-500" : ""
  }`;

  return (
    <div className={classDiv}>
      <span className="w-full text-center">
        {day.getDate()} de {months[day.getMonth()]}
      </span>
      {children}
    </div>
  );
};

export default MonthDayWrapper;
