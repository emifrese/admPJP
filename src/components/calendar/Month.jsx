import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDays, months } from "../../helpers/date";
import { appointmentsActions } from "../../store/states/appointments";
import { pacientsActions } from "../../store/states/pacients";
import NewOrRecurring from "../forms/NewOrRecurring";
import RecurringPacient from "../forms/RecurringPacients";
import MonthDayWrapper from "./MonthDayWrapper";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";

const Month = ({ toggleModal, modal }) => {
  //   console.log('render')
  const today = new Date();
  const month = useSelector((state) => state.appointments.month);
  const year = useSelector((state) => state.appointments.year);
  const turnos = useSelector((state) => state.appointments.appointments);
  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );
  const pacients = useSelector((state) => state.pacients.pacients);
  const dispatch = useDispatch();
  const totalDays = getDays(year, month);

  const dayOne = new Date(year, month, 1);
  const dayEnd = new Date(year, month, totalDays);
  // console.log(defAppointments);
  const appointmentsWeekDays = defAppointments
    .map((el) => parseInt(el.day))
    .sort();

  // console.log(appointmentsWeekDays);

  let squareDays = [];

  for (let i = 0; i < totalDays; i++) {
    const day = new Date(year, month, i + 1);
    const defDayAppointments = defAppointments.find(
      (el) => el.day === day.getDay().toString()
    );
    const dayAppointments = turnos.find(
      (el) => el.day === day.getDate().toString()
    );
    let appointmentsDisplay;
    let scheduleAppointments;
    if (defDayAppointments) {
      appointmentsDisplay = Object.entries(defDayAppointments)
        .filter((el) => el[0] !== "id" && el[0] !== "day")
        .map((el) => {
          const hourText = `${el[1].hour.substring(
            0,
            2
          )}:${el[1].hour.substring(2)}`;
          return (
            <p
              className={
                `cursor-pointer m-1 w-14 text-center rounded-md bg-header-green text-white ${el[1].available ? "inline-block" : "hidden"}`
              }
              onClick={(e) => {
                dispatch(
                  appointmentsActions.setDay(
                    parseInt(e.target.getAttribute("data-day"))
                  )
                );
                dispatch(
                  appointmentsActions.setTime(
                    e.target.getAttribute("data-time")
                  )
                );
                dispatch(pacientsActions.setCurrentPacient({}));
                toggleModal("new");
              }}
              data-day={day.getDate()}
              data-time={el[1].hour}
              key={Math.random().toString(32).slice(2)}
            >
              {hourText}
            </p>
          );
        });
    }
    if (dayAppointments) {
      scheduleAppointments = Object.entries(dayAppointments).filter(
        (el) => el[0] !== "id" && el[0] !== "day"
      );
    }
    console.log(appointmentsDisplay)
    if (
      scheduleAppointments &&
      appointmentsDisplay &&
      Object.keys(appointmentsDisplay).length > 0
    ) {
      for (let el of scheduleAppointments) {
        console.log(el[0]);
        const temp = {
          ...appointmentsDisplay.filter(
            (app) =>
              app.props.children ===
              `${el[1].hour.substring(0, 2)}:${el[1].hour.substring(2)}`
          ),
        };
        const index = appointmentsDisplay.indexOf(temp[0]);
        const newTemp = Object.keys(temp).length > 0 && {
          ...temp[0],
          props: {
            ...temp[0].props,
            className: temp[0].props.className.replace("hidden", "inline-block").replace("bg-header-green", "bg-red-500"),
            onClick: (e) => {
              const id = e.target.getAttribute("id");
              const pacient = pacients.filter((pacient) => pacient.id === id);
              console.log(pacient[0]);
              dispatch(pacientsActions.setCurrentPacient(pacient[0]));
              console.log("here");
              dispatch(appointmentsActions.setDay(newTemp.props["data-day"]));
              dispatch(appointmentsActions.setTime(newTemp.props["data-time"]));
              toggleModal("recurring");
            },
            id: el[1].pacientId,
          },
        };
        appointmentsDisplay[index] = newTemp;
      }
    }
    if (appointmentsDisplay !== undefined) {
      const colStart = `col-start-${
        appointmentsWeekDays.indexOf(day.getDay()) + 1
      }`;

      squareDays.push(
        <MonthDayWrapper
          key={Math.random().toString(32).slice(2)}
          day={day}
          today={today}
          colStart={colStart}
        >
          <div className="flex flex-wrap h-full justify-center content-center">
            {appointmentsDisplay}
          </div>
        </MonthDayWrapper>
      );
    }
  }

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between">
          <button
            onClick={() => dispatch(appointmentsActions.moveMonth("reduction"))}
          >
            <img className="w-8" src={arrowPrev} />
          </button>
          <h2 className="text-4xl uppercase font-bold text-center">
            {months[month]}
          </h2>
          <button
            onClick={() => dispatch(appointmentsActions.moveMonth("increment"))}
          >
            <img className="w-8" src={arrowNext} />
          </button>
        </div>
        <div className="flex w-full justify-between">
          <div className="w-1/2 grid justify-between content-center gap-y-2 grid-cols-3">
            {squareDays}
          </div>
          <div className="relative w-1/2 flex flex-col justify-center items-center gap-10 px-12">
            <h3 className="absolute top-0 text-2xl font-semibold">Turnos del dia</h3>
            {modal[1] && modal[0] === "new" && <NewOrRecurring />}
            {modal[1] && modal[0] === "recurring" && <RecurringPacient />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Month;
