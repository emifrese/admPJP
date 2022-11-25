import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Suspense, Lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter, Navigate, Routes } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AuthLayout from "../components/layout/AuthLayout";
import Loader from "../components/loader/Loader";
import AdministrarPacientes from "../pages/AdministrarPacientes";
import Login from "../pages/Login";
import { auth, firestore } from "../firebase";
import NewPacient from "../pages/NewPacient";
import { collection, onSnapshot } from "firebase/firestore";
import { pacientsActions } from "../store/states/pacients";

const Router = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      onSnapshot(collection(firestore, "pacientes"), (snapshot) => {
        let pacientsArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(pacientsArray)
        dispatch(
          pacientsActions.fetchPacients(pacientsArray)
        );
      });
    }
  }, [auth, user]);

  const layout = !user ? <AuthLayout /> : <AdminLayout />;

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          {!user ? (
            <Route element={<AuthLayout />}>
              <Route path="/" index element={<Login />} />
              <Route path="/*" element={<Login />} />
            </Route>
          ) : (
            <Route element={<AdminLayout />}>
              <Route path="/" index element={<AdministrarPacientes />} />
              <Route path="/newPacient" element={<NewPacient />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
      <Loader />
    </Suspense>
  );
};

export default Router;
