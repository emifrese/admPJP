import { Suspense, Lazy } from "react";
import { Route, BrowserRouter, Navigate, Routes } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AuthLayout from "../components/layout/AuthLayout";
import Loader from "../components/loader/Loader";
import AdministrarPacientes from "../components/pages/AdministrarPacientes";
import Login from "../components/pages/Login";

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdministrarPacientes />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Loader />
    </Suspense>
  );
};

export default Router;