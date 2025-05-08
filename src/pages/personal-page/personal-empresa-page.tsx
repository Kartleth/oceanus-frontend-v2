import { DataTablePersonalEmpresa } from "@/components/data-tables/data-table-personal-empresa";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CirclePlus, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function PagePersonalEmpresa() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/empresas">Empresas</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/personal-empresa`}>
                Personal de empresa
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button className="bg-deepSea hover:bg-deepLightSea" asChild={true}>
          <Link to="/agregar-trabajador">
            <CirclePlus />
            Agregar trabajador
          </Link>
        </Button>
      </div>

      <div className="px-3">
        <DataTablePersonalEmpresa></DataTablePersonalEmpresa>
      </div>
    </Layout>
  );
}
