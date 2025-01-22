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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  FileUser,
  HandCoins,
  Handshake,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "react-query";
import { Persona } from "@/modelos/personal";

export function VerDetallesTerceros() {
  const { id } = useParams();
  const fetchEmpleado = async (): Promise<Persona> => {
    const response = await axios.get(`http://localhost:3001/personas/${id}`);
    return response.data;
  };
  const {
    data: empleado,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Persona>(["empleado", id], fetchEmpleado);

  const cotizacion = {
    id: 1,
    titulo: "Proyecto de Construcción",
    nombreDelContrato: "Construcción de Edificio Central",
    contratante: "Gobierno Municipal",
    contratado: "Constructora XYZ",
    tipoDeContrato: "Licitación Pública",
    numeroDeContrato: "12345-ABC",
    inicioContrato: "2025-01-01",
    finContrato: "2026-12-31",
    montoContrato: 5000000,
    anticipoContrato: 1000000,
    subContratos: [
      { nombre: "Subcontrato 1", monto: 200000 },
      { nombre: "Subcontrato 2", monto: 300000 },
    ],
    seleccionar: false,
    direccion: "Av. Principal #123, Ciudad",
  };

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/personal_terceros">Personal de terceros</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/detalles-terceros`}>
                Nombre de tercero
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
                ID: {cotizacion.id}, {cotizacion.titulo}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 text-gray-600">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4 -mt-4">
            <div className="flex items-center gap-2 mb-4">
              <HandCoins className="w-6 h-6" />
              <h2 className="font-medium text-xl tracking-tighter">
                Datos de cotiazción
              </h2>
            </div>

            <hr className="pb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  id
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={cotizacion?.id || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Título
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={cotizacion?.titulo || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Nombre de contrato
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={cotizacion.nombreDelContrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Contratante
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={cotizacion?.contratado || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Contratado
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={cotizacion?.contratado || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo de contrato
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={cotizacion?.tipoDeContrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número de contrato
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={cotizacion?.numeroDeContrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Inicio de contrato
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="date"
                    value={cotizacion?.inicioContrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fin de contrato
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="date"
                    value={cotizacion?.finContrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Monto de contrato
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="number"
                    value={cotizacion?.montoContrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Anticipo de contrato
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="number"
                    value={cotizacion?.anticipoContrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 text-gray-600">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Handshake className="w-6 h-6" />
              <h2 className="font-medium text-xl tracking-tighter">
                Sub contratos
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Sub contratado
                </Label>
                {/* Skeleton Loader */}
                {!cotizacion ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value="No disponible"
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
