import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase'

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
        <p className="text-zinc-300 text-sm uppercase font-bold px-2 py-1 bg-zinc-800 rounded-lg">
          BIGG
        </p>
        <Link to="/newPacient" className="text-zinc-300 text-xs uppercase font-bold">
          Pacientes
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
  )
}

export default Header