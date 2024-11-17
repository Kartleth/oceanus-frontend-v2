// src/App.tsx
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Contratos from "./pages/contratos-page/Contratos";
import Empresas from "./pages/empresas-page/Empresas";
import Facturas from "./pages/facturas-page/Facturas";
import Terceros from "./pages/terceros-page/Terceros";
import Cotizaciones from "./pages/cotizaciones-page/Cotizaciones";
import Login from "./pages/login-page/Login";
import { Page_personal } from "./pages/personal-page/personal-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page_personal />} />
        <Route path="/personal" element={<Page_personal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/personal_terceros" element={<Terceros />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
