import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { days, getDays } from "../../helpers/date";
import { appointmentsActions } from "../../store/states/appointments";
import { pacientsActions } from "../../store/states/pacients";
import NewOrRecurring from "../forms/NewOrRecurring";
import RecurringPacient from "../forms/RecurringPacients";
import Modal from "../UI/Modal";

const Day = ({ toggleModal, modal }) => {
  const day = useSelector((state) => state.appointments.day);
  const month = useSelector((state) => state.appointments.month);
  const year = useSelector((state) => state.appointments.year);
  const turnos = useSelector((state) => state.appointments.appointments);
  console.log(turnos)
  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );
  const pacients = useSelector((state) => state.pacients.pacients);

  const dispatch = useDispatch();
  const totalDays = getDays(year, month);

  const weekDay = new Date(year, month, day);
  const defDayAppointments = defAppointments.find(
    (el) => el.day === weekDay.getDay().toString()
  );

  const dayAppointments = turnos.find((el) => el.day === day.toString());

  console.log(day)

  let appointmentsDisplay;
  let scheduleAppointments;
  if (defDayAppointments) {
    appointmentsDisplay = Object.entries(defDayAppointments)
      .filter((el) => el[0] !== "id" && el[0] !== "day")
      .map((el) => {
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
                appointmentsActions.setTime(e.target.getAttribute("data-time"))
              );
              toggleModal("new");
            }}
            data-day={day}
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
      console.log(el)
      const temp = {
        ...appointmentsDisplay.filter((app) => app.props.children === el[0]),
      };
      console.log(temp)
      const index = appointmentsDisplay.indexOf(temp[0]);
      const newTemp = Object.keys(temp).length > 0 && {
        ...temp[0],
        props: {
          ...temp[0].props,
          className: "border-2 border-zinc-300 rounded-md py-2 px-4 bg-red-300",
          onClick: (e) => {
            // console.log(e.target.getAttribute("id"));
            const id = e.target.getAttribute("id");
            const currentPacient = pacients.filter(
              (pacient) => pacient.id === id
            );
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

  // console.log(appointmentsDisplay);

  const squareDay = (
    <div
      key={Math.random().toString(32).slice(2)}
      className={
        "bg-white border-2 border-zinc-300 hover:animate-day-animation"
      }
    >
      {weekDay.toDateString()}
      {days[weekDay.getDay()]}
      {appointmentsDisplay !== null && appointmentsDisplay !== undefined
        ? appointmentsDisplay
        : "No hay disponible"}
    </div>
  );

  return (
    <>
      <button
        onClick={() => {
          if (day === 1) {
            let finalDay;
            if (month === 0) {
              finalDay = getDays(year - 1, 11);
            } else {
              finalDay = getDays(year, month - 1);
            }
            dispatch(appointmentsActions.moveMonth("reduction"));
            dispatch(appointmentsActions.setDay(finalDay));
          } else {
            dispatch(appointmentsActions.setDay(day - 1));
          }
        }}
      >
        Prev
      </button>
      <div>{squareDay}</div>
      <button
        onClick={() => {
          if (day === totalDays) {
            dispatch(appointmentsActions.moveMonth("increment"));
            dispatch(appointmentsActions.setDay(1));
          } else {
            dispatch(appointmentsActions.setDay(day + 1));
          }
        }}
      >
        Next
      </button>
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

export default Day;
