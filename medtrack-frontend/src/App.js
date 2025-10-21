import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

// Stranice
import Home from "./pages/Home";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import Encounters from "./pages/Encounters";
import Vitals from "./pages/Vitals";
import ReportsDaily from "./pages/ReportsDaily";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Javne rute */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Zaštićene rute */}
        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:id"
          element={
            <ProtectedRoute>
              <PatientDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients/:id/encounters"
          element={
            <ProtectedRoute>
              <Encounters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/encounters/:id/vitals"
          element={
            <ProtectedRoute>
              <Vitals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/daily"
          element={
            <ProtectedRoute>
              <ReportsDaily />
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