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
import axios from "axios";
import { Subcontratado } from "@/modelos/subcontratado";
import { DataTableArchivosTerceros } from "@/components/data-table-archivos-terceros";

export default function SubirArchivosTerceros() {
  const { id } = useParams();
  const fetchSubcontratado = async (): Promise<Subcontratado> => {
    const response = await axios.get(
      `http://localhost:3001/subcontratados/${id}`
    );
    return response.data;
  };
  const {
    data: subcontratado,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Subcontratado>(["subcontratado", id], fetchSubcontratado);
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink href="/personal_terceros">
              Personal de terceros
            </BreadcrumbLink>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/subir-archivos-tercero/:id`}>
                Gestionar archivos de tercero
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
          ID: {subcontratado?.idsubcontratado}, {subcontratado?.nombre}
        </p>
      </div>

      <div className="px-6">
        <hr />
      </div>

      <div className="px-6">
        <DataTableArchivosTerceros subcontratadoId={subcontratado?.idsubcontratado ?? 0}></DataTableArchivosTerceros>
      </div>
    </Layout>
  );
}
