import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { days, getDays, months } from "../../helpers/date";
import { appointmentsActions } from "../../store/states/appointments";
import { pacientsActions } from "../../store/states/pacients";
import NewOrRecurring from "../forms/NewOrRecurring";
import RecurringPacient from "../forms/RecurringPacients";
import Modal from "../UI/Modal";

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

  console.log(defAppointments);
  const appointmentsWeekDays = defAppointments
    .map((el) => parseInt(el.day))
    .sort();

  console.log(appointmentsWeekDays);

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
          return (
            <p
              className={
                "cursor-pointer border-2 w-16 text-center border-zinc-300 rounded-md bg-green-300"
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
                toggleModal("new");
              }}
              data-day={day.getDate()}
              data-time={el[1].hour}
              key={Math.random().toString(32).slice(2)}
            >
              {el[1].hour}
            </p>
          );
        });
    }
    if (dayAppointments) {
      scheduleAppointments = Object.entries(dayAppointments).filter(
        (el) => el[0] !== "id" && el[0] !== "day"
      );
    }
    if (
      scheduleAppointments &&
      appointmentsDisplay &&
      Object.keys(appointmentsDisplay).length > 0
    ) {
      for (let el of scheduleAppointments) {
        const temp = {
          ...appointmentsDisplay.filter((app) => app.props.children === el[0]),
        };
        const index = appointmentsDisplay.indexOf(temp[0]);
        const newTemp = Object.keys(temp).length > 0 && {
          ...temp[0],
          props: {
            ...temp[0].props,
            className:
              "cursor-pointer border-2 w-16 text-center border-zinc-300 rounded-md bg-red-300",
            onClick: (e) => {
              // console.log(e.target.getAttribute("id"));
              const id = e.target.getAttribute("id");
              const currentPacient = pacients.filter(
                (pacient) => pacient.id === id
              );
              console.log(currentPacient[0])
              dispatch(pacientsActions.setCurrentPacient(currentPacient[0]));
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
      const colStart =
        "col-start-" + (appointmentsWeekDays.indexOf(day.getDay()) + 1);
      squareDays.push(
        <div
          key={Math.random().toString(32).slice(2)}
          className={`bg-white border-2 border-zinc-300 hover:animate-day-animation overflow-hidden w-40 max-h-40 ${colStart} ${
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            " bg-red-500"
          }`}
        >
          {days[day.getDay()]} {day.getDate()} de {months[day.getMonth()]}
          <div className="flex flex-wrap">{appointmentsDisplay}</div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex flex-col w-full">
        {/* Test new redux logic for date */}
        <button className=""></button>
        <h2 className="w-full text-center">{months[month]}</h2>
        <div className="flex w-full justify-between">
          <div className="w-1/2 grid justify-between content-center gap-y-2 grid-cols-3">
            {squareDays}
          </div>
          <div className="w-1/2">
            <h3>Turnos del dia</h3>
            {modal[1] && modal[0] === "new" && (
              <NewOrRecurring Toggle={toggleModal} />
            )}
            {modal[1] && modal[0] === "recurring" && (
              <RecurringPacient Toggle={toggleModal} />
            )}
          </div>
        </div>
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
    </>
  );
};

export default Month;
