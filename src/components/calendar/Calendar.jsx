import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { days, getDays, months } from "../../helpers/date";
import { appointmentsActions } from "../../store/states/appointments";
import { pacientsActions } from "../../store/states/pacients";
import NewAppointment from "../forms/NewAppointment";
import NewOrRecurring from "../forms/NewOrRecurring";
import NewPacientForm from "../forms/NewPacientForm";
import RecurringPacient from "../forms/RecurringPacients";
import Modal from "../UI/Modal";

const Calendar = () => {
  const month = useSelector((state) => state.appointments.month);
  const year = useSelector((state) => state.appointments.year);
  const daySelected = useSelector((state) => state.appointments.day);
  const turnos = useSelector((state) => state.appointments.appointments);
  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );
  console.log(turnos)
  // console.log(defAppointments);
  const pacients = useSelector((state) => state.pacients.pacients);

  const [modal, setModal] = useState(["", false]);
  const today = new Date();
  const dispatch = useDispatch();
  const totalDays = getDays(year, month);

  const dayOne = new Date(year, month, 1);
  const initialDay = dayOne.getDay();
  const dayEnd = new Date(year, month, totalDays);
  const finalDay = dayEnd.getDay();

  console.log(daySelected);

  let squareDays = [];
  const diffFinalDay = 6 - finalDay;

  const toggleModal = (type) => {
    setModal((state) => [type, !state[1]]);
  };

  if (initialDay > 0) {
    for (let i = 0; i < initialDay; i++) {
      const day = new Date(year, month - 1, getDays(year, month - 1) - i);
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
          // console.log(el)
          return (
            <p
              className={
                "border-2 border-zinc-300 rounded-md py-2 px-4 bg-green-300"
              }
              onClick={(e) => {
                dispatch(
                  appointmentsActions.setDay(
                    parseInt(e.target.getAttribute("data-day"))
                  )
                );
                dispatch(
                  appointmentsActions.setTime(
                    e.target.getAttribute["data-time"]
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
      // console.log(scheduleAppointments)
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
              "border-2 border-zinc-300 rounded-md py-2 px-4 bg-red-300",
            onClick: (e) => {
              // console.log(e.target.getAttribute("id"));
              const id = e.target.getAttribute("id");
              const currentPacient = pacients.filter(
                (pacient) => pacient.id === id
              );
              dispatch(pacientsActions.setCurrentPacient(currentPacient));
              dispatch(appointmentsActions.setDay(newTemp.props["data-day"]));
              dispatch(appointmentsActions.setTime(newTemp.props["data-time"]));
              toggleModal("recurring");
              // const diaConsultado = turnos.filter((turn) => {
              //   console.log(turn.id);
              //   return turn.id === e.target.getAttribute("data-day");
              // });
              // const turnoConsultado = Object.entries(diaConsultado)[0][1];
              // console.log(diaConsultado);
              // console.log(turnoConsultado);
            },
            id: el[1].pacientId,
          },
        };
        // console.log(newTemp.props)
        appointmentsDisplay[index] = newTemp;
      }
    }
    squareDays.push(
      <div
        key={Math.random().toString(32).slice(2)}
        className={`bg-white border-2 border-zinc-300 hover:animate-day-animation ${
          day.getDate() === today.getDate() &&
          day.getMonth() === today.getMonth() &&
          " bg-red-500"
        }`}
      >
        {day.toDateString()}
        {days[day.getDay()]}
        {appointmentsDisplay !== null && appointmentsDisplay}
      </div>
    );
  }

  if (diffFinalDay !== 0) {
    for (let i = 0; i < diffFinalDay; i++) {
      const day = new Date(year, month + 1, i + 1);
      squareDays.push(
        <div
          key={Math.random().toString(32).slice(2)}
          className="bg-zinc-200 border-2 border-zinc-300"
        >
          {day.toDateString()}
          {days[day.getDay()]}
        </div>
      );
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <h2 className="w-full text-center">{months[month]}</h2>
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
      </div>
      {modal[1] && modal[0] === "new" && (
        <Modal Toggle={toggleModal}>
          <NewOrRecurring Toggle={toggleModal} />
        </Modal>
      )}
      {modal[1] && modal[0] === "recurring" && (
        <Modal Toggle={toggleModal}>
          <RecurringPacient Toggle={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default Calendar;
