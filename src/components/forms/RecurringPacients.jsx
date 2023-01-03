import React, { useState } from "react";
import { useEffect } from "react";
import { collection, addDoc, doc, updateDoc, deleteField } from "firebase/firestore";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase";

const RecurringPacient = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [id, setId] = useState(null);
  const currentPacient = useSelector((state) => state.pacients.currentPacient);
  console.log(currentPacient)
  const currentPlace = useSelector((state) => state.appointments.place);
  console.log(currentPacient)
  const [alert, setAlert] = useState({});
  const appointmentRef = doc(firestore, `${currentPlace}/turnos/diciembre/5`);
  console.log(appointmentRef)
  
  useEffect(() => {});

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
        hour: '1700',
        pacientId: "vUPumtHxSPZsDKHNzXtv"
      },
      // 1730: deleteField(), borra ese campo
      1730: {
        hour: '1700',
        pacientId: "vUPumtHxSPZsDKHNzXtv"
      },
      day: "5"
    })

    // Guardamos el paciente y su primer turno
    setAlert({
      msg: "Guardado correctamente",
    });
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setId(null);
  };

  const { msg } = alert;

  return (
    <div className="bg-white text-sm rounded-md max-h-max px-5 py-3 mb-10 lg:mb-0">
      <h2 className="font-black text-xl text-center">
        Agenda un turno
      </h2>
      <form
        className="px-5 py-3 mb-10 lg:mb-0"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center">
          <label htmlFor="nombre" className="text-zinc-700 uppercase font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del paciente"
            className="border-2 p-2 my-2 placeholder-zinc-400 rounded-md"
            // onChange={(e) => setNombre(e.target.value)}
            value={currentPacient[0].nombre}
          />
        </div>
        <div className="flex justify-between items-center">
          <label
            htmlFor="apellido"
            className="text-zinc-700 uppercase font-bold"
          >
            Apellido
          </label>
          <input
            id="apellido"
            type="text"
            placeholder="Apellido del paciente"
            className="border-2 p-2 my-2 placeholder-zinc-400 rounded-md"
            // onChange={(e) => setApellido(e.target.value)}
            value={currentPacient[0].apellido}
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="email" className="text-zinc-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email del paciente"
            className="border-2 p-2 my-2 placeholder-zinc-400 rounded-md"
            // onChange={(e) => setEmail(e.target.value)}
            value={currentPacient[0].email}
          />
        </div>
        <div className="flex justify-between items-center mb-5">
          <label
            htmlFor="telefono"
            className="text-zinc-700 uppercase font-bold"
          >
            Telefono
          </label>
          <input
            id="telefono"
            type="text"
            placeholder="Telefono del paciente"
            className="border-2 p-2 my-2 placeholder-zinc-400 rounded-md"
            // onChange={(e) => setTelefono(e.target.value)}
            value={currentPacient[0].telefono}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 rounded-md w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>

      {/* {msg && <p>Faltan datos</p>} */}
    </div>
  );
};

export default RecurringPacient;
