import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Modal from "./Modal";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState([false, ""]);

  return (
    <div className="mt-10 md:mt-0 shadow-login-card px-5 py-8 rounded-xl bg-white">
      {alert[0] && (
        <Modal>
          <div className="bg-white px-4 py-6 rounded-md flex flex-col w-60 h-40 justify-between items-center">
            <h2>{alert[1]}</h2>
            <button className="border-2 border-black px-2 rounded-md self-end">Cerrar</button>
          </div>
        </Modal>
      )}
      {/* {msg && <Alerta alert={alert} />} */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const re = /\S+@\S+\.\S+/;
          if (!re.test(email)) {
            setAlert((state) => [!state[0], "Invalid Email"]);
            return;
          }

          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error.message);
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
            className="border-2 w-full p-3 mt-3 bg-gray-50 rounded-xl focus:border-background-blue outline-none transition ease-out delay-150"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Password
          </label>
          <input
            type="password"
            placeholder="Tu Password"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl focus:outline-background-blue"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Inicia Sesión"
          className="bg-background-blue w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-slightly-darker-blue active:bg-slightly-darker-blue md:w-auto"
        />
      </form>

      {/* <nav className="mt-10 lg:flex lg:justify-between"></nav> */}
    </div>
  );
};

export default LoginCard;
