import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { firestore } from "../../firebase";
import { days } from "../../helpers/date";

const NewHour = ({ day, place, defAppointments }) => {
  const defDayRef = doc(firestore, `${place}/turnos/predeterminados/${day}`);

  const date = new Date("June 16, 1993 07:00:00");

  const addHour = async () => {
    await setDoc(defDayRef, {});
  };

  console.log(defAppointments);

  let defDayDisplay = [];

  if (defAppointments !== undefined) {
    defDayDisplay = Object.entries(defAppointments)
      .filter((el) => el[0] !== "id" && el[0] !== "day")
      .map((el) => (
        <div>
          {el[1].hour} {el[1].available ? "Habilitado" : "Deshabilitado"}
        </div>
      ));
    if (defDayDisplay.length === 0) {
      defDayDisplay.push(<div>Este dia no hay turnos para atender</div>);
    }
  }

  const hoursAvailable = [];
  let test = [];
  for (let i = 0; new Date(date.getTime() + i * 1800000).getHours() < 20; i++) {
    console.log("here");
    const now = new Date(date.getTime() + i * 1800000);
    hoursAvailable.push(
      <p>
        {now.getHours()}:{now.getMinutes()}
      </p>
    );
    test.push(
      Object.entries(defAppointments)
        .filter((el) => el[0] !== "id" && el[0] !== "day")
        .filter((el) => {
          console.log(
            el[0],
            now.getHours().toString() + now.getMinutes().toString()
          );
          return (
            el[0] === now.getHours().toString() + now.getMinutes().toString()
          );
        })
    );
  }

  console.log(test);

  return (
    <div className="bg-white">
      <h2>{days[day]}</h2>
      <div>{defDayDisplay}</div>

      <form>
        <h2>Horarios disponibles para agregar:</h2>
      </form>

      <div>
        <button>Si</button>
        <button>No</button>
      </div>
    </div>
  );
};

export default NewHour;
