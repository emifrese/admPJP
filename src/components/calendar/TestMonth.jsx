import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../../store/states/appointments";
import arrowPrev from "../../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg";
import arrowNext from "../../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg";
import { months } from "../../helpers/date";

const TestMonth = () => {
  const month = useSelector((state) => state.appointments.month);
  const dispatch = useDispatch();
  const turnos = useSelector((state) => state.appointments.appointments);

  const [loader, setLoader] = useState(false);

  const toggleLoader = () => {
    setLoader((state) => !state);

    setTimeout(() => {
      setLoader((state) => !state);
    }, 2000);
  };

  console.log(turnos);
  return (
    <div>
      <button
        onClick={() => {
          toggleLoader();
          dispatch(appointmentsActions.moveMonth("reduction"));
        }}
      >
        <img className="w-8" src={arrowPrev} />
      </button>
      <h2 className="text-4xl uppercase font-bold text-center">
        {months[month]}
      </h2>
      <button
        onClick={() => {
          toggleLoader();
          dispatch(appointmentsActions.moveMonth("increment"));
        }}
      >
        <img className="w-8" src={arrowNext} />
      </button>
      {loader && <div>Loading</div>}
    </div>
  );
};

export default TestMonth;
