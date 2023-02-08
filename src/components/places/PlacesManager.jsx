import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../../store/states/appointments";
import arrowBack from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

const PlacesManager = ({ Toggle }) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [inputForm, setInputForm] = useState(["", "", ""]);
  const places = useSelector((state) => state.appointments.places);
  const place = useSelector((state) => state.appointments.place);
  const dispatch = useDispatch();
  console.log(places);

  const placesDisplay = places
    .filter((el) => el.name !== place)
    .map((el) => (
      <button
        key={Math.random().toString(27).slice(2)}
        className="px-4 py-2 rounded-md bg-header-green"
        onClick={() => {
          dispatch(appointmentsActions.togglePlace(el.name));
          Toggle();
        }}
      >
        {el.name}
      </button>
    ));

  const submitPlace = async (e) => {
    e.preventDefault()
    if (
      inputForm[0].trim() === "" ||
      inputForm[1].trim() === "" ||
      inputForm[2].trim() === ""
    ) {
      return alert("Completar todos los campos");
    }

    const placeRef = doc(firestore, `places/${inputForm[0]}`);

    let result = await Promise.all([placeInfo(placeRef), setDefAppointments("1"),setDefAppointments("2"),setDefAppointments("3"),setDefAppointments("4"),setDefAppointments("5"),]);

    console.log(result)
  };

  const placeInfo = (ref) => {
    return new Promise((resolve, reject) => {
      resolve(
        setDoc(
          ref,
          {
            name: inputForm[0],
            number: inputForm[2],
            street: inputForm[1],
          },
          { merge: true }
        )
      );
    });
  };

  const setDefAppointments = (day) => {

    const newPlaceRef = doc(
      firestore,
      `${inputForm[0]}/turnos/predeterminados/${day}`
    );

    return new Promise((resolve, reject) => {
      resolve(
        setDoc(newPlaceRef, {
          day,
        })
      );
    });
  };

  return (
    <>
      {!toggleForm && (
        <div className="flex flex-col gap-4 bg-white px-8 py-4 rounded-md">
          <h2>Cambia a otro lugar</h2>
          {placesDisplay}
          <button
            className="bg-brighter-yellow px-2 py-2 rounded-md font-bold"
            onClick={() => setToggleForm((state) => !state)}
          >
            Agregar nuevo lugar
          </button>
        </div>
      )}
      {toggleForm && (
        <div className="flex flex-wrap justify-center gap-4 bg-brighter-yellow px-8 py-4 rounded-md">
          <button onClick={() => setToggleForm((state) => !state)}>
            <img src={arrowBack} alt="" className="w-6" />
          </button>
          <h2 className="w-[80%] font-black md:text-xl text-md text-center">
            Agrega un nuevo sitio de consultas
          </h2>
          <form className="w-full flex flex-col gap-2" onSubmit={submitPlace}>
            <label
              className="flex justify-between text-header-green uppercase font-bold items-center text-sm md:text-md"
              htmlFor="name"
            >
              Lugar
              <input
                className="text-black p-2 rounded-md"
                type="text"
                id="name"
                name="name"
                value={inputForm[0]}
                onChange={(e) =>
                  setInputForm((state) => [e.target.value, state[1], state[2]])
                }
              />
            </label>
            <label
              className="flex justify-between text-header-green uppercase font-bold items-center text-sm md:text-md"
              htmlFor="street"
            >
              Calle
              <input
                className="text-black p-2 rounded-md"
                type="text"
                id="street"
                name="street"
                value={inputForm[1]}
                onChange={(e) =>
                  setInputForm((state) => [state[0], e.target.value, state[2]])
                }
              />
            </label>
            <label
              className="flex justify-between text-header-green uppercase font-bold items-center text-sm md:text-md"
              htmlFor="number"
            >
              Numero
              <input
                className="text-black p-2 rounded-md"
                type="text"
                id="number"
                name="number"
                value={inputForm[2]}
                onChange={(e) =>
                  setInputForm((state) => [state[0], state[1], e.target.value])
                }
              />
            </label>
            <button
              type="submit"
              className="bg-header-green text-white uppercase text-lg w-1/2 self-center rounded-md hover:bg-green-800"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PlacesManager;
