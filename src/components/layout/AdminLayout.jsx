import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../UI/Footer";
import Header from "../UI/Header";
import { useDispatch } from "react-redux";
import { responsiveActions } from "../../store/states/responsive";


const AdminLayout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(responsiveActions.setWidth(window.innerWidth))
    }

    window.addEventListener("resize", handleResize)
  })

  return (
    <>
      <Header />
      {<main className="container mx-auto mt-6 h-screen">
        <Outlet/>
        </main>}
      <Footer />
    </>
  );
};

export default AdminLayout;
