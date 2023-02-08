import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../firebase";
import PlacesManager from "../places/PlacesManager";
import Modal from "./Modal";

const Header = () => {
  const width = useSelector((state) => state.responsive.width);
  const place = useSelector((state) => state.appointments.place);
  const [responsive, setResponsive] = useState(false);
  const [modal, setModal] = useState(false);

  const {pathname} = useLocation();

  let navClass = "flex items-center gap-4 bg-header-green";

  let headerClass = "text-zinc-300 absolute w-full top-0 flex justify-center h-16 py-4 bg-header-green";

  if (width <= 750) {
    headerClass += " px-2"
    if (responsive) {
      navClass +=
        " flex-col absolute top-0 w-full animate-menu-animation py-4 z-10";
    } else {
      navClass = "hidden";
    }
  }

  const toggleModal = () => setModal((state) => !state);

  return (
    <>
      {modal && (
        <Modal Toggle={toggleModal}>
          <PlacesManager Toggle={toggleModal} />
        </Modal>
      )}
      <header className={headerClass}>
        <div className="container flex justify-center items-center">
          <h1 className="font-bold text-xl w-full text-zinc-800 text-start ">
            {width > 750 ? "Administrador de Pacientes " : "A "}
            <Link to="/" className="text-zinc-300">
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
            <button
              onClick={() => {
                toggleModal();
                setResponsive((state) => !state);
              }}
              className="text-sm uppercase font-bold px-2 py-1 bg-zinc-800 rounded-lg"
            >
              {place}
            </button>
            <Link
              to="/"
              className={`text-xs uppercase font-bold ${pathname === '/' ? "text-violet-800" : ""}`}
              onClick={() => width <= 750 && setResponsive((state) => !state)}
            >
              Inicio
            </Link>
            <Link
              to="/appointmentConfig"
              className={`text-xs uppercase font-bold ${pathname === '/appointmentConfig' ? "text-violet-800" : ""}`}
              onClick={() => width <= 750 && setResponsive((state) => !state)}
            >
              Configurar
            </Link>
            <button
              className="text-xs uppercase font-bold"
              onClick={() => auth.signOut()}
            >
              Cerrar Sesión
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
