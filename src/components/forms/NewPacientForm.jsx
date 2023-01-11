import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useDispatch } from "react-redux";
import { pacientsActions } from "../../store/states/pacients";

const NewPacientForm = ({ moveToggle, Toggle }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const dispatch = useDispatch();

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(nombre, apellido, telefono);

    if ([nombre, apellido, telefono, email].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 1500);
      return;
    }

    const turnosRef = collection(firestore, "pacientes");

    const newPaciente = {
      nombre,
      apellido,
      telefono,
      email,
      appointments: []
    };

    await addDoc(turnosRef, newPaciente);

    setAlert({
      msg: "Guardado correctamente",
    });
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setTimeout(() => {
      dispatch(pacientsActions.setCurrentPacient({}));
      moveToggle("recurring");
    }, 1500);
  };

  const { msg } = alert;

  return (
    <div className="bg-white text-sm rounded-md max-h-max px-5 py-3 mb-10 lg:mb-0">
      <button onClick={() => moveToggle("home")}>BACK</button>
      <h2 className="font-black text-xl mt-2 mb-2 text-center">
        Añade tu nuevo {""}
        <span className="text-[#227777] font-bold">Paciente</span>
      </h2>
      <form className="px-5 py-3 mb-10 lg:mb-0" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre" className="text-zinc-700 uppercase font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del paciente"
            className="border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
        </div>
        <div>
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
            className="border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md"
            onChange={(e) => setApellido(e.target.value)}
            value={apellido}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-zinc-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email del paciente"
            className="border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-5">
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
            className="border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md"
            onChange={(e) => setTelefono(e.target.value)}
            value={telefono}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 rounded-md w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        />
      </form>

      {msg}
    </div>
  );
};

export default NewPacientForm;
