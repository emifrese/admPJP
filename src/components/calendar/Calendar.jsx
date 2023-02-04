import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pacientsActions } from "../../store/states/pacients";
import Day from "./Day";
import Month from "./Month";
import TestMonth from "./TestMonth";

const Calendar = () => {
  const [modal, setModal] = useState(["", false]);
  const dispatch = useDispatch();
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
      // <TestMonth />
      }
      {width <= 750 && <Day />}
    </>
  );
};

export default Calendar;
