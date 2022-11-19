import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="py-4 bg-[#227777]">
    <div
      className="container mx-auto flex flex-col lg:flex-row
   justify-between items-center"
    >
      <h1 className="font-bold text-xl text-zinc-800 text-center">
        Administrador de Pacientes de{" "}
        <span className="text-zinc-300 font-black">Josefina Paterno</span>
      </h1>

      <nav className="flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0">
        <Link to="/admin" className="text-zinc-300 text-xs uppercase font-bold">
          Pacientes
        </Link>
        <Link to="/admin/perfil" className="text-zinc-300 text-xs uppercase font-bold">
          Perfil
        </Link>
        <button
          className="text-zinc-300 text-xs uppercase font-bold"
        //   onClick={cerrarSesion}
        >
          Cerrar Sesión
        </button>
      </nav>
    </div>
  </header>
  )
}

export default Header