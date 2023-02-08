import React, { useState } from "react";
import { collection, doc, updateDoc, deleteField } from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";
import { months } from "../../helpers/date";
import whatsappIcon from "../../assets/whatsapp.png";
import emailIcon from "../../assets/email.png";

const RecurringPacient = ({ Toggle }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const currentPacient = useSelector((state) => state.pacients.currentPacient);

  const currentPlace = useSelector((state) => state.appointments.place);
  console.log(currentPacient);
  const year = useSelector((state) => state.appointments.year);
  const month = useSelector((state) => state.appointments.month);
  const day = useSelector((state) => state.appointments.day);
  const time = useSelector((state) => state.appointments.time);
  const [alert, setAlert] = useState({});

  const appointmentRef = doc(
    firestore,
    `${currentPlace}/turnos/${months[month].toLowerCase()}${year}/${day}`
  );

  const pacientRef = doc(firestore, `pacientes/${currentPacient.id}`);
  console.log(appointmentRef);

  const deleteAppointment = async () => {
    await updateDoc(appointmentRef, {
      [time]: deleteField(),
    });

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

    const newAppointments = appointments.filter(
      (el) => el !== `${time}${dayString}${monthString}${year}`
    );

    await updateDoc(pacientRef, {
      appointments: newAppointments,
    });

    Toggle("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if ([nombre, apellido, telefono, email].includes("")) {
    //   setAlert({
    //     msg: "Todos los campos son obligatorios",
    //     error: true,
    //   });
    //   console.log("Faltan datos");
    //   return;
    // }

    const turnosRef = collection(firestore, "pacientes");

    const newPaciente = {
      nombre,
      apellido,
      telefono,
      email,
    };

    // await addDoc(turnosRef, newPaciente);
    await updateDoc(appointmentRef, {
      1700: {
        hour: "1700",
        pacientId: "vUPumtHxSPZsDKHNzXtv",
      },
      // 1730: deleteField(), borra ese campo
      1730: {
        hour: "1700",
        pacientId: "vUPumtHxSPZsDKHNzXtv",
      },
      day: "5",
    });

    // Guardamos el paciente y su primer turno
    setAlert({
      msg: "Guardado correctamente",
    });
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
  };

  // ---------------------------------------------------

  const { msg } = alert;

  return (
    <div className="bg-brighter-yellow text-header-green text-sm rounded-md max-h-max px-5 py-3 lg:mb-0">
      <h2 className="text-gray-700 uppercase font-bold text-2xl text-center">
        Información del paciente
      </h2>
      <div
        className="px-5 py-3 lg:mb-0"
        // onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap justify-around items-center mb-10">
          <h3 className="w-full text-lg text-center font-semibold text-black p-2 my-2 placeholder-zinc-400 rounded-md">
            {currentPacient.apellido}, {currentPacient.nombre}
          </h3>
          <a href={"https://wa.me/" + currentPacient.telefono} target="_blank"
          className=""
          >
            <img src={whatsappIcon} alt="" className="w-8" />
          </a>
          <a href={"mailto:" + currentPacient.email} target="_blank">
            <img src={emailIcon} className="w-8" />
          </a>
        </div>
        <button
          className="border-2 border-red-500 w-full py-2 rounded-md text-lg bg-red-600 text-white font-semibold uppercase"
          onClick={() => deleteAppointment()}
        >
          Eliminar turno
        </button>
      </div>

      {/* {msg && <p>Faltan datos</p>} */}
    </div>
  );
};

export default RecurringPacient;
