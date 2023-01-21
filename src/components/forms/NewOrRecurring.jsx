import React, { useState } from "react";
import NewAppointment from "./NewAppointment";
import NewPacientForm from "./NewPacientForm";
import RecurringPacient from "./RecurringPacients";

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
    <div className="bg-brighter-yellow flex flex-col gap-6 items-center text-md rounded-md min-w-[50vw] px-5 py-3 mb-10 lg:mb-0">
      {!answer && (
        <>
          <h2 className="text-xl uppercase font-bold">Ya se atendió antes?</h2>
          <div className="flex gap-2 justify-around w-full">
            <button
              className="bg-header-green px-4 py-2 rounded-xl text-white uppercase w-1/2 cursor-pointer transition-all"
              onClick={() => setAnswer("recurring")}
            >
              Si
            </button>
            <button
              className="bg-red-600 px-4 py-2 rounded-xl text-white cursor-pointer uppercase w-1/2 transition-all hover:bg-green-600"
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
