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
import { Link, useParams } from "react-router-dom";
import { DataTableFianzaAnticipo } from "@/components/data-tables/data-table-fianza-anticipo";

export default function FianzaAnticipo() {
  const { idcontrato } = useParams();
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
              <BreadcrumbLink href={`/contratos/${idcontrato}/fianza-anticipo`}>
                Fianza de Anticipo
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button className="bg-deepSea hover:bg-deepLightSea" asChild={true}>
          <Link to="/agregar-contratos">
            <CirclePlus />
            Agregar F. de Anticipo
          </Link>
        </Button>
        <Button className="bg-deepSea hover:bg-deepLightSea">
          <Upload /> Subir Excel
        </Button>
      </div>
      <div className="px-3"></div>
      <div className="px-3">
        <DataTableFianzaAnticipo></DataTableFianzaAnticipo>
      </div>
    </Layout>
  );
}
