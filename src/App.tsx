// src/App.tsx
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contratos from "./pages/contratos-page/Contratos";
import Empresas from "./pages/empresas-page/Empresas";
import Facturas from "./pages/facturas-page/Facturas";
import Terceros from "./pages/terceros-page/Terceros";
import Cotizaciones from "./pages/cotizaciones-page/Cotizaciones";
import { Page_personal } from "./pages/personal-page/personal-page";
import { LoginForm } from "./components/login-form";
import { VerDetallesPersonal } from "./pages/ver-detalles-personal-page/Ver-detalles-personal";
import VerReportePersonal from "./pages/ver-reporte-personal-page/Ver-reporte-personal";
import { PageAgregarTrabajador } from "./pages/agregar-trabajador-page/agregar-trabajador-page";
import { PageGenerarCredencial } from "./pages/generar-credencial-page/generar-credencial-page";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginForm />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Page_personal />} />
            <Route path="/personal" element={<Page_personal />} />
            <Route path="/contratos" element={<Contratos />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/facturas" element={<Facturas />} />
            <Route path="/personal_terceros" element={<Terceros />} />
            <Route path="/cotizaciones" element={<Cotizaciones />} />
            <Route
              path="/agregar-trabajador"
              element={<PageAgregarTrabajador />}
            />
            <Route
              path="/agregar-trabajador"
              element={<PageAgregarTrabajador />}
            />
            <Route
              path="/generar-credencial/:id"
              element={<PageGenerarCredencial />}
            />
            <Route
              path="/detalles-trabajador/:id"
              element={<VerDetallesPersonal />}
            />
            <Route
              path="/reporte-de-empleado/:id"
              element={<VerReportePersonal />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
