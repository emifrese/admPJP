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
    <div className="w-full bg-background-blue flex flex-col gap-6 justify-between items-center text-md rounded-md px-5 py-3 mb-10 lg:mb-0">
      {!answer && (
        <>
          <h2 className="text-xl uppercase font-bold">Ya se atendió antes?</h2>
          <div className="flex justify-center items-end gap-2 w-full h-full">
            <button
              className="flex justify-center items-center bg-slightly-darker-blue hover:bg-background-blue py-2 lg:py-4 rounded-md hover:border-2 hover:border-slightly-darker-blue hover:rounded-[50%] text-white text-2xl uppercase lg:w-1/3 cursor-pointer transition-all w-12 h-12"
              onClick={() => setAnswer("recurring")}
            >
              Si
            </button>
            <button
              className="flex justify-center items-center bg-email hover:bg-email-hover hover:border-2 hover:border-email py-2 lg:py-4 rounded-md hover:rounded-[50%] text-white text-2xl uppercase lg:w-1/3 transition-all w-12 h-12"
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
