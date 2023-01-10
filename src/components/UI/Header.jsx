import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

const Header = () => {
  const width = useSelector((state) => state.responsive.width);
  const [responsive, setResponsive] = useState(false);

  const navClass =
    (width <= 750 && responsive) || width > 750
      ? "flex flex-col md:flex-row items-center gap-4 mt-5 lg:mt-0"
      : "hidden";

  return (
    <header className="py-4 bg-[#227777]">
      <div
        className="container mx-auto flex flex-col lg:flex-row
   justify-between items-center"
      >
        <h1 className="font-bold text-xl text-zinc-800 text-center">
          Administrador de Pacientes{" "}
          <Link to="/" className="text-zinc-300 font-black">
            JP
          </Link>
        </h1>

        <span
          className="material-symbols-outlined"
          onClick={() => setResponsive((state) => !state)}
        >
          menu
        </span>

        <nav className={navClass}>
          <p className="text-zinc-300 text-sm uppercase font-bold px-2 py-1 bg-zinc-800 rounded-lg">
            BIGG
          </p>
          <Link
            to="/newPacient"
            className="text-zinc-300 text-xs uppercase font-bold"
          >
            Pacientes
          </Link>
          <Link
            to="/appointmentsAdmin"
            className="text-zinc-300 text-xs uppercase font-bold"
          >
            Turnos
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
