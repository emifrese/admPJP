import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";
import { days } from "../../helpers/date";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";
import Modal from "../UI/Modal";

const MobileConfig = () => {
  const [modal, setModal] = useState(["", "", false]);
  const [day, setDay] = useState(1);

  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );

  const place = useSelector((state) => state.appointments.place);

  const time = useSelector((state) => state.appointments.time);

  const defDayAppointments = defAppointments.find(
    (el) => el.day === day.toString()
  );

  const toggleHour = (available, hour) => {
    setModal((state) => [available, hour, !state[2]]);
  };

  const toggleModal = () => {
    setModal((state) => ["", "", !state[2]]);
  };
  const defDayRef = doc(firestore, `${place}/turnos/predeterminados/${day}`);

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

  const addHour = async () => {
    await setDoc(defDayRef, {});
  };

  let defDayDisplay = [];


  if (defDayAppointments !== undefined) {
    defDayDisplay = Object.entries(defDayAppointments)
      .filter((el) => el[0] !== "id" && el[0] !== "day")
      .map((el) => {
        console.log(el)
        return (
          <div
            className={
              "flex flex-col text-center rounded-md uppercase text-white font-semibold bg-header-green p-2"
            }
            onClick={() => toggleHour(el[1].available, el[1].hour)}
            key={Math.random().toString(29).slice(2)}
          >
            {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
            <span>{el[1].available ? "Habilitado" : "Deshabilitado"}</span>
          </div>
        );
      });
  }

  console.log(defAppointments)
  console.log(defDayAppointments);

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
      <div className="grid grid-cols-2 gap-2 w-full px-4 my-8">
        {defDayDisplay.length > 0 ? (
          defDayDisplay
        ) : (
          <p className="col-span-2 text-center font-semibold bg-brighter-yellow text-header-green rounded-md text-xl mx-auto px-4 py-2">
            No hay horarios en <span className="font-bold">{place}</span>
          </p>
        )}
      </div>
      {/* Add date button */}
      {/* <div
        className={"flex justify-between w-full mx-4 rounded-md bg-green-300"}
      >
        <button
          className="bg-brighter-yellow uppercase font-bold w-full flex justify-center py-2"
          onClick={toggleModal}
        >
          Agregar un horario más
        </button>
      </div> */}
      {/* Add date option  */}
      {/* {modal[2] && modal[0] === "" && (
        <Modal Toggle={toggleModal}>
          <form className="bg-white p-6 rounded-md">
            <select name="hour" id="hour">
              <option value="">Hour1</option>
              <option value="">hour2</option>
            </select>
          </form>
        </Modal>
      )} */}
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

export default MobileConfig;
