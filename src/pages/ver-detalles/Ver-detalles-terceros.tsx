import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BriefcaseBusiness } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "react-query";
import { Subcontratado } from "@/modelos/subcontratado";

export function VerDetallesTerceros() {
  const { id } = useParams();
  const fetchSubcontratado = async (): Promise<Subcontratado> => {
    const response = await axios.get(
      `http://localhost:3001/subcontratados/${id}`
    );
    return response.data;
  };
  const {
    data: subcontratado,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Subcontratado>(["subcontratado", id], fetchSubcontratado);

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/personal_terceros">
                Personal de terceros
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/detalles-terceros/${id}`}>
                Ver detalles de tercero
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex items-center">
        {isLoading ? (
          <div className="flex items-center space-x-4 w-full p-6">
            <div className="w-full h-20 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <>
            <div className="px-5 container flex flex-col items-start gap-1 py-4 md:py-6 lg:py-8 sm:-mb-2">
              <h1 className="text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                Detalles
              </h1>
              <p className="max-w-2xl text-lg font-light text-foreground">
                ID: {subcontratado?.idsubcontratado}, {subcontratado?.nombre}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 text-gray-600">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4 -mt-4">
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseBusiness className="w-6 h-6" />
              <h2 className="font-medium text-xl tracking-tighter">
                Datos de Subcontratado
              </h2>
            </div>

            <hr className="pb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  id
                </Label>
                {/* Skeleton Loader */}
                {!subcontratado ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={subcontratado?.idsubcontratado || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Nombre
                </Label>
                {/* Skeleton Loader */}
                {!subcontratado ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={subcontratado?.nombre || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  RFC
                </Label>
                {/* Skeleton Loader */}
                {!subcontratado ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={subcontratado.rfc || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  NSS
                </Label>
                {/* Skeleton Loader */}
                {!subcontratado ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={subcontratado?.nss || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  INE
                </Label>
                {/* Skeleton Loader */}
                {!subcontratado ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={subcontratado?.ine || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  CURP
                </Label>
                {/* Skeleton Loader */}
                {!subcontratado ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={subcontratado?.curp || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Estado
                </Label>
                {/* Skeleton Loader */}
                {!subcontratado ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={subcontratado?.estado || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
