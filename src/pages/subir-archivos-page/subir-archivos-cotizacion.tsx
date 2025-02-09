import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Persona } from "@/modelos/personal";
import axios from "axios";
import { DataTableArchivosCotizaciones } from "@/components/data-table-archivos/data-table-archivos-cotizaciones";

export default function SubirArchivosCotizacion() {
  const { id } = useParams();
  const fetchEmpleado = async (): Promise<Persona> => {
    const response = await axios.get(`http://localhost:3001/personas/${id}`);
    return response.data;
  };
  const {
    data: empleado,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Persona>(["empleado", id], fetchEmpleado);

  const cotizacion = {
    iddocsubc: 1,
    subcontratado: {
      nombre: "Constructora XYZ",
      contrato: "Contrato de Servicios",
    },
    rfc: "ABC123456789",
    inss: "1234567890",
    ine: "INE123456",
    curp: "CURP123456",
    foto: "foto-url.jpg",
  };


  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/cotizaciones">Cotizaciones</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/subir-archivos-cotizacion`}>
                Gestionar archivos
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container flex flex-col items-start gap-1 py-4 md:py-6 lg:py-8 px-6 sm:-mb-2">
        <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
          Archivos
        </h1>
        <p className="max-w-2xl text-lg font-light text-foreground">
          ID: {cotizacion?.iddocsubc}, {cotizacion?.subcontratado.nombre}
        </p>
      </div>

      <div className="px-6">
        <hr />
      </div>

      <div className="px-6">
        <DataTableArchivosCotizaciones personaId={empleado?.id ?? 0}></DataTableArchivosCotizaciones>
      </div>
    </Layout>
  );
}
