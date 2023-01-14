import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Header = () => {
  const width = useSelector((state) => state.responsive.width);
  const place = useSelector(state => state.appointments.place)
  const [responsive, setResponsive] = useState(false);

  let navClass = "flex items-center gap-4 bg-[#227777]";

  if (width <= 750) {
    if (responsive) {
      navClass += " flex-col absolute top-0 w-full animate-menu-animation py-4";
    } else {
      navClass = "hidden";
    }
  }

  return (
    <header className="flex justify-center h-16 py-4 bg-[#227777]">
      <div className="container flex justify-center items-center">
        <h1 className="font-bold text-xl w-full text-zinc-800 text-start ">
          {width > 750 ? "Administrador de Pacientes " : "A "}
          <Link to="/" className="text-zinc-300 font-black">
            JP
          </Link>
        </h1>

        {width <= 750 && (
          <span
            className="material-symbols-outlined cursor-pointer"
            onClick={() => setResponsive((state) => !state)}
          >
            menu
          </span>
        )}

        <nav className={navClass}>
          <p className="text-zinc-300 text-sm uppercase font-bold px-2 py-1 bg-zinc-800 rounded-lg">
            {place}
          </p>
          <Link
            to="/"
            className="text-zinc-300 text-xs uppercase font-bold"
          >
            Inicio
          </Link>
          <Link
            to="/appointmentConfig"
            className="text-zinc-300 text-xs uppercase font-bold"
          >
            Configurar
          </Link>
          <button
            className="text-zinc-300 text-xs uppercase font-bold"
            onClick={() => auth.signOut()}
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
