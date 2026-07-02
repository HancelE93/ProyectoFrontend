import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Proyectos from "./pages/Proyectos";
import CrearProyecto from "./pages/CrearProyecto";

import Navbar from "./components/Navbar";

function App() {

  return (
    <BrowserRouter>

      {/* Navbar aparece en toda la app */}
      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/crear-proyecto" element={<CrearProyecto />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;