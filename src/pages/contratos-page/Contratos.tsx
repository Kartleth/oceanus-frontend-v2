import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/layout";
import { DataTableContratos } from "@/components/data-table-contratos";
import { Button } from "@/components/ui/button";
import { CirclePlus, Upload } from "lucide-react";

export default function Contratos() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Contratos
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button>
          <CirclePlus />
          Agregar contrato
        </Button>
        <Button>
          <Upload /> Subir Excel
        </Button>
      </div>
      <div className="px-3">
        <DataTableContratos></DataTableContratos>
      </div>
    </Layout>
  );
}