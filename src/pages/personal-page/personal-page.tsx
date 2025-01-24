import { DataTableDemo } from "@/components/data-tables/data-table-personal";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CirclePlus, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function Page_personal() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/personal">Personal</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button
          className="bg-deepSea hover:bg-deepLightSea"
         asChild={true}>
          {/* Este se debe de poner entre llaves, es un boolean por ende se debe confirmar como true o false, se puede dejar asi, pero no lo hagas. */}
          <Link to="/agregar-trabajador">
            <CirclePlus />
            Agregar trabajador
          </Link>
        </Button>
        <Button className="bg-deepSea hover:bg-deepLightSea">
          <Upload /> Subir Excel
        </Button>
      </div>

      <div className="px-3">
        <DataTableDemo></DataTableDemo>
      </div>
    </Layout>
  );
}
