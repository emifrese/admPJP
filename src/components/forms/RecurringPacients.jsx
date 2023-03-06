import React, { useState } from "react";
import { collection, doc, updateDoc, deleteField } from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";
import { days, months } from "../../helpers/date";
import whatsappIcon from "../../assets/whatsapp.svg";
import emailIcon from "../../assets/mail_FILL0_wght400_GRAD0_opsz48.svg";
import deleteIcon from "../../assets/delete_FILL0_wght400_GRAD0_opsz48.svg";

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
  const weekDay = new Date(year, month, day);
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
    <div className="bg-white text-sm w-80 h-60 rounded-md max-h-max lg:mb-0">
      <h2 className="font-bold text-lg text-start m-2">
        {days[weekDay.getDay()]} {day} de {months[month]}
      </h2>
      <div className="flex flex-col h-full bg-background-blue p-3 rounded-[inherit] lg:mb-0">
        <div className="flex flex-col h-full items-center mb-2">
          <h3 className="w-full text-lg text-start font-semibold text-black my-2 placeholder-zinc-400 rounded-md">
            {currentPacient.apellido}, {currentPacient.nombre}
          </h3>
          <div className="w-full flex gap-2">
            <a
              href={"https://wa.me/" + currentPacient.telefono}
              target="_blank"
              className="bg-whatsapp hover:bg-whatsapp-hover hover:border-2 hover:border-whatsapp transition-all w-8 h-8 rounded-md hover:rounded-[50%] flex justify-center items-center p-[6px]"
            >
              {/* Whatsapp */}
              <img src={whatsappIcon} alt="" className="object-cover filter invert-[100%] saturate-[7500%] hue-rotate-[15deg] brightness-[107%] contrast-[105%]" />
            </a>
            <a href={"mailto:" + currentPacient.email} target="_blank" className="bg-slightly-darker-blue hover:bg-background-blue hover:border-2 hover:border-slightly-darker-blue transition-all w-8 h-8 rounded-md hover:rounded-[50%] flex justify-center items-center p-[6px]">
              <img src={emailIcon} className="object-cover filter invert-[100%] saturate-[7500%] hue-rotate-[15deg] brightness-[107%] contrast-[105%]" />
            </a>
          </div>
        </div>
        <button
          className="self-end p-1 bg-email hover:bg-email-hover hover:border-email hover:border-2 rounded-md hover:rounded-[50%] transition-all w-8 h-8 flex justify-center items-center"
          onClick={() => deleteAppointment()}
        >
          <img
            className="filter invert-[100%] saturate-[7500%] hue-rotate-[15deg] brightness-[107%] contrast-[105%] object-cover"
            src={deleteIcon}
          />
        </button>
      </div>

      {/* {msg && <p>Faltan datos</p>} */}
    </div>
  );
};

export default RecurringPacient;
