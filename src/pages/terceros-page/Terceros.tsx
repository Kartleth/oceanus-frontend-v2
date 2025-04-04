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
                <BreadcrumbLink href="/personal_terceros">
                  Personal de terceros
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
      </div>
      <div className="py-6 px-3 space-x-2 flex justify-end">
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
        <DataTableTerceros></DataTableTerceros>
      </div>
    </Layout>
  );
}
