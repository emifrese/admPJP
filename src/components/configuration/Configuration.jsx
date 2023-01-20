import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DesktopConfig from "./DesktopConfig";
import MobileConfig from "./MobileConfig";

const Configuration = () => {
  const dispatch = useDispatch();
  const width = useSelector((state) => state.responsive.width);

  return (
    <>
      {width > 750 && <DesktopConfig />}
      {width <= 750 && <MobileConfig />}
    </>
  );
};

export default Configuration;
