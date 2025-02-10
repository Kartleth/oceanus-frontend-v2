import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/Layout";
import { Button } from "@/components/ui/button";
import { CirclePlus, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTableContratos } from "@/components/data-tables/data-table-contratos";

export default function Convenio() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-gray-50 p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contratos">Convenio</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button className="bg-deepSea hover:bg-deepLightSea" asChild={true}>
          {/* Este se debe de poner entre llaves, es un boolean por ende se debe confirmar como true o false, se puede dejar asi, pero no lo hagas. */}
          <Link to="/agregar-contratos">
            <CirclePlus />
            Agregar Convenio
          </Link>
        </Button>
        <Button className="bg-deepSea hover:bg-deepLightSea">
          <Upload /> Subir Excel
        </Button>
      </div>
      <div className="px-3"></div>
      <div className="px-3">
        <DataTableContratos></DataTableContratos>
      </div>
    </Layout>
  );
}
