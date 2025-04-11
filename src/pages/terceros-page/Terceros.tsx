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
import { DataTableTerceros } from "@/components/data-tables/data-table-terceros";

export default function Terceros() {
  const { idcontrato: idContrato } = useParams();
  return (
    <Layout>
      <div>
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
                  href={`/contratos/${idContrato}/personal_terceros`}
                >
                  Personal de terceros {idContrato}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      </div>
      <div className="py-6 px-3 space-x-2 flex justify-end">
        <div className="container flex flex-col items-start gap-1 py-4 px-5 md:py-6 lg:py-8 sm:-mb-2">
          <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Subcontrato
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            ID del contrato: {idContrato}
          </p>
        </div>
        <Button className="bg-deepSea hover:bg-deepLightSea flex items-center space-x-2">
          <Link
            to={`/contratos/${idContrato}/personal_terceros/agregar-tercero`}
            className="flex items-center space-x-2"
          >
            <CirclePlus className="w-5 h-5" />
            <span>Agregar tercero</span>
          </Link>
        </Button>
      </div>
      <div className="px-3">
        <DataTableTerceros idcontrato={Number(idContrato)}></DataTableTerceros>
      </div>
    </Layout>
  );
}
