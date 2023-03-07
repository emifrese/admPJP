import React from "react";
import { days, months } from "../../helpers/date";
import { rowClassToggle, colClassToggle } from "../../helpers/calendar";

const MonthDayWrapper = ({
  day,
  today,
  rowStart,
  colStart,
  children,
  toggleModal,
}) => {
  const rowClass = rowClassToggle(rowStart);
  const colClass = colClassToggle(colStart);

  // console.log(rowStart, day)
  const classDiv = `flex flex-col content-center bg-white rounded-md shadow-month-day overflow-hidden w-36 h-28 ${rowClass} ${colClass}${
    day.getDate() === today.getDate() && day.getMonth() === today.getMonth()
      ? " bg-red-500"
      : ""
  }`;

  return (
    <div
      className={classDiv}
      // onClick={toggleModal("day")}
    >
      <span className="w-full text-center">
        {day.getDate()} de {months[day.getMonth()]}
      </span>
      {children}
    </div>
  );
};

export default MonthDayWrapper;
