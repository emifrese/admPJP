import React, { useState } from "react";
import Formulario from "../forms/Formulario";
import ListadoPacientes from "../ListadoPacientes";
import AddButton from "../UI/AddButton";

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const tituloBoton = `${
    mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"
  }`;

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <button
        type="button"
        className="bg-[#227777] text-zinc-300 font-bold uppercase mx-10 p-3 rounded-md mb-5 md:hidden"
        onClick={() => setMostrarFormulario((prevState) => !prevState)}
      >
        {tituloBoton}
      </button>
      <div
        className={`${
          mostrarFormulario ? "block" : "hidden"
        } md:block md:w-1/2 lg:w-2/5`}
      >
        <Formulario />
      </div>

      <div className="max-h-full md:w-1/2 lg:w-3/5 overflow-auto md:max-h-[500px] md:overflow-y-scroll">
        <ListadoPacientes />
      </div>
      {/* <AddButton /> */}
    </div>
  );
};

export default AdministrarPacientes;
