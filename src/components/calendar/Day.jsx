import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compareHours, days, getDays, months } from "../../helpers/date";
import { appointmentsActions } from "../../store/states/appointments";
import { pacientsActions } from "../../store/states/pacients";
import NewOrRecurring from "../forms/NewOrRecurring";
import RecurringPacient from "../forms/RecurringPacients";
import Modal from "../UI/Modal";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg"

const Day = () => {
  const [modal, setModal] = useState(["", false]);
  const day = useSelector((state) => state.appointments.day);
  const month = useSelector((state) => state.appointments.month);
  const year = useSelector((state) => state.appointments.year);
  const turnos = useSelector((state) => state.appointments.appointments);
  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );
  const pacients = useSelector((state) => state.pacients.pacients);

  const places = useSelector(state => state.appointments.places)
 
  const dispatch = useDispatch();
  const totalDays = getDays(year, month);

  const weekDay = new Date(year, month, day);
  const defDayAppointments = defAppointments.find(
    (el) => el.day === weekDay.getDay().toString()
  );

  const dayAppointments = turnos.find((el) => el.day === day.toString());

  const toggleModal = (type) => {
    if (modal[0] === "recurring") {
      dispatch(pacientsActions.setCurrentPacient({}));
    }
    setModal((state) => [type, !state[1]]);
  };

  let appointmentsDisplay = [];
  let freeAppointments = [];
  let scheduleAppointments;
  if (defDayAppointments) {
    freeAppointments = Object.entries(defDayAppointments)
      .filter((el) => el[0] !== "id" && el[0] !== "day")
      .map((el) => (
        <p
          className={`font-bold text-white rounded-md py-2 px-4 bg-slightly-darker-blue ${
            el[1].available ? "inline-block" : "hidden"
          }`}
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
          key={Math.random().toString(33).slice(2)}
        >
          {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
        </p>
      )).sort((a, b) => compareHours(a, b));
  }
  if (dayAppointments) {
    scheduleAppointments = Object.entries(dayAppointments).filter(
      (el) => el[0] !== "id" && el[0] !== "day"
    );
  }
  if (
    scheduleAppointments &&
    freeAppointments &&
    Object.keys(freeAppointments).length > 0
  ) {
    for (let el of scheduleAppointments) {
      let temp = {
        ...freeAppointments.filter((app) => app.props["data-time"] === el[0]),
      };
      let index;

      if(Object.keys(temp).length < 1){
        temp = [{...freeAppointments[0], props: {
          ...freeAppointments[0].props,
          children: `${el[1].hour.substring(0, 2)}:${el[1].hour.substring(2)}`,
          ["data-time"]: el[1].hour
        }}]
        index = null;
      } else {
        index = freeAppointments.indexOf(temp[0]);
      }

      const currentPacient = pacients.filter(
        (pacient) => pacient.id === el[1].pacientId
      );
      let newChildren = [...temp[0].props.children];
      newChildren.push(
        ` ${currentPacient[0].nombre} ${currentPacient[0].apellido}`
      );
      const newTemp = Object.keys(temp).length > 0 && {
        ...temp[0],
        props: {
          ...temp[0].props,
          className: "uppercase font-bold",
          onClick: () => {
            dispatch(pacientsActions.setCurrentPacient(currentPacient[0]));
            dispatch(appointmentsActions.setDay(newTemp.props["data-day"]));
            dispatch(appointmentsActions.setTime(newTemp.props["data-time"]));
            toggleModal("recurring");
          },
          id: el[1].pacientId,
          children: newChildren,
        },
      };
      const appointment = (
        <div className="w-full flex justify-between items-center rounded-md py-2 px-4 gap-2  bg-brighter-yellow">
          {newTemp}
        </div>
      );
      if(index !== null){
        freeAppointments.splice(index, 1);
      }
      appointmentsDisplay.push(appointment)
      appointmentsDisplay.sort((a, b) => compareHours(a.props.children, b.props.children));
    }
  }
  

  

  let busySquare;

  if (defDayAppointments) {
    busySquare = (
      <div
        key={Math.random().toString(34).slice(2)}
        className={
          "flex place-content-start items-start flex-wrap justify-center w-64 text-center my-8 gap-2"
        }
      >
        {appointmentsDisplay.length > 0 ? (
          appointmentsDisplay
        ) : (
          <p className="bg-background-blue font-bold text-black uppercase rounded-md w-full text-xl py-2">
            No hay turnos agendados
          </p>
        )}
      </div>
    );
  }

  const freeSquare = (
    <div
      key={Math.random().toString(35).slice(2)}
      className={
        "w-64 text-center grid grid-cols-2 place-content-start gap-2 justify-center"
      }
    >
      {freeAppointments.length > 0 ? (
        <>
          <h2 className="w-full text-2xl col-span-2">Turnos disponibles</h2>
          {freeAppointments}
        </>
      ) : (
        <h2 className="col-span-2 bg-email mx-auto mt-6 px-4 py-2 text-xl uppercase font-bold rounded-md">No hay horarios disponibles</h2>
      )}
    </div>
  );

  return (
    <>
      <div className="w-full flex justify-around">
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
          <img className="w-8" src={arrowPrev}/>
        </button>
        <h2 className="text-2xl font-semibold">
          {days[weekDay.getDay()]} {day} de {months[month]}
        </h2>
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
          <img className="w-8" src={arrowNext}/>
        </button>
      </div>
      {busySquare}
      {freeSquare}
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
