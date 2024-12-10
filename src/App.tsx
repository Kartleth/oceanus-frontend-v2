// src/App.tsx
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Contratos from "./pages/contratos-page/Contratos";
import Empresas from "./pages/empresas-page/Empresas";
import Facturas from "./pages/facturas-page/Facturas";
import Terceros from "./pages/terceros-page/Terceros";
import Cotizaciones from "./pages/cotizaciones-page/Cotizaciones";
import { Page_personal } from "./pages/personal-page/personal-page";
import { LoginForm } from "./components/login-form";
import { VerDetallesPersonal } from "./pages/ver-detalles-personal-page/Ver-detalles-personal";
import VerReportePersonal from "./pages/ver-reporte-personal-page/Ver-reporte-personal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page_personal />} />
        <Route path="/personal" element={<Page_personal />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/facturas" element={<Facturas />} />
        <Route path="/personal_terceros" element={<Terceros />} />
        <Route path="/cotizaciones" element={<Cotizaciones />} />
        <Route path="/detalles-trabajador/:id" element={<VerDetallesPersonal />} />
        <Route path="/reporte-de-empleado/:id" element={<VerReportePersonal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
