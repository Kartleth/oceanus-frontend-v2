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
import { CirclePlus, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTableConvenio } from "@/components/data-tables/data-table-convenio";
import { useParams } from "react-router-dom";

export default function Convenio() {
  const { idcontrato: idContrato } = useParams();
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
              <BreadcrumbLink href={`/contratos/${idContrato}/convenio`}>
                Convenio {idContrato}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <div className="container flex flex-col items-start gap-1 py-4 px-5 md:py-6 lg:py-8 sm:-mb-2">
          <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Convenio
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            ID del contrato: {idContrato}
          </p>
        </div>
        <Button className="bg-deepSea hover:bg-deepLightSea" asChild={true}>
          <Link to={`/contratos/${idContrato}/convenio/agregar-convenio`}>
            <CirclePlus />
            Agregar Convenio
          </Link>
        </Button>
      </div>
      <div className="px-3"></div>
      <div className="px-3">
        <DataTableConvenio idcontrato={Number(idContrato)}></DataTableConvenio>
      </div>
    </Layout>
  );
}
