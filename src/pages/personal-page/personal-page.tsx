import { DataTableDemo } from "@/components/data-table-personal";
import Layout from "@/components/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CirclePlus, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function Page_personal() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Personal
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button asChild={true}>
          {/* Este se debe de poner entre llaves, es un boolean por ende se debe confirmar como true o false, se puede dejar asi, pero no lo hagas. */}
          <Link to="/agregar-trabajador">
            <CirclePlus />
            Agregar trabajador
          </Link>
        </Button>
        <Button>
          <Upload /> Subir Excel
        </Button>
      </div>

      <div className="px-3">
        <DataTableDemo></DataTableDemo>
      </div>
    </Layout>
  );
}
