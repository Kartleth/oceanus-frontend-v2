import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "react-query";
import { Fianza } from "@/modelos/datosFianza";

export function VerDetallesFianzaAnticipo() {
  const { idcontrato, idFianzaAnticipo } = useParams<{
    idcontrato: string;
    idFianzaAnticipo: string;
  }>();

  const { search } = useLocation();
  const fromDetails = new URLSearchParams(search).get("from") === "details";

  console.log("ID del contrato:", idcontrato);
  console.log("ID de la fianza:", idFianzaAnticipo);

  const fetchFianzaAnticipo = async (): Promise<Fianza> => {
    const response = await axios.get(
      `http://localhost:3001/fianza/contrato/${idcontrato}/fianza-anticipo/${idFianzaAnticipo}`
    );
    return response.data;
  };
  const {
    data: fianzaAnticipo,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Fianza>(
    ["fianzaAnticipo", idcontrato, idFianzaAnticipo],
    fetchFianzaAnticipo
  );

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contratos">Contratos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            {fromDetails ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/detalles-contratos/${idcontrato}`}>Detalles</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={`/contratos/${idcontrato}/fianza-anticipo?from=details`}>
                      Fianzas de Anticipo de contrato {idcontrato}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/contratos/${idcontrato}/fianza-anticipo`}>
                    Fianzas de Anticipo de contrato {idcontrato}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Detalles de fianza</BreadcrumbPage>
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
            <div className="ml-6 container flex flex-col items-start gap-1 py-4 md:py-6 lg:py-8 sm:-mb-2">
              <h1 className=" text-gray-600 text-xl font-bold leading-tight tracking-tighter xl:text-4xl md:text-3xl lg:leading-[1.1]">
                Detalles de fianza de anticipo
              </h1>
              <p className="max-w-2xl lg:text-lg font-light text-foreground">
                ID de fianza: {fianzaAnticipo?.idfianza ?? "No disponible"} , ID
                de contrato: {idcontrato ?? "No disponible"}
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
              <CreditCard className="w-6 h-6" />
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
