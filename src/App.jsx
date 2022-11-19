import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AdminLayout from "./components/layout/AdminLayout";
import AuthLayout from "./components/layout/AuthLayout";
import AdministrarPacientes from "./components/pages/AdministrarPacientes";
import Login from "./components/pages/Login";
import Router from "./router/Router";

function App() {
  return (
    <Router />
  );
}

export default App;
