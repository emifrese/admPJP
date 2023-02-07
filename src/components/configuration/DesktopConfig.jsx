import React, { useState } from "react";
import { useSelector } from "react-redux";
import { days } from "../../helpers/date";
import NewHour from "../forms/NewHour";
import Modal from "../UI/Modal";
import calendar from "../../assets/edit_calendar_FILL0_wght400_GRAD0_opsz48.svg"

const DesktopConfig = () => {
  const [modal, setModal] = useState([false, null]);

  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );

  const place = useSelector((state) => state.appointments.place);

  const toggleAddHour = (day) => {
    setModal((state) => [!state[0], day]);
  };

  const toggleModal = () => {
    setModal((state) => [!state[0], null]);
  };

  let defDayDisplay = [];

  if (defAppointments !== undefined) {
    for (let i = 0; i < defAppointments.length; i++) {
      defDayDisplay.push(
        Object.entries(defAppointments[i])
          .filter((el) => el[0] !== "id" && el[0] !== "day" && el[1].available)
          .map((el) => {
            return (
              <p
                className={
                  "flex flex-col text-center rounded-md uppercase text-white font-semibold bg-header-green p-2"
                }
                data-day={defAppointments[i].day}
                key={Math.random().toString(36).slice(2)}
              >
                {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
              </p>
            );
          })
      );
    }
  }

  while (
    defDayDisplay.indexOf(defDayDisplay.find((el) => el.length < 1)) !== -1
  ) {
    const indexEmpty = defDayDisplay.indexOf(
      defDayDisplay.find((el) => el.length < 1)
    );
    defDayDisplay[indexEmpty] = [
      <p
        className={
          "col-span-2 items-center text-center rounded-md uppercase text-white font-semibold bg-violet-700 p-2 h-full"
        }
        data-day={indexEmpty + 1}
        key={Math.random().toString(36).slice(2)}
      >
        Sin turnos
      </p>,
    ];
  }

  return (
    <>
      <div className="grid grid-cols-3 justify-center gap-4 w-full">
        {defDayDisplay.map((el) => (
          <div
            className="flex flex-col text-center gap-2 bg-white bg-opacity-50 rounded-lg px-4 justify-between"
            key={Math.random().toString(36).slice(2)}
          >
            <h2 className="text-2xl">{days[parseInt(el[0].props["data-day"])]}</h2>
            <div className="grid grid-cols-2 gap-2 text-center">{el}</div>
            <button
              className="flex justify-center p-2 rounded-md border-2 bg-brighter-yellow"
              onClick={() => toggleAddHour(parseInt(el[0].props["data-day"]))}
            >
              <img src={calendar} alt="manage-calendar" className="w-6"/>
            </button>
          </div>
        ))}
      </div>
      {modal[0] && (
        <Modal Toggle={toggleModal}>
          <NewHour
            day={modal[1]}
            place={place}
            defAppointments={defAppointments[modal[1] - 1]}
          />
        </Modal>
      )}
    </>
  );
};

export default DesktopConfig;
