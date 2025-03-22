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
import { Fianza } from "@/modelos/fianza";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export function VerDetallesFianzaAnticipo() {
  const { id } = useParams();
  const fetchFianzaAnticipo = async (): Promise<Fianza> => {
    const response = await axios.get(
      `http://localhost:3001/fianza/contrato/${id}/fianza-anticipo`
    );
    return response.data;
  };
  const {
    data: fianzaAnticipo,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Fianza>(["fianzaAnticipo", id], fetchFianzaAnticipo);

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contratos">
                Contratos
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/contratos/${id}/fianza-anticipo`}>
                Fianzas de Anticipo de contrato {id}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/detalles-fianza-anticipo">
                Detalles de fianza
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
            <Avatar className="p-4">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    fianzaAnticipo?.idfianza ?? "Fianza"
                )}&background=C4EEF8`}
                alt="Avatar"
                className="w-64 rounded-full p-2"
              />
            </Avatar>

            <div className="container flex flex-col items-start gap-1 py-4 md:py-6 lg:py-8 sm:-mb-2">
              <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                Detalles de fianza de anticipo
              </h1>
              <p className="max-w-2xl text-lg font-light text-foreground">
                ID: {fianzaAnticipo?.idfianza ?? "No disponible"} , {fianzaAnticipo?.tipo  ?? "No disponible"}
              </p>
            </div>

            <div className="px-3 w-full flex justify-end gap-2"></div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 text-gray-600">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4 -mt-4">
            <div className="flex items-center gap-2 mb-4">
              <BriefcaseBusiness className="w-6 h-6" />
              <h2 className="font-medium text-xl tracking-tighter">
                Datos de fianza de anticipo
              </h2>
            </div>

            <hr className="pb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  id
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo?.idfianza || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo?.tipo || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo de cambio
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo.tipodecambio || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Inicio
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo?.inicio || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fin
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo?.fin || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Poliza
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo?.poliza || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Aseguradora
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo?.aseguradora || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Monto
                </Label>
                {/* Skeleton Loader */}
                {!fianzaAnticipo ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={fianzaAnticipo?.monto || "No disponible"}
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
