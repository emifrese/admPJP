import { setDoc, doc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { firestore } from "../../firebase";
import { months } from "../../helpers/date";
import NewPacient from "../../pages/NewPacient";
import { pacientsActions } from "../../store/states/pacients";

const NewAppointment = ({ moveToggle }) => {
  const [nombre, setNombre] = useState("");
  const dispatch = useDispatch();
  const pacients = useSelector((state) => state.pacients.pacients);
  const currentPacient = useSelector((state) => state.pacients.currentPacient);
  const currentPlace = useSelector((state) => state.appointments.place);
  const day = useSelector((state) => state.appointments.day);
  console.log(currentPacient);
  const month = useSelector((state) => state.appointments.month);
  const year = useSelector((state => state.appointments.year))
  const time = useSelector((state) => state.appointments.time);

  const appointmentRef = doc(firestore, `${currentPlace}/turnos/${months[month].toLowerCase()}${year}/${day}`);
  console.log(appointmentRef)

  console.log(time);
  const filterLastName =
    pacients.length > 0
      ? pacients.filter((el) => {
          if (nombre.trim() === "") {
            return null;
          } else {
            return el.apellido.toLowerCase().includes(nombre.trim());
          }
        })
      : [];

  const saveAppointment = async () => {
    await setDoc(appointmentRef, {
      [time]: {
        hour: time,
        pacientId: currentPacient.id
      },
      day: day.toString()
    })
  }

  return (
    <>
      <button onClick={() => moveToggle("home")}>Back</button>
      <h2 className="font-black text-xl text-center">Nuevo Turno</h2>

      {Object.keys(currentPacient).length < 1 && (
        <>
          <p className="text-md text-center">
            Busca a tu paciente por {""}
            <span className="text-[#227777] font-bold">APELLIDO</span>
          </p>
          <div className="bg-white text-sm rounded-md max-h-max px-5 py-3 mb-10 lg:mb-0">
            <div className="relative">
              <label
                htmlFor="nombre"
                className="text-zinc-700 uppercase font-bold"
              >
                Paciente
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre del paciente"
                className="border-2 w-full p-2 mt-2 placeholder-zinc-400 rounded-md"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
              />
              {filterLastName.length > 0 && nombre.length > 0 && (
                <div className="border-2 border-[#e5e7eb] bg-white rounded-b-md border-t-0 w-full">
                  {filterLastName.map((e) => (
                    <button
                      className="block w-full text-start py-2 cursor-pointer hover:bg-zinc-300"
                      onClick={() => {
                        // setCurrentPacient(e);
                        dispatch(pacientsActions.setCurrentPacient(e));
                        setNombre("");
                      }}
                      key={Math.random().toString(32).slice(2)}
                    >
                      {e.apellido}, {e.nombre}
                    </button>
                  ))}
                </div>
              )}
              {filterLastName.length === 0 && nombre.length > 0 && (
                // <button
                //   // to="/newPacient"
                //   onClick={() => {
                //     toggleModal("new");
                //     setNombre("");
                //   }}
                //   className="block border-2 border-[#e5e7eb] bg-white rounded-b-md border-t-0 w-full py-2 cursor-pointer hover:bg-zinc-300"
                // >
                //   Agregar nuevo paciente
                // </button>
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
          <h2>
            Desea agendar un turno para el {day} de {months[month]} a las{" "}
            {time.substring(0, 2)}:{time.substring(2)}?
          </h2>
          <div className="bg-white text-sm rounded-md shadow-[0px_3px_5px_2px_rgba(67,56,202,0.3)] max-h-max px-5 py-3 lg:mb-0">
            <p>Nombre: {currentPacient.nombre}</p>
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
            </p>
            {/* {currentPacient.turnos ? (
              <p>Paciente Control</p>
            ) : (
              <p>Paciente Nuevo</p>
            )} */}
          </div>
          <button className="border-2  border-red-500 px-2 rounded-2xl" onClick={() => saveAppointment()}>
            Agendar
          </button>
        </>
      )}
    </>
  );
};

export default NewAppointment;
