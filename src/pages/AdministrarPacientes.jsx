import React, { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import NewAppointment from "../components/forms/NewAppointment";
import ListadoPacientes from "../components/ListadoPacientes";
import Modal from "../components/UI/Modal";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const tituloBoton = `${
    mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"
  }`;

  return (
    <div className="flex justify-center">
      <Calendar />
    </div>
  );
};

export default AdministrarPacientes;
