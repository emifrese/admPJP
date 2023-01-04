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
    <div className="bg-white flex flex-col gap-10 items-center text-md rounded-md min-w-[50vw] px-5 py-3 mb-10 lg:mb-0">
      {!answer && (
        <>
          <h2>Ya se atendió antes?</h2>
          <div className="flex justify-around w-full">
            <button
              className="bg-red-400 px-4 py-2 rounded-xl text-white cursor-pointer transition-all hover:bg-red-600"
              onClick={() => setAnswer("recurring")}
            >
              Si
            </button>
            <button
              className="bg-green-400 px-4 py-2 rounded-xl text-white cursor-pointer transition-all hover:bg-green-600"
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
