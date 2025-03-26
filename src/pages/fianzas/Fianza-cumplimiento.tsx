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
import { Link, useParams } from "react-router-dom";
import { DataTableFianzaAnticipo } from "@/components/data-tables/data-table-fianza-anticipo";
import { DataTableFianzaCumplimiento } from "@/components/data-tables/data-table-fianza-cumplimineto";

export default function FianzaCumplimiento() {
  const { idcontrato } = useParams<{ idcontrato: string }>();
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-gray-50 p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contratos">Contratos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/contratos/${idcontrato}/fianza-cumplimiento`}
              >
                Fianzas de Cumplimiento de contrato {idcontrato}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex items-center">
        <div className="container flex flex-col items-start gap-1 py-4 px-5 md:py-6 lg:py-8 sm:-mb-2">
          <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Fianzas de Cumplimiento
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            ID del contrato: {idcontrato}
          </p>
        </div>

        <div className="px-3 w-full flex justify-end gap-2 ">
          <Button className="bg-deepSea hover:bg-deepLightSea" asChild={true}>
            <Link
              to={`/contratos/${idcontrato}/fianza-cumplimiento/agregar-fianza-cumplimiento`}
            >
              <CirclePlus />
              Agregar Fianza de cumplimiento
            </Link>
          </Button>
        </div>
      </div>

      <div className="px-3"></div>
      <div className="px-3">
        <DataTableFianzaCumplimiento
          contratoId={idcontrato ?? ""}
        ></DataTableFianzaCumplimiento>
      </div>
    </Layout>
  );
}
