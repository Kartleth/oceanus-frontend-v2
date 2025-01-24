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
import { PageEditarTrabajador } from "./pages/editar-trabajador/editar-trabajador";
import { VerDetallesContratos } from "./pages/ver-detalles-contratos-page/Ver-detalles-contratos-page";
import { PageAgregarContratos } from "./pages/agregar-contratos-page/agregar-contartos-page";
import { PageEditarContratos } from "./pages/editar-contratos/editar-contratos";
import PrivateRoute from "./components/PrivateRoute";
import SubirArchivos from "./pages/subir-archivos-page/subir-archivos";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<LoginForm />} />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Page_personal />} />
            <Route path="/personal" element={<Page_personal />} />
            <Route path="/contratos" element={<Contratos />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/facturas" element={<Facturas />} />
            <Route path="/personal_terceros" element={<Terceros />} />
            <Route path="/cotizaciones" element={<Cotizaciones />} />
            <Route
              path="/detalles-contratos"
              element={<VerDetallesContratos />}
            />
            <Route path="/agregar-contratos" element={<PageAgregarContratos />} />
          <Route
              path="/agregar-trabajador"
              element={<PageAgregarTrabajador />}
            />
            <Route
            path="/editar-trabajador/:id"
            element={<PageEditarTrabajador />}
          />
          <Route path="/editar-contratos" element={<PageEditarContratos />} />
          <Route
              path="/generar-credencial/:id"
              element={<PageGenerarCredencial />}
            />
            <Route
              path="/detalles-trabajador/:id"
              element={<VerDetallesPersonal />}
            />
            {/* <Route
            path="/detalles-contratos/:id"
            element={<VerDetallesContratos />}
          /> */}
          <Route
              path="/reporte-de-empleado/:id"
              element={<VerReportePersonal />}
            />
            <Route path="/subir-archivos/:id" element={<SubirArchivos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
