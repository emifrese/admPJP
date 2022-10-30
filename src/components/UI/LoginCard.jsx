import React from "react";

const LoginCard = () => {
  return (
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {/* {msg && <Alerta alert={alert} />} */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Email de Registro"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            // value={email}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="Tu Password"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            // value={password}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Inicia Sesión"
          className="bg-[#227777] w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-[#1b5e5e] md:w-auto"
        />
      </form>

      <nav className="mt-10 lg:flex lg:justify-between">
      </nav>
    </div>
  );
};

export default LoginCard;
