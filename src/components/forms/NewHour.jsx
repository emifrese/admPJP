import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { firestore } from "../../firebase";
import { days } from "../../helpers/date";

const NewHour = ({ day, place, defAppointments }) => {
  const defDayRef = doc(firestore, `${place}/turnos/predeterminados/${day}`);

  console.log(defAppointments)

  const date = new Date("June 16, 1993 07:00:00");

  const toggleAvailable = async (hour, available) => {

    await setDoc(
      defDayRef,
      {
        [hour]: {
          available: !available,
          hour,
        },
      },
      { merge: true }
    );
  };

  

  const defArray = Object.entries(defAppointments)
    .filter((el) => el[0] !== "id" && el[0] !== "day" && el[1].available)
    .map((el) => el[0]);

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
    let available = false;
    let classHour = "px-4 py-2 border-2 rounded-md bg-gray-500 text-white";
    hoursAvailable.push(<p key={Math.random().toString(36).slice(2)}></p>);
    const now = new Date(date.getTime() + i * 1800000);
    let text;
    if (now.getHours() < 10) {
      text = `0${now.getHours()}${now.getMinutes()}`;
    } else {
      text = `${now.getHours()}${now.getMinutes()}`;
    }
    if (now.getMinutes() !== 30) {
      text += "0";
    }

    const findHour = defArray.indexOf(text);

    if (findHour !== -1) {
      classHour = classHour.replace("bg-gray-500", "bg-header-green");
      available = true
    }

    let temp = [
      {
        ...hoursAvailable[i],
        props: {
          ...hoursAvailable[i].props,
          children: `${text.substring(0, 2)}:${text.substring(2)}`,
          className: classHour,
          onClick: () => toggleAvailable(text, available),
        },
      },
    ];
    hoursAvailable[i] = temp;
    // hoursAvailable.push(<p className="px-4 py-2 border-2 rounded-md bg-gray-500 text-white">{text}</p>);
    test.push(
      Object.entries(defAppointments)
        .filter((el) => el[0] !== "id" && el[0] !== "day")
        .filter(
          (el) =>
            el[0] === now.getHours().toString() + now.getMinutes().toString()
        )
    );
  }

  return (
    <div className="bg-white px-20 py-6">
      <h2>{days[day]}</h2>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {hoursAvailable}
      </div>
    </div>
  );
};

export default NewHour;
