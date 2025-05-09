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
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { DataTableFianzaAnticipo } from "@/components/data-tables/data-table-fianza-anticipo";

export default function FianzaAnticipo() {
  const { idcontrato } = useParams<{ idcontrato: string }>();
  const { search } = useLocation();
  const fromDetails = new URLSearchParams(search).get("from") === "details";

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-gray-50 p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/contratos">Contratos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            {fromDetails && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/detalles-contratos/${idcontrato}`}>
                      Detalles
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/contratos/${idcontrato}/fianza-anticipo`}>
                  Fianzas de Anticipo
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:p-6">
        <div>
          <h1 className="text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Fianzas de Anticipo
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            ID del contrato: {idcontrato}
          </p>
        </div>

        <Button className="bg-deepSea hover:bg-deepLightSea gap-2" asChild>
          <Link
            to={`/contratos/${idcontrato}/fianza-anticipo/agregar-fianza-anticipo${
              fromDetails ? "?from=details" : ""
            }`}
          >
            <CirclePlus className="h-4 w-4" />
            Agregar Fianza de Anticipo
          </Link>
        </Button>
      </div>

      <div className="px-4 pb-4">
        <DataTableFianzaAnticipo contratoId={idcontrato ?? ""} />
      </div>
    </Layout>
  );
}
