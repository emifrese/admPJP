import React, { useState } from "react";
import NewAppointment from "./NewAppointment";
import NewPacientForm from "./NewPacientForm";

const NewOrRecurring = ({ Toggle }) => {
  const [answer, setAnswer] = useState(null);

  const moveToggle = (place) => {
    if (place === "home") {
      setAnswer(null);
    } else if (place === "recurring") {
      setAnswer("recurring");
    } else {
      setAnswer("new");
    }
  };

  return (
    <div className="w-full bg-brighter-yellow flex flex-col gap-6 justify-start items-center text-md rounded-md px-5 py-3 mb-10 min-h-[20rem] lg:mb-0">
      {!answer && (
        <>
          <h2 className="text-xl uppercase font-bold">Ya se atendió antes?</h2>
          <div className="flex flex-col justify-center items-center gap-2 w-full h-full">
            <button
              className="bg-header-green py-2 lg:py-4 rounded-xl text-white text-4xl uppercase w-full lg:w-1/3 cursor-pointer transition-all"
              onClick={() => setAnswer("recurring")}
            >
              Si
            </button>
            <button
              className="bg-red-600 py-2 lg:py-4 rounded-xl text-white text-4xl uppercase w-full lg:w-1/3 transition-all"
              onClick={() => setAnswer("new")}
            >
              No
            </button>
          </div>
        </>
      )}
      {answer === "recurring" && <NewAppointment moveToggle={moveToggle} />}
      {answer === "new" && (
        <NewPacientForm moveToggle={moveToggle} Toggle={Toggle} />
      )}
    </div>
  );
};

export default NewOrRecurring;
