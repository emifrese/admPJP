import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pacientsActions } from "../../store/states/pacients";
import Day from "./Day";
import Month from "./Month";

const Calendar = () => {
  const [modal, setModal] = useState(["", false]);
  const dispatch = useDispatch();
  const width = useSelector((state) => state.responsive.width);

  const toggleModal = (type) => {
    if (modal[0] === "recurring") {
      dispatch(pacientsActions.setCurrentPacient({}));
    }
    setModal((state) => [type, !state[1]]);
  };

  return (
    <>
      {width > 750 && <Month toggleModal={toggleModal} modal={modal} />}
      {width <= 750 && <Day toggleModal={toggleModal} modal={modal} />}
    </>
  );
};

export default Calendar;
