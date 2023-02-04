import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../../store/states/appointments";

const PlacesManager = ({ Toggle }) => {
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

  return (
    <div className="flex flex-col gap-4 bg-white px-8 py-4 rounded-md">
      <h2>Cambia a otro lugar</h2>
      {placesDisplay}
    </div>
  );
};

export default PlacesManager;
