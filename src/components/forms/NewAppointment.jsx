import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const NewAppointment = () => {
  const [nombre, setNombre] = useState("");
  const pacients = useSelector((state) => state.pacients);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const filterLastName =
    pacients.length > 0 &&
    pacients.filter((el) => {
      if (nombre.trim() === "") {
        return null;
      } else {
        return el.apellido.toLowerCase().includes(nombre.trim());
      }
    });

  console.log(filterLastName);

  return (
    <>
      <h2 className="font-black text-xl text-center">Nuevo Turno</h2>

      <p className="text-md mt-2 mb-2 text-center">
        Completa los datos para agendar un nuevo {""}
        <span className="text-[#227777] font-bold">TURNO</span>
      </p>
      <form
        className="bg-white text-sm rounded-md shadow-[10px_10px_10px_2px_rgba(67,56,202,0.3)] max-h-max px-5 py-3 mb-10 lg:mb-0"
        onSubmit={handleSubmit}
      >
        <div className="relative">
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
          {filterLastName.length > 0 && nombre.length > 0 && (
            <div className="absolute border-2 border-[#e5e7eb] bg-white rounded-b-md border-t-0 w-full">
              {filterLastName.map((e) => (
                <p className="py-2 cursor-pointer hover:bg-zinc-300">
                  {e.apellido}, {e.nombre}
                </p>
              ))}
            </div>
          )}
          {(filterLastName.length === 0 && nombre.length > 0) && (
            <div className="absolute border-2 border-[#e5e7eb] bg-white rounded-b-md border-t-0 w-full py-2 cursor-pointer hover:bg-zinc-300">
              Agregar nuevo paciente
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default NewAppointment;
