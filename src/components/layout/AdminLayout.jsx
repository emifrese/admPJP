import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../UI/Footer";
import Header from "../UI/Header";

const AdminLayout = () => {
  return (
    <>
      <Header />
      {<main className="container mx-auto mt-10">
        <Outlet/>
        </main>}
      <Footer />
    </>
  );
};

export default AdminLayout;
