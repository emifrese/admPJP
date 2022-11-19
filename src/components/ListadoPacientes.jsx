import React, { useState } from "react";
import { useEffect } from "react";

import Paciente from "./Paciente";

const ListadoPacientes = () => {
  // '12/05'
  const [semana, setSemana] = useState(1);
  const [turnosSemana, setTurnosSemana] = useState([]);
  // const [turnosCards, setTurnosCards] = useState([]);

  // useEffect(() => {
  //   if(turnos){
  //     setTurnosSemana(turnos.filter(week => week.semana === semana))
  //   }

  // }, [semana])

  const turnos = [
    {
      semana: "12/05",
      dias: [
        {
          dia: "12/05/2022",
          turnos: [
            {
              hora: "17:00",
              pacienteId: 1,
            },
            {
              hora: "17:30",
              pacienteId: 2,
            },
            {
              hora: "18:00",
              pacienteId: 3,
            },
            {
              hora: "18:30",
              pacienteId: null,
            },
          ],
        },
        {
          dia: "12/07/2022",
          turnos: [{}, {}, {}, {}],
        },
        {
          dia: "12/09/2022",
          turnos: [{}, {}, {}, {}],
        },
      ],
    },
  ];

  const newPacientes = [
    {
      id: 1,
      nombre: "Emiliano",
      apellido: "Frese",
      email: "emilianomartindominguezfrese@gmail.com",
      telefono: "+542995282484",
      seguimiento: false,
      turnos: [
        {
          fecha: "12/05/2022",
          hora: "17:00",
        },
      ],
    },
    {
      id: 2,
      nombre: "Wanda",
      apellido: "Nuccetelli",
      email: "w.nuccetelli@gmail.com",
      telefono: "+542215227516",
      seguimiento: true,
      turnos: [
        {
          fecha: "12/05/2022",
          hora: "17:30",
        },
      ],
    },
    {
      id: 3,
      nombre: "Florencia",
      apellido: "Nuccetelli",
      email: "flornucce@gmail.com",
      telefono: null,
      seguimiento: false,
      turnos: [
        {
          fecha: "12/05/2022",
          hora: "18:00",
        },
      ],
    },
  ];

  // console.log(turnosSemana);
  // console.log(turnos.filter(week => week.semana === semana))

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

  const buttonStyles = (w, n) => `text-white font-normal px-2 py-1 rounded-lg border-2 border-zinc-800 ${
    w === n ? "bg-indigo-600 " : 'bg-zinc-800'
  }`;

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

          <div className="w-full flex justify-center gap-4 mt-4">
            <button
              className={buttonStyles(semana, 1)}
              onClick={() => setSemana((state) => (state !== 1 ? 1 : state))}
            >
              Semana 1
            </button>
            <button
              className={buttonStyles(semana, 2)}
              onClick={() => setSemana((state) => (state !== 2 ? 2 : state))}
            >
              Semana 2
            </button>
            <button
              className={buttonStyles(semana, 3)}
              onClick={() => setSemana((state) => (state !== 3 ? 3 : state))}
            >
              Semana 3
            </button>
            <button
              className={buttonStyles(semana, 4)}
              onClick={() => setSemana((state) => (state !== 4 ? 4 : state))}
            >
              Semana 4
            </button>
          </div>

          {pacientes.map((paciente) => (
            <Paciente key={paciente.id} paciente={paciente} />
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
