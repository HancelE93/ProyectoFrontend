import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Proyectos from "./pages/Proyectos";
import CrearProyecto from "./pages/CrearProyecto";
import "./App.css";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLICA */}
        <Route path="/" element={<Login />} />

        {/* PROTEGIDAS */}
        <Route path="/proyectos" element={
          <ProtectedRoute>
            <Proyectos />
          </ProtectedRoute>
        } />

        <Route path="/crear-proyecto" element={
          <ProtectedRoute>
            <CrearProyecto />
          </ProtectedRoute>
        } />

      </Routes>

    </BrowserRouter>
  );
}

export default App;