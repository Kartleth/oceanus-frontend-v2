// src/App.tsx
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Contratos from "./pages/contratos-page/Contratos";
import Empresas from "./pages/empresas-page/Empresas";
import Facturas from "./pages/facturas-page/Facturas";
import Terceros from "./pages/terceros-page/Terceros";
import Cotizaciones from "./pages/cotizaciones-page/Cotizaciones";
import { Page_personal } from "./pages/personal-page/personal-page";
import { LoginForm } from "./components/login-form";
import { VerDetallesPersonal } from "./pages/ver-detalles-personal/Ver-detalles-personal";

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
        <Route path="/detalles-trabajador" element={<VerDetallesPersonal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
