import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Suspense, Lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import AppointmentsAdmin from "../pages/AppointmentsAdmin";
import { appointmentsActions } from "../store/states/appointments";

const Router = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const month = useSelector((state) => state.appointments.month);
  const place = useSelector((state) => state.appointments.place);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      onSnapshot(collection(firestore, "pacientes"), (snapshot) => {
        let pacientsArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(pacientsArray);
        dispatch(pacientsActions.fetchPacients(pacientsArray));
      });

      onSnapshot(collection(firestore, `${place}/turnos/${month}`), snapshot => {
        let turnosArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }))
        console.log(turnosArray);
        dispatch(appointmentsActions.firstEnteredData(turnosArray))
      });
    }
  }, [auth, user]);

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
              <Route
                path="/appointmentsAdmin"
                element={<AppointmentsAdmin />}
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
      <Loader />
    </Suspense>
  );
};

export default Router;
