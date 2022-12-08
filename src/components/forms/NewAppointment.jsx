import { current } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NewAppointment = () => {
  const [nombre, setNombre] = useState("");
  const [currentPacient, setCurrentPacient] = useState({});
  const pacients = useSelector((state) => state.pacients);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(Object.keys(currentPacient));

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
                <button
                  className="block w-full text-start py-2 cursor-pointer hover:bg-zinc-300"
                  onClick={() => {
                    setCurrentPacient(e);
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
            <Link
              to="/newPacient"
              className="block absolute border-2 border-[#e5e7eb] bg-white rounded-b-md border-t-0 w-full py-2 cursor-pointer hover:bg-zinc-300"
            >
              Agregar nuevo paciente
            </Link>
          )}
        </div>
      </form>
      {Object.keys(currentPacient).length > 0 && (
        <div className="bg-white text-sm rounded-md shadow-[10px_10px_10px_2px_rgba(67,56,202,0.3)] max-h-max px-5 py-3 mt-10 mb-10 lg:mb-0">
          <p>Nombre: {currentPacient.nombre}</p>
          <p>Apellido: {currentPacient.apellido}</p>
          <p>Email: {currentPacient.email}</p>
          <p>Telefono: {currentPacient.telefono}</p>
          {currentPacient.turnos ? (
            <p>Paciente Control</p>
          ) : (
            <p>Paciente Nuevo</p>
          )}
        </div>
      )}
    </>
  );
};

export default NewAppointment;
