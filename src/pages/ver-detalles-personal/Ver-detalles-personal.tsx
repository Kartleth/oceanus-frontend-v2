import { DataTableDemo } from "@/components/data-table-personal";
import Layout from "@/components/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CirclePlus, Link, Slash, Upload } from "lucide-react";

export function VerDetallesPersonal() {
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

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Detalles
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-6 space-x-2 flex-col">
        <h1 className="text-2xl font-medium justify-start">
          Nombre del trabajador
        </h1>
      </div>

    </Layout>
  );
}
