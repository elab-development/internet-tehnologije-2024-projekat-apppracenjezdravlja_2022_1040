import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { getRole } from "./auth";
import EditMyChart from "./pages/EditMyChart";


// Stranice
import Home from "./pages/Home";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Encounters from "./pages/Encounters";
import Vitals from "./pages/Vitals";
import CreateMyChart from "./pages/CreateMyChart";

import ReportsDaily from "./pages/ReportsDaily";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";

// Guard: samo doktor
function RequireDoctor({ children }) {
  return getRole() === "doctor" ? children : <Navigate to="/" replace />;
}
function RequirePatient({ children }) {
  return getRole() === "patient" ? children : <Navigate to="/" replace />;
}



function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Javne rute */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Zaštićene rute (ulogovani korisnici) */}
        {/* LISTA PACIJENATA — samo doktor */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <RequireDoctor>
                <Patients />
              </RequireDoctor>
            </ProtectedRoute>
          }
        />

        {/* DETALJ PACIJENTA — ulogovani (doktor/pacijent); backend proverava vlasništvo */}
        <Route
          path="/patients/:id"
          element={
            <ProtectedRoute>
              <PatientDetails />
            </ProtectedRoute>
          }
        />

        {/* posete — ulogovani */}
        <Route
          path="/patients/:id/encounters"
          element={
            <ProtectedRoute>
              <Encounters />
            </ProtectedRoute>
          }
        />

        {/* VITALs — ulogovani */}
        <Route
          path="/encounters/:id/vitals"
          element={
            <ProtectedRoute>
              <Vitals />
            </ProtectedRoute>
          }
        />

        {/* REPORTS  */}
        
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <RequireDoctor>
                <ReportsDaily />
              </RequireDoctor>
            </ProtectedRoute>
          }
        />

          <Route
  path="/me/create-chart"
  element={
    <ProtectedRoute>
      <RequirePatient>
        <CreateMyChart />
      </RequirePatient>
    </ProtectedRoute>
  }
/>


<Route
  path="/me/edit-chart"
  element={
    <ProtectedRoute>
      <RequirePatient>
        <EditMyChart />
      </RequirePatient>
    </ProtectedRoute>
  }
/>


        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;