// src/App.tsx
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contratos from "./pages/contratos-page/Contratos";
import Clientes from "./pages/clientes-page/Clientes";
import Facturas from "./pages/facturas-page/Facturas";
import Terceros from "./pages/terceros-page/Terceros";
import Cotizaciones from "./pages/cotizaciones-page/Cotizaciones";
import { Page_personal } from "./pages/personal-page/personal-page";
import { LoginForm } from "./components/login-form";
import { VerDetallesPersonal } from "./pages/ver-detalles/Ver-detalles-personal";
import VerReportePersonal from "./pages/ver-reporte/Ver-reporte-personal";
import { PageAgregarTrabajador } from "./pages/agregar-pages/agregar-trabajador-page";
import { PageGenerarCredencial } from "./pages/generar-credencial-page/generar-credencial-page";
import { PageEditarTrabajador } from "./pages/editar-pages/editar-trabajador";
import { VerDetallesContratos } from "./pages/ver-detalles/Ver-detalles-contratos-page";
import { PageAgregarContratos } from "./pages/agregar-pages/agregar-contratos-page";
import { PageEditarContratos } from "./pages/editar-pages/editar-contratos";
import PrivateRoute from "./components/PrivateRoute";
import SubirArchivos from "./pages/subir-archivos-page/subir-archivos";
import { VerDetallesCotizacion } from "./pages/ver-detalles/Ver-detalles-cotizacion";
import SubirArchivosCotizacion from "./pages/subir-archivos-page/subir-archivos-cotizacion";
import { PageAgregarCotizacion } from "./pages/agregar-pages/agregar-cotizacion-page";
import { VerDetallesTerceros } from "./pages/ver-detalles/Ver-detalles-terceros";
import SubirArchivosTerceros from "./pages/subir-archivos-page/subir-archivos-terceros";
import { VerDetallesCliente } from "./pages/ver-detalles/ver-detalles-cliente";
import { PageAgregarTercero } from "./pages/agregar-pages/agregar-tercero-page";
import { PageAgregarCliente } from "./pages/agregar-pages/agregar-empresa-page";
import { PageEditarTercero } from "./pages/editar-pages/editar-tercero";
import { PageEditarCliente } from "./pages/editar-pages/editar-cliente";
import { PagePersonalEmpresa } from "./pages/personal-page/personal-empresa-page";
import Convenio from "./pages/convenio-page/Convenio";
import { PageAgregarConvenio } from "./pages/agregar-pages/agregar-convenio-page";
import FianzaAnticipo from "./pages/fianzas/Fianza-anticipo";
import { VerDetallesFianzaAnticipo } from "./pages/ver-detalles/fianzas/ver-detalles-fianza-anticipo";
import { PageAgregarFianzaAnticipo } from "./pages/agregar-pages/agregar-fianzas/agregar-fianza-anticipo-page";
import FianzaCumplimiento from "./pages/fianzas/Fianza-cumplimiento";
import FianzaViciosOcultos from "./pages/fianzas/Fianza-vicios-ocultos";
import { VerDetallesFianzaCumplimiento } from "./pages/ver-detalles/fianzas/ver-detalles-fianza-cumplimiento";
import { PageEditarFianzaAnticipo } from "./pages/editar-pages/editar-fianzas/editar-fianza-anticipo";
import { PageAgregarFianzaCumplimiento } from "./pages/agregar-pages/agregar-fianzas/agregar-fianza-cumplimiento";
import { PageEditarFianzaCumplimiento } from "./pages/editar-pages/editar-fianzas/editar-fianza-cumplimiento";
import { VerDetallesFianzaViciosOcultos } from "./pages/ver-detalles/fianzas/ver-detalles-fianza-vicios-ocultos";
import { PageAgregarFianzaViciosOcultos } from "./pages/agregar-pages/agregar-fianzas/agregar-fianza-vicios-ocultos";
import { PageEditarFianzaViciosOcultos } from "./pages/editar-pages/editar-fianzas/editar-fianza-vicios-ocultos";

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
            <Route path="/convenio" element={<Convenio />} />
            <Route path="/personal_terceros" element={<Terceros />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route
              path="/contratos/:idcontrato/convenio"
              element={<Convenio />}
            />
            <Route path="/facturas" element={<Facturas />} />
            <Route
              path="/contratos/:idcontrato/personal_terceros"
              element={<Terceros />}
            />
            <Route path="/cotizaciones" element={<Cotizaciones />} />
            <Route
              path="/detalles-contratos/:idcontrato"
              element={<VerDetallesContratos />}
            />
            <Route
              path="/agregar-contratos"
              element={<PageAgregarContratos />}
            />
            <Route
              path="/contratos/:idcontrato/convenio/agregar-convenio"
              element={<PageAgregarConvenio />}
            />

            {/* Rutas de fianzas - Versión optimizada */}
            <Route
              path="/contratos/:idcontrato/fianza-anticipo"
              element={<FianzaAnticipo />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-cumplimiento"
              element={<FianzaCumplimiento />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-vicios-ocultos"
              element={<FianzaViciosOcultos />}
            />

            {/* Detalles de fianzas */}
            <Route
              path="/contratos/:idcontrato/fianza-anticipo/detalles/:idFianzaAnticipo"
              element={<VerDetallesFianzaAnticipo />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-cumplimiento/detalles/:idFianzaCumplimiento"
              element={<VerDetallesFianzaCumplimiento />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-vicios-ocultos/detalles/:idFianzaViciosO"
              element={<VerDetallesFianzaViciosOcultos />}
            />

            {/* Agregar fianzas */}
            <Route
              path="/contratos/:idcontrato/fianza-anticipo/agregar-fianza-anticipo"
              element={<PageAgregarFianzaAnticipo />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-cumplimiento/agregar-fianza-cumplimiento"
              element={<PageAgregarFianzaCumplimiento />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-vicios-ocultos/agregar-fianza-vicios-ocultos"
              element={<PageAgregarFianzaViciosOcultos />}
            />

            {/* Editar fianzas */}
            <Route
              path="/contratos/:idcontrato/fianza-anticipo/editar-fianza-anticipo/:idFianzaAnticipo"
              element={<PageEditarFianzaAnticipo />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-cumplimiento/editar-fianza-cumplimiento/:idFianzaCumplimiento"
              element={<PageEditarFianzaCumplimiento />}
            />
            <Route
              path="/contratos/:idcontrato/fianza-vicios-ocultos/editar-fianza-vicios-ocultos/:idFianzaViciosO"
              element={<PageEditarFianzaViciosOcultos />}
            />
            {/* Fin de rutas de fianzas */}

            <Route
              path="contratos/:idcontrato/personal_terceros/agregar-tercero"
              element={<PageAgregarTercero />}
            />
            <Route
              path="/agregar-trabajador"
              element={<PageAgregarTrabajador />}
            />
            <Route
              path="/editar-trabajador/:id"
              element={<PageEditarTrabajador />}
            />
            <Route
              path="/editar-contratos/:id"
              element={<PageEditarContratos />}
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
            <Route path="/subir-archivos/:id" element={<SubirArchivos />} />

            {/* Rutas para cotizacion */}
            <Route
              path="/detalles-cotizacion"
              element={<VerDetallesCotizacion />}
            />
            <Route
              path="/subir-archivos-cotizacion"
              element={<SubirArchivosCotizacion />}
            />
            <Route
              path="/agregar-cotizacion"
              element={<PageAgregarCotizacion />}
            />
            {/* Rutas para terceros */}
            <Route
              path="/detalles-terceros/:id"
              element={<VerDetallesTerceros />}
            />
            <Route
              path="/subir-archivos-tercero/:id"
              element={<SubirArchivosTerceros />}
            />
            <Route path="/editar-tercero/:id" element={<PageEditarTercero />} />
            {/* Rutas para clientes */}
            <Route
              path="/detalles-cliente/:id"
              element={<VerDetallesCliente />}
            />
            <Route path="/agregar-cliente" element={<PageAgregarCliente />} />
            <Route path="/editar-cliente/:id" element={<PageEditarCliente />} />
            <Route path="/personal-cliente" element={<PagePersonalEmpresa />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
