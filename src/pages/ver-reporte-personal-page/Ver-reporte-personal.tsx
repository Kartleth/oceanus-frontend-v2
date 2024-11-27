import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/layout";
import { Slash } from "lucide-react";

export default function VerReportePersonal() {
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

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Reporte de empleado
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    </Layout>
  );
}
