import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Modal from "./Modal";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState([false, ""]);
  const [empty, setEmpty] = useState([false, false]);

  const toggleModal = () => {
    setAlert((state) => [!state[0], ""]);
  };

  return (
    <div className="mt-10 md:mt-0 shadow-login-card px-5 py-8 rounded-xl bg-white">
      {alert[0] && (
        <Modal Toggle={toggleModal}>
          <div className="bg-white px-4 py-6 rounded-md flex flex-col w-60 h-40 justify-between items-center">
            <h2>{alert[1]}</h2>
            <button
              className="border-2 border-black px-2 rounded-md self-end"
              onClick={toggleModal}
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}
      {/* {msg && <Alerta alert={alert} />} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("click");

          if (empty[0] || empty[1]) {
            return;
          }

          if (email.trim() === "" && password.trim() === "") {
            console.log(empty);
            setEmpty((state) => [true, true]);
            return;
          }

          if (email.trim() === "") {
            setEmpty((state) => [true, state[1]]);
            return;
          }

          if (password.trim() === "") {
            setEmpty((state) => [state[0], true]);
            return;
          }

          const re = /\S+@\S+\.\S+/;
          if (!re.test(email)) {
            setAlert([true, "Email no válido"]);
            return;
          }

          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              // console.log(user);
            })
            .catch((error) => {
              const errorCode = error.code.match(/\/(.*)/g)[0];
              if (errorCode === "/user-not-found") {
                setAlert([true, "Usuario no encontrado"]);
              }
              if (errorCode === "/wrong-password") {
                setAlert([true, "Contraseña incorrecta"]);
              }
            });
        }}
      >
        <div className="mt-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Email de Registro"
            className={`border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-background-blue${
              empty[0] ? " border-red-700 focus:outline-red-700" : ""
            }`}
            value={email}
            onChange={(e) => {
              if (e.target.value.trim() !== "" && empty[0]) {
                setEmpty((state) => [!state[0], state[1]]);
              }
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="Tu Password"
            className={`border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-background-blue${
              empty[1] ? " border-red-700 focus:outline-red-700" : ""
            }`}
            value={password}
            onChange={(e) => {
              if (e.target.value.trim() !== "" && empty[1]) {
                setEmpty((state) => [state[0], !state[1]]);
              }
              setPassword(e.target.value);
            }}
          />
        </div>
        <input
          type="submit"
          value="Inicia Sesión"
          className={`bg-background-blue w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-slightly-darker-blue active:bg-slightly-darker-blue md:w-auto${
            empty[0] || empty[1]
              ? " bg-slate-400 active:bg-slate-400 hover:bg-slate-400"
              : ""
          }`}
          disabled={empty[0] || empty[1]}
        />
      </form>

      {/* <nav className="mt-10 lg:flex lg:justify-between"></nav> */}
    </div>
  );
};

export default LoginCard;
