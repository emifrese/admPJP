import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { days, getDays, months } from "../../helpers/date";
import appointments, {
  appointmentsActions,
} from "../../store/states/appointments";
import { pacientsActions } from "../../store/states/pacients";
import NewOrRecurring from "../forms/NewOrRecurring";
import RecurringPacient from "../forms/RecurringPacients";
import MonthDayWrapper from "./MonthDayWrapper";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";
import Day from "./Day";
import { colClassToggle } from "../../helpers/calendar";

const Month = ({ toggleModal, modal }) => {
  const [loader, setLoader] = useState(false);
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

  const toggleLoader = () => {
    setLoader((state) => !state);

    setTimeout(() => {
      setLoader((state) => !state);
    }, 1000);
  };

  let squareDays = [];
  let lastDay = 0;
  let rowStart = 2;
  let colStart;

  if (!loader) {
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
          .filter((el) => el[0] !== "id" && el[0] !== "day" && el[1].available)
          .map((el) => {
            const hourText = `${el[1].hour.substring(
              0,
              2
            )}:${el[1].hour.substring(2)}`;
            return (
              <p
                className="cursor-pointer m-1 w-14 text-center rounded-md bg-slightly-darker-blue text-white inline-block"
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
                data-time={`${el[1].hour.substring(0, 2)}${el[1].hour.substring(
                  2
                )}`}
                key={
                  Math.random().toString(32).slice(2) + day.getMilliseconds()
                }
              >
                {hourText}
              </p>
            );
          });
        if (appointmentsDisplay.length < 1) {
          appointmentsDisplay.push(
            <p
              key={Math.random().toString(36).slice(2) + day.getMilliseconds()}
              className="cursor-pointer m-1 w-full text-center rounded-md bg-slightly-darker-blue text-white inline-block"
            >
              NO SE ATIENDE
            </p>
          );
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
          console.log(appointmentsDisplay);
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
                  children: `${el[1].hour.substring(
                    0,
                    2
                  )}:${el[1].hour.substring(2)}`,
                  ["data-time"]: `${el[1].hour.substring(
                    0,
                    2
                  )}${el[1].hour.substring(2)}`,
                  ["data-day"]: day.getDate(),
                },
              },
            ];
          }
          const index = appointmentsDisplay.indexOf(temp[0]);
          let newTemp = Object.keys(temp).length > 0 && {
            ...temp[0],
            props: {
              ...temp[0].props,
              className: temp[0].props.className
                .replace("bg-slightly-darker-blue", "bg-red-500")
                .replace("w-full", "w-14"),
              onClick: (e) => {
                const id = e.target.getAttribute("id");
                const pacient = pacients.filter((pacient) => pacient.id === id);
                dispatch(pacientsActions.setCurrentPacient(pacient[0]));
                dispatch(appointmentsActions.setDay(newTemp.props["data-day"]));
                dispatch(
                  appointmentsActions.setTime(newTemp.props["data-time"])
                );
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
            } else if (
              appointmentsDisplay[0].props.children === "NO SE ATIENDE"
            ) {
              appointmentsDisplay[0] = newTemp;
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
        if (colStart === defAppointments.length) {
          colStart = 1;
        } else {
          colStart += 1;
        }
        console.log(colStart);
        if (day.getDay() < lastDay) {
          rowStart += 1;
        }
        lastDay = day.getDay();
        squareDays.push(
          <MonthDayWrapper
            key={Math.random().toString(36).slice(2) + day.getMilliseconds()}
            day={day}
            today={today}
            rowStart={rowStart}
            colStart={colStart}
            toggleModal={toggleModal}
          >
            <div
              className="flex flex-wrap h-full justify-center content-center"
              key={Math.random().toString(36).slice(2) + day.getMilliseconds()}
            >
              {appointmentsDisplay}
            </div>
          </MonthDayWrapper>
        );
      }
    }

    for (let [i, day] of defAppointments.entries()) {
      let classCol = colClassToggle(i + 1);
      squareDays.push(
        <div
          className={`row-start-1 ${classCol}`}
          key={Math.random().toString(36).slice(2)}
        >
          {days[i]}
        </div>
      );
    }
  }

  return (
    <>
      <div className="w-full flex justify-between">
        <button
          onClick={() => {
            if (!loader) {
              toggleLoader();
              dispatch(appointmentsActions.moveMonth("reduction"));
            }
          }}
        >
          <img className="w-8" src={arrowPrev} />
        </button>
        <h2 className="text-4xl uppercase font-bold text-center">
          {months[month]}
        </h2>
        <button
          onClick={() => {
            if (!loader) {
              toggleLoader();
              dispatch(appointmentsActions.moveMonth("increment"));
            }
          }}
        >
          <img className="w-8" src={arrowNext} />
        </button>
      </div>
      <div className="flex w-full justify-between">
        <div
          className={`w-1/2 grid justify-between content-center gap-2 grid-cols-${defAppointments.length}`}
        >
          {loader ? <div>Loading</div> : squareDays}
        </div>
        <div className="relative w-1/2 flex flex-col justify-center items-center gap-10 px-12">
          <h3 className="absolute top-0 text-2xl font-semibold">
            Turnos del dia
          </h3>
          {/* {
            modal[1] && modal[0] === "day" && <Day/>
          } */}
          {modal[1] && modal[0] === "new" && <NewOrRecurring />}
          {modal[1] && modal[0] === "recurring" && (
            <RecurringPacient Toggle={toggleModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default Month;
