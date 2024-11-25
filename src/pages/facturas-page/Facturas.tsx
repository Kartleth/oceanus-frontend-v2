import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/layout";
import { DataTableEmpresas } from "@/components/data-table-empresas";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { DataTableFacturas } from "@/components/data-table-facturas";

export default function Facturas() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-gray-50 p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />{" "}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl text-deepSea">
                Facturas
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button className="bg-deepSea hover:bg-deepLightSea">
          <CirclePlus />
          Agregar factura
        </Button>
      </div>
      <div className="px-3">
        <DataTableFacturas></DataTableFacturas>
      </div>
    </Layout>
  );
}
