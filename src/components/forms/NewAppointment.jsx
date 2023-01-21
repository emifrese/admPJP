import { setDoc, doc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { firestore } from "../../firebase";
import { months } from "../../helpers/date";
import { pacientsActions } from "../../store/states/pacients";
import arrowBack from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg"

const NewAppointment = ({ moveToggle }) => {
  const [apellido, setApellido] = useState("");
  const dispatch = useDispatch();
  const pacients = useSelector((state) => state.pacients.pacients);
  const currentPacient = useSelector((state) => state.pacients.currentPacient);
  const currentPlace = useSelector((state) => state.appointments.place);
  const turnos = useSelector((state) => state.appointments.appointments);
  const day = useSelector((state) => state.appointments.day);
  // console.log(currentPacient);
  const month = useSelector((state) => state.appointments.month);
  const year = useSelector((state) => state.appointments.year);
  const time = useSelector((state) => state.appointments.time);

  const appointmentRef = doc(
    firestore,
    `${currentPlace}/turnos/${months[month].toLowerCase()}${year}/${day}`
  );

  const pacientRef = doc(firestore, `pacientes/${currentPacient.id}`);

  const todayAppointmentsArray = turnos.find((el) => el.day === day.toString());

  let index;

  if (todayAppointmentsArray !== undefined) {
    const todayAppointmentsInfo = Object.entries(todayAppointmentsArray).filter(
      (el) => el[0] !== "day" && el[0] !== "id"
    );
    if (Object.entries(currentPacient).length > 0) {
      index = todayAppointmentsInfo.filter(
        (el) => el[1].pacientId === currentPacient.id
      );
    }
  }

  const filterLastName =
    pacients.length > 0
      ? pacients.filter((el) => {  
        if (apellido.trim() === "") {
            return null;
          } else {
            return el.apellido.toLowerCase().includes(apellido.toLowerCase().trim());
          }
        })
        // .slice(0, 3)
      : [];

  const saveAppointment = async () => {
    if (index !== undefined && index.length > 0) {
      alert("Ya tienes un turno para este dia");
      return;
    }

    await setDoc(
      appointmentRef,
      {
        [time]: {
          hour: time,
          pacientId: currentPacient.id,
        },
        day: day.toString(),
      },
      { merge: true }
    );

    const appointments =
      Object.entries(currentPacient).filter((el) => el[0] === "appointments")
        .length > 0
        ? [
            ...Object.entries(currentPacient).filter(
              (el) => el[0] === "appointments"
            )[0][1],
          ]
        : [];

    const dayString = day.toString().length === 1 ? `0${day}` : day;
    const monthString = month.toString().length === 1 ? `0${month}` : month;

    appointments.push(`${time}${dayString}${monthString}${year}`);

    await setDoc(
      pacientRef,
      {
        appointments,
      },
      { merge: true }
    );

    dispatch(pacientsActions.setCurrentPacient([]));
  };

  console.log(filterLastName)

  return (
    <>
      <div className="flex justify-start w-full items-center">
        <button className="absolute" onClick={() => moveToggle("home")}><img src={arrowBack} className="w-6" /></button>
        <h2 className="w-full font-black text-xl text-center">Nuevo Turno</h2>
      </div>

      {Object.keys(currentPacient).length < 1 && (
        <>
          <p className="text-md text-center">
            Busca a tu paciente por {""}
            <span className="text-header-green font-bold">APELLIDO</span>
          </p>
          <div className="text-sm rounded-md max-h-max px-5 py-3 mb-10 lg:mb-0">
            <div className="relative">
              <label
                htmlFor="apellido"
                className="text-header-green uppercase font-bold"
              >
                Paciente
              </label>
              <input
                id="apellido"
                type="text"
                placeholder="Nombre del paciente"
                className="border-2 w-full p-2 mt-2 placeholder-zinc-400 rounded-md"
                onChange={(e) => setApellido(e.target.value)}
                value={apellido}
              />
              {filterLastName.length > 0 && apellido.length > 0 && (
                <div className="border-2 border-[#e5e7eb] bg-white rounded-b-md border-t-0 w-full max-h-28 overflow-auto">
                  {filterLastName.map((e) => (
                    <button
                      className="block w-full text-start py-2 cursor-pointer hover:bg-zinc-300"
                      onClick={() => {
                        // setCurrentPacient(e);
                        dispatch(pacientsActions.setCurrentPacient(e));
                        setApellido("");
                      }}
                      key={Math.random().toString(32).slice(2)}
                    >
                      {e.apellido}, {e.nombre}
                    </button>
                  ))}
                </div>
              )}
              {filterLastName.length === 0 && apellido.length > 0 && (
                <p className="block border-2 border-[#e5e7eb] bg-white rounded-b-md border-t-0 w-full py-2 cursor-pointer hover:bg-zinc-300">
                  No existe paciente
                </p>
              )}
            </div>
          </div>
        </>
      )}
      {Object.keys(currentPacient).length > 0 && (
        <>
          <h2 className="font-semibold">
            Desea agendar un turno para el {day} de {months[month]} a las{" "}
            {time.substring(0, 2)}:{time.substring(2)}?
          </h2>
          <div className="bg-header-green text-brighter-yellow text-start text-lg rounded-md shadow-[0px_3px_5px_2px_rgba(67,56,202,0.3)] max-h-max px-5 py-3">
            <p>Paciente: {currentPacient.apellido}, {currentPacient.nombre}</p>
            {/* <p>Nombre: {currentPacient.nombre}</p>
            <p>Apellido: {currentPacient.apellido}</p>
            <p>
              Email:{" "}
              <a href={"mailto:" + currentPacient.email}>
                {currentPacient.email}
              </a>
            </p>
            <p>
              Telefono:{" "}
              <a href={"https://wa.me/" + currentPacient.telefono}>
                {currentPacient.telefono}
              </a>
            </p> */}
          </div>
          <button
            className="bg-header-green px-4 py-2 text-white uppercase rounded-md"
            onClick={() => saveAppointment()}
            // disabled={index !== undefined && index.length > 0}
          >
            Agendar
          </button>
          <button
            className="bg-red-500 px-4 py-2 text-white rounded-md"
            onClick={() => dispatch(pacientsActions.setCurrentPacient({}))}
          >
            Reset
          </button>
        </>
      )}
    </>
  );
};

export default NewAppointment;
