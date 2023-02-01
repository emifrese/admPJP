import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";
import { days } from "../../helpers/date";
import Modal from "../UI/Modal";

const DesktopConfig = () => {
  const [modal, setModal] = useState(["", "", false, null]);

  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );

  const place = useSelector((state) => state.appointments.place);

  const toggleHour = (available, hour, day) => {
    setModal((state) => [available, hour, !state[2], day]);
  };

  const toggleModal = () => {
    setModal((state) => ["", "", !state[2]]);
  };

  const defDayRef = doc(
    firestore,
    `${place}/turnos/predeterminados/${modal[3]}`
  );

  const toggleAvailable = async () => {
    await setDoc(
      defDayRef,
      {
        [modal[1]]: {
          available: !modal[0],
        },
      },
      { merge: true }
    );

    toggleModal();
  };

  let defDayDisplay = [];
  let archiveDayDisplay = [];

  if (defAppointments !== undefined) {
    for (let i = 0; i < defAppointments.length; i++) {
      defDayDisplay.push(
        Object.entries(defAppointments[i])
          .filter((el) => el[0] !== "id" && el[0] !== "day" && el[1].available)
          .map((el) => {
            console.log(defAppointments[i]);
            return (
              <div
                className={
                  "flex flex-col text-center rounded-md uppercase text-white font-semibold bg-header-green p-2"
                }
                data-day={defAppointments[i].day}
                onClick={() =>
                  toggleHour(
                    el[1].available,
                    el[1].hour,
                    defAppointments[i].day
                  )
                }
                key={Math.random().toString(32).slice(2)}
              >
                {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
                <span>{el[1].available ? "Habilitado" : "Deshabilitado"}</span>
              </div>
            );
          })
      );
      archiveDayDisplay.push(
        Object.entries(defAppointments[i])
          .filter((el) => el[0] !== "id" && el[0] !== "day" && !el[1].available)
          .map((el) => {
            console.log(defAppointments[i]);
            return (
              <div
                className={
                  "flex flex-col text-center rounded-md uppercase text-white font-semibold bg-violet-700 p-2"
                }
                data-day={defAppointments[i].day}
                onClick={() =>
                  toggleHour(
                    el[1].available,
                    el[1].hour,
                    defAppointments[i].day
                  )
                }
                key={Math.random().toString(32).slice(2)}
              >
                {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
                <span>{el[1].available ? "Habilitado" : "Deshabilitado"}</span>
              </div>
            );
          })
      )
    }
  }

  console.log(defDayDisplay);

  return (
    <>
      <div className="flex gap-4">
        {defDayDisplay.map((el) => (
          <div className="flex flex-col text-center">
            <h2>{days[parseInt(el[0].props["data-day"])]}</h2>
            {el}
          </div>
        ))}
        {archiveDayDisplay}
      </div>
      {modal[2] && modal[0] !== "" && (
        <Modal Toggle={toggleModal}>
          <div className="bg-white p-6 flex flex-wrap justify-center items-center gap-4">
            <span className="w-full">
              Habilitar/Deshabilitar {modal[1]} {modal[0]}
            </span>
            <button
              className="bg-green-500 px-4 py-2 rounded-md"
              onClick={() => toggleAvailable()}
            >
              Si
            </button>
            <button className="bg-red-500 px-4 py-2 rounded-md">No</button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DesktopConfig;
