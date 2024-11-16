// src/App.tsx
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Personal from "./pages/Personal";
import Contratos from "./pages/Contratos"
import Empresas from "./pages/Empresas";
import Facturas from "./pages/Facturas";
import Terceros from "./pages/Terceros";
import Cotizaciones from "./pages/Cotizaciones";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Personal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/terceros" element={<Terceros />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
