import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Suspense, Lazy } from "react";
import { Route, BrowserRouter, Navigate, Routes } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AuthLayout from "../components/layout/AuthLayout";
import Loader from "../components/loader/Loader";
import AdministrarPacientes from "../components/pages/AdministrarPacientes";
import Login from "../components/pages/Login";
import { auth } from "../firebase";

const Router = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  });

  const layout = !user ? <AuthLayout /> : <AdminLayout />

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={layout}>
            {!user ? (
              <Route index element={<Login />} />
            ) : (
              <Route index element={<AdministrarPacientes />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
      <Loader />
    </Suspense>
  );
};

export default Router;
