import React, { useState } from "react";
import { useSelector } from "react-redux";
import Day from "./Day";
import Month from "./Month";

const Calendar = () => {
  const [modal, setModal] = useState(["", false]);
  const width = useSelector((state) => state.responsive.width);

  const toggleModal = (type) => {
    if (modal[0] === "recurring") {
      // dispatch(pacientsActions.setCurrentPacient({}));
    }
    setModal((state) => [type, true]);
  };

  return (
    <>
      {width > 750 && 
      <Month toggleModal={toggleModal} modal={modal} />
      }
      {width <= 750 && <Day />}
    </>
  );
};

export default Calendar;
