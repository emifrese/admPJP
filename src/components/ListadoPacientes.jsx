import React from "react";

import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const pacientes = [
    {
      nombre: "Emiliano",
      apellido: "Frese",
      email: "emilianomartindominguezfrese@gmail.com",
      fecha: "12/12/2022",
      telefono: "+542995282484",
      seguimiento: false,
      id: 1,
    },
    {
      nombre: "Wanda",
      apellido: "Nuccetelli",
      email: "w.nuccetelli@gmail.com",
      fecha: "12/14/2022",
      telefono: "+542215227516",
      seguimiento: true,
      id: 2,
    },
    {
      nombre: "Florencia",
      apellido: "Nuccetelli",
      email: "flornucce@gmail.com",
      fecha: "12/16/2022",
      telefono: null,
      seguimiento: false,
      id: 3,
    },
    {
      nombre: "Jorge",
      apellido: "Prueba",
      email: "jorgprueba@gmail.com",
      fecha: "12/19/2022",
      telefono: null,
      seguimiento: false,
      id: 4,
    },
  ];

  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>

          <p className="text-xl mt-4 text-center">
            Administra tus {""}
            <span className="text-indigo-600 font-bold ">
              Pacientes y Citas
            </span>
          </p>

          <div className="w-full flex justify-center gap-4">
            <button className="text-white font-normal px-2 py-1 rounded-lg bg-indigo-600">Semana 1</button>
            <button>Semana 2</button>
            <button>Semana 3</button>
            <button>Semana 4</button>
          </div>

          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando pacientes {""}
            <span className="text-indigo-600 font-bold ">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
