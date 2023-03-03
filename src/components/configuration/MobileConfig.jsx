import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";
import { compareHours, days } from "../../helpers/date";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";
import Modal from "../UI/Modal";
import NewHour from "../forms/NewHour";
import calendar from "../../assets/edit_calendar_FILL0_wght400_GRAD0_opsz48.svg";

const MobileConfig = () => {
  const [day, setDay] = useState(1);
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

  if (defAppointments.length > 0) {
    defDayDisplay = Object.entries(defAppointments[day - 1])
      .filter((el) => el[0] !== "id" && el[0] !== "day" && el[1].available)
      .map((el) => {
        return (
          <p
            className={
              "flex flex-col text-center rounded-md uppercase text-white font-semibold bg-header-green p-2"
            }
            data-day={defAppointments[day - 1].day}
            key={Math.random().toString(36).slice(2)}
          >
            {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
          </p>
        );
      })
      .sort((a, b) => compareHours(a, b));
  }

  while (defDayDisplay.length < 1) {
    defDayDisplay = [<p
        className={
          "col-span-2 items-center text-center rounded-md uppercase text-white font-semibold bg-violet-700 p-2 h-full"
        }
        data-day={day}
        key={Math.random().toString(36).slice(2)}
      >
        Sin turnos
      </p>]
  }
  console.log(defDayDisplay);

  return (
    <>
      <div className="w-full flex justify-center items-center gap-2">
        {day > 1 && (
          <button
            onClick={() => setDay((state) => (state > 1 ? state - 1 : state))}
            className="absolute left-2"
          >
            <img className="w-6" src={arrowPrev} />
          </button>
        )}
        <h2 className="text-2xl font-semibold">{days[day]}</h2>
        {day < 5 && (
          <button
            onClick={() => setDay((state) => (state < 5 ? state + 1 : state))}
            className="absolute right-2"
          >
            <img className="w-6" src={arrowNext} />
          </button>
        )}
      </div>
      <div className="flex justify-center gap-4 w-full px-10 mt-10">
        <div
          className="flex flex-col w-full text-center gap-2 bg-white bg-opacity-50 rounded-lg p-4 justify-between"
          key={Math.random().toString(36).slice(2)}
        >
          <div className="grid grid-cols-2 gap-2 text-center">
            {defDayDisplay}
          </div>
          <button
            className="flex justify-center p-2 rounded-md border-2 bg-brighter-yellow"
            onClick={() =>
              toggleAddHour(parseInt(defDayDisplay[0].props["data-day"]))
            }
          >
            <img src={calendar} alt="manage-calendar" className="w-6" />
          </button>
        </div>
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

export default MobileConfig;
