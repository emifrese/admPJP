import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";
import { days } from "../../helpers/date";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";
import Modal from "../UI/Modal";

const MobileConfig = () => {
  const [modal, setModal] = useState(false);
  const [day, setDay] = useState(1);
  const [refresh, setRefresh] = useState(true);

  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );

  const place = useSelector((state) => state.appointments.place);

  const time = useSelector((state) => state.appointments.time);

  console.log(time);
  console.log(defAppointments);

  const defDayAppointments = defAppointments.find(
    (el) => el.day === day.toString()
  );

  console.log(defDayAppointments);

  const toggleModal = () => {
    setModal(state => !state)
  };

  const toggleAvailable = async (checked, id) => {
    const defDayRef = doc(firestore, `${place}/turnos/predeterminados/${day}`);

    await setDoc(
      defDayRef,
      {
        [id]: {
          available: !checked,
        },
      },
      { merge: true }
    );
  };

  let defDayDisplay = [];

  if (defDayAppointments !== undefined) {
    defDayDisplay = Object.entries(defDayAppointments)
      .filter((el) => el[0] !== "id" && el[0] !== "day")
      .map((el) => {
        console.log(el);
        return (
          <div
            className={
              "flex flex-col text-center rounded-md  text-white font-semibold bg-header-green p-2"
            }
          >
            {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
            <label
              data-day={day}
              data-time={el[1].hour}
              key={Math.random().toString(32).slice(2)}
              htmlFor={day.toString() + el[1].hour}
              className="uppercase"
              onClick={() => console.log("click")}
            >
              {el[1].available ? "Habilitado" : "Deshabilitado"}
              <input
                name={day.toString() + el[1].hour}
                id={day.toString() + el[1].hour}
                type="checkbox"
                checked={el[1].available}
                onChange={() => {
                  toggleAvailable(el[1].available, el[1].hour);
                }}
                className="hidden"
              />
            </label>
          </div>
        );
      });
  }

  //   defDayDisplay.push(

  //   );

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
      <div className="grid grid-cols-2 w-full px-4 my-8 gap-2">
        {defDayDisplay}
      </div>
      <div
        className={"flex justify-between w-full mx-4 rounded-md bg-green-300"}
      >
        <button
          className="bg-brighter-yellow uppercase font-bold w-full flex justify-center py-2"
          onClick={toggleModal}
        >
          Agregar un horario más
        </button>
      </div>
      {modal && (
        <Modal Toggle={toggleModal}>
          <div className="bg-white">Desea deshabilitar?</div>
        </Modal>
      )}
    </>
  );
};

export default MobileConfig;
