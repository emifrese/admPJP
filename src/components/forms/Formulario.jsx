import React, { useState } from "react";
import { useEffect } from "react";

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [id, setId] = useState(null);

  const [alert, setAlert] = useState({});

  const [fechas, setFechas] = useState([]);
  const [horas, setHoras] = useState([]);

  useEffect(() => {
    // Carga de pacientes, fechas y horas disponibles
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, apellido, telefono, fecha, hora].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    // Guardamos el paciente y su primer turno
    setAlert({
      msg: "Guardado correctamente",
    });
    setNombre("");
    setApellido("");
    setTelefono("");
    setFecha("");
    setHora("");
    setId(null);
  };

  const { msg } = alert;

  return (
    <>
      <h2 className="font-black text-3xl text-center">
        Administrador de Pacientes
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus pacientes {""}
        <span className="text-[#227777] font-bold">Administralos</span>
      </p>
      <form
        className="bg-zinc-300 border-2 rounded-md shadow-md max-h-max px-5 py-10 mb-10 lg:mb-0"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-zinc-700 uppercase font-bold">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre del paciente"
            className="border-2 w-full p-2 mt-2 placeholder-zinc-400 rounded-md"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
        </div>
        <div className="mb-5">
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
            className="border-2 w-full p-2 mt-2 placeholder-zinc-400 rounded-md"
            onChange={(e) => setApellido(e.target.value)}
            value={apellido}
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
            placeholder="Nombre del paciente"
            className="border-2 w-full p-2 mt-2 placeholder-zinc-400 rounded-md"
            onChange={(e) => setTelefono(e.target.value)}
            value={telefono}
          />
        </div>
        <div className="mb-5 flex items-center">
          <label htmlFor="fecha" className="text-zinc-700 uppercase font-bold">
            Fecha
          </label>
          <select
            id="fecha"
            className="border-2 w-1/5 ml-2 mr-4 rounded-md"
            onChange={(e) => console.log(e.target.value)}
          >
            {/* Aca van las opciones que renderizamos una vez cargadas */}
            <option value={null} disabled></option>
            <option value="23-10">23/10</option>
            <option value="25-10">25/10</option>
            <option value="27-10">27/10</option>
          </select>
          <label htmlFor="hora" className="text-zinc-700 uppercase font-bold">
            Hora
          </label>
          <select
            id="hora"
            className="border-2 w-1/5 ml-2 rounded-md"
            onChange={(e) => console.log(e.target.value)}
          >
            {/* Aca van las opciones que renderizamos una vez cargadas */}
            <option value={null} disabled></option>
            <option value="18:00">18:00</option>
            <option value="18:30">18:30</option>
            <option value="19:00">19:00</option>
          </select>
        </div>
        <input
          type="submit"
          className="bg-[#227777] rounded-md w-full p-3 text-zinc-300 uppercase font-bold hover:bg-[#1b5e5e] cursor-pointer transition-colors"
        />
      </form>

      {msg  && <p>Faltan datos</p>}
    </>


  );
};

export default Formulario;
