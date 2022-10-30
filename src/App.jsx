import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/layout/AdminLayout";
import AuthLayout from "./components/layout/AuthLayout";
import AdministrarPacientes from "./components/pages/AdministrarPacientes";
import Login from "./components/pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdministrarPacientes />} />
      </Route>
    </Routes>
  );
}

export default App;
