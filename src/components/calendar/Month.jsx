import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { days, getDays, months } from "../../helpers/date";
import { appointmentsActions } from "../../store/states/appointments";
import { pacientsActions } from "../../store/states/pacients";
import NewOrRecurring from "../forms/NewOrRecurring";
import RecurringPacient from "../forms/RecurringPacients";
import MonthDayWrapper from "./MonthDayWrapper";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";

const Month = ({ toggleModal, modal }) => {
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

  const appointmentsWeekDays = defAppointments
    .map((el) => parseInt(el.day))
    .sort();

  let squareDays = [];
  let lastDay = 0;
  let rowStart = 2;
  let colStart;


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
              className={`cursor-pointer m-1 w-14 text-center rounded-md bg-header-green text-white ${
                el[1].available ? "inline-block" : "hidden"
              }`}
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
        if(appointmentsDisplay.length < 1){
          appointmentsDisplay.push(<p>NO SE ATIENDE</p>)
        }
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
        let temp = {
          ...appointmentsDisplay.filter(
            (app) =>
              app.props.children ===
              `${el[1].hour.substring(0, 2)}:${el[1].hour.substring(2)}`
          ),
        };
        if (Object.keys(temp).length < 1) {
          temp = [
            {
              ...appointmentsDisplay[0],
              props: {
                ...appointmentsDisplay[0].props,
                children: `${el[1].hour.substring(0, 2)}:${el[1].hour.substring(
                  2
                )}`,
                ["data-time"]: el[1].hour,
              },
            },
          ];
        }
        const index = appointmentsDisplay.indexOf(temp[0]);
        const newTemp = Object.keys(temp).length > 0 && {
          ...temp[0],
          props: {
            ...temp[0].props,
            className: temp[0].props.className
              .replace("hidden", "inline-block")
              .replace("bg-header-green", "bg-red-500"),
            onClick: (e) => {
              const id = e.target.getAttribute("id");
              const pacient = pacients.filter((pacient) => pacient.id === id);
              dispatch(pacientsActions.setCurrentPacient(pacient[0]));
              dispatch(appointmentsActions.setDay(newTemp.props["data-day"]));
              dispatch(appointmentsActions.setTime(newTemp.props["data-time"]));
              toggleModal("recurring");
            },
            id: el[1].pacientId,
          },
        };
        if (index === -1) {
          if (
            parseInt(el[0]) <
            parseInt(appointmentsDisplay[0].props["data-time"])
          ) {
            appointmentsDisplay.unshift(newTemp);
          } else if (
            parseInt(el[0]) >
            parseInt(
              appointmentsDisplay[appointmentsDisplay.length - 1].props[
                "data-time"
              ]
            )
          ) {
            appointmentsDisplay.push(newTemp);
          } else {
            for (let i = 1; i < appointmentsDisplay.length - 1; i++) {
              if (
                parseInt(el[0]) >
                  parseInt(appointmentsDisplay[i - 1].props["data-time"]) &&
                parseInt(el[0]) <
                  parseInt(appointmentsDisplay[i].props["data-time"])
              ) {
                appointmentsDisplay.splice(i, 0, newTemp);
              }
            }
          }
        } else {
          appointmentsDisplay[index] = newTemp;
        }
      }
    }
    if (appointmentsDisplay !== undefined) {
      if (squareDays.length < 1) {
        colStart = defAppointments.indexOf(
          defAppointments.find((el) => el.day === day.getDay().toString())
        );
      }
      if(colStart === defAppointments.length){
        colStart = 1;
      } else {
        colStart += 1;
      }
      if (day.getDay() < lastDay) {
        rowStart += 1;
      }
      lastDay = day.getDay();
      squareDays.push(
        <MonthDayWrapper
          key={Math.random().toString(32).slice(2)}
          day={day}
          today={today}
          rowStart={rowStart}
          colStart={colStart}
        >
          <div className="flex flex-wrap h-full justify-center content-center">
            {appointmentsDisplay}
          </div>
        </MonthDayWrapper>
      );
    }
  }


  // for (let element of squareDays) {
  //   if (!calendarDisplay[element.props.day.getDay()]) {
  //     calendarDisplay[element.props.day.getDay()] = [element];
  //   } else {
  //     calendarDisplay[element.props.day.getDay()].push(element);
  //   }
  // }

  // const testDisplay = calendarDisplay.map((el) => {
  //   return (
  //     <div
  //     // className={"row-start-" + el[0].props.day.getDay()}
  //     >
  //       {el}
  //     </div>
  //   );
  // });


  for(let [i, day] of defAppointments.entries()){
    squareDays.push(
      <div
        className={`row-start-1 col-start-${i+1}`}
      >
        {days[i+1]}
      </div>
    )
  }

  return (
    <>
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
        <div
          className={`w-1/2 grid justify-between content-center gap-y-2 grid-cols-${defAppointments.length}`}
        >
          {squareDays}
        </div>
        <div className="relative w-1/2 flex flex-col justify-center items-center gap-10 px-12">
          <h3 className="absolute top-0 text-2xl font-semibold">
            Turnos del dia
          </h3>
          {modal[1] && modal[0] === "new" && <NewOrRecurring />}
          {modal[1] && modal[0] === "recurring" && <RecurringPacient />}
        </div>
      </div>
    </>
  );
};

export default Month;
