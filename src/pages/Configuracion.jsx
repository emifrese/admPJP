import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../firebase";
import { days } from "../helpers/date";


const Configuracion = () => {
  const defAppointments = useSelector(
    (state) => state.appointments.defAppointments
  );

  const place = useSelector((state) => state.appointments.place);

  const time = useSelector((state) => state.appointments.time);

  console.log(time);
  const [day, setDay] = useState(1);
  const [refresh, setRefresh] = useState(true);
  console.log(defAppointments);

  const defDayAppointments = defAppointments.find(
    (el) => el.day === day.toString()
  );

  console.log(defDayAppointments);

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
              "flex justify-between w-full border-2 border-zinc-300 rounded-md bg-green-300"
            }
          >
            <label
              data-day={day}
              data-time={el[1].hour}
              key={Math.random().toString(32).slice(2)}
              htmlFor={day.toString() + el[1].hour}
              className="border-2 border-red-300 w-full flex justify-between py-2 px-4"
              onClick={() => console.log("click")}
            >
              {el[1].hour.substring(0, 2)}:{el[1].hour.substring(2)}
              <input
                name={day.toString() + el[1].hour}
                id={day.toString() + el[1].hour}
                type="checkbox"
                checked={el[1].available}
                onChange={(e) => {
                  toggleAvailable(el[1].available, el[1].hour);
                }}
              />
            </label>
          </div>
        );
      });
  }

  return (
    <>
      <div className="w-full flex justify-center gap-2">
        {day > 1 && (
          <button
            onClick={() => setDay((state) => (state > 1 ? state - 1 : state))}
          >
            Prev
          </button>
        )}
        <h2>{days[day]}</h2>
        {day < 5 && (
          <button
            onClick={() => setDay((state) => (state < 5 ? state + 1 : state))}
          >
            Next
          </button>
        )}
      </div>
      <div className="flex flex-wrap w-full">{defDayDisplay}</div>
      <button
        className="text-4xl p-2 rounded-2xl bg-red-500 fixed bottom-16 right-8"
      >+</button>
    </>
  );
};

export default Configuracion;
