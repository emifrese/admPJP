import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { pacientsActions } from "../../store/states/pacients";
import arrowBack from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";

const NewPacientForm = ({ moveToggle, Toggle }) => {
  const pacients = useSelector((state) => state.pacients.pacients);
  console.log(pacients);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const dispatch = useDispatch();

  const [alert, setAlert] = useState({});
  const [warningInput, setWarningInput] = useState([]);

  const example = pacients.find((el) => el.telefono === telefono);

  console.log(warningInput);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(nombre, apellido, telefono);

    if ([nombre, apellido, telefono, email].includes("")) {
      setWarningInput((state) =>
        state.length === 4 ? state : ["nombre", "apellido", "email", "telefono"]
      );
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2500);
      return;
    }

    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setAlert({
        msg: "Email no válido",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2500);
      return;
    }

    const repeatedEmail = pacients.find((el) => el.email === email);

    const repeatedTelefono = pacients.find((el) => el.telefono === telefono);

    if (telefono.length < 10) {
      setAlert({
        msg: "El telefono debe tener 10 digitos",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2500);
      return;
    }

    if (repeatedTelefono) {
      setAlert({
        msg: "El telefono ya existe",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2500);
      return;
    }

    if (repeatedEmail) {
      setAlert({
        msg: "Ya existe un usuario con ese email",
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 2500);
      return;
    }

    const turnosRef = collection(firestore, "pacientes");

    const newPaciente = {
      nombre,
      apellido,
      telefono,
      email,
      appointments: [],
    };

    await addDoc(turnosRef, newPaciente);

    setAlert({
      msg: "Guardado correctamente",
    });
    setNombre("");
    setApellido("");
    setTelefono("");
    setEmail("");
    setTimeout(() => {
      dispatch(pacientsActions.setCurrentPacient({}));
      moveToggle("recurring");
    }, 1500);
  };

  const { msg } = alert;

  return (
    <>
      <div className="flex justify-start w-full items-center">
        <button className="absolute" onClick={() => moveToggle("home")}>
          <img src={arrowBack} className="w-6" />
        </button>
        <h2 className="w-full font-black text-xl mt-2 mb-2 text-center">
          Añade tu nuevo {""}
          <span className="text-header-green font-bold">Paciente</span>
        </h2>
      </div>
      <div className="relative text-sm rounded-md max-h-max px-5">
        <form className="px-5 mb-12" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="nombre"
              className="text-zinc-700 uppercase font-bold"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre del paciente"
              className={`border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md${
                warningInput.includes("nombre") || warningInput.includes("all")
                  ? " border-red-700 focus:outline-red-700"
                  : ""
              }`}
              onChange={(e) => {
                if (
                  e.target.value.trim() !== "" &&
                  warningInput.includes("nombre")
                ) {
                  setWarningInput((state) =>
                    state.filter((el) => el !== "nombre")
                  );
                }
                setNombre(e.target.value);
              }}
              value={nombre}
            />
          </div>
          <div>
            <label
              htmlFor="apellido"
              className="text-zinc-700 uppercase font-bold"
            >
              Apellido
            </label>
            <input
              id="apellido"
              type="text"
              placeholder="Apellido del paciente"
              className={`border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md${
                +warningInput.includes("apellido") ||
                warningInput.includes("all")
                  ? " border-red-700 focus:outline-red-700"
                  : ""
              }`}
              onChange={(e) => {
                if (
                  e.target.value.trim() !== "" &&
                  warningInput.includes("apellido")
                ) {
                  setWarningInput((state) =>
                    state.filter((el) => el !== "apellido")
                  );
                }
                setApellido(e.target.value);
              }}
              value={apellido}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-zinc-700 uppercase font-bold"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Email del paciente"
              className={`border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md${
                +warningInput.includes("email") || warningInput.includes("all")
                  ? " border-red-700 focus:outline-red-700"
                  : ""
              }`}
              onChange={(e) => {
                if (
                  e.target.value.trim() !== "" &&
                  warningInput.includes("email")
                ) {
                  setWarningInput((state) =>
                    state.filter((el) => el !== "email")
                  );
                }
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="telefono"
              className="text-zinc-700 uppercase font-bold"
            >
              Telefono
            </label>
            <input
              id="telefono"
              type="text"
              placeholder="Sin el 0 y sin el 15"
              className={`border-2 w-full p-2 my-2 placeholder-zinc-400 rounded-md${
                +warningInput.includes("telefono") ||
                warningInput.includes("all")
                  ? " border-red-700 focus:outline-red-700"
                  : ""
              }`}
              onChange={(e) => {
                if(e.target.value.trim() !== "" && warningInput.includes("telefono")){
                  setWarningInput(state => state.filter(el => el !== "telefono"))
                }
                setTelefono(e.target.value)}}
              value={telefono}
            />
          </div>
          <input
            type="submit"
            className="bg-indigo-600 rounded-md w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          />
          {msg && (
            <p className="w-full absolute right-0 bottom-0 text-md uppercase font-bold">
              {msg}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default NewPacientForm;
