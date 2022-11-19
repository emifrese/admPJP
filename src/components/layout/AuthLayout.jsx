import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  // Auth Logic

  return (
    <main className="container mx-auto md:grid grid-cols-2 mt-12 gap-10 p-5">
      <Outlet/>
    </main>
  );
};

export default AuthLayout;
