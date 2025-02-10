import { useParams } from "react-router-dom";
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
import { Building2, ReceiptText, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "react-query";
import { Empresa } from "@/modelos/empresa";

export function VerDetallesEmpresa() {
  const { id } = useParams();
  const fetchEmpresa = async (): Promise<Empresa> => {
    const response = await axios.get(`http://localhost:3001/empresa/${id}`);
    return response.data;
  };
  const {
    data: empresa,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Empresa>(["empresa", id], fetchEmpresa);

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/empresas">Empresas</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/detalles-empresa`}>
                Detalles de empresa
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
                  empresa?.razonsocial ?? "Empresa"
                )}&background=C4EEF8`}
                alt="Avatar"
                className="w-64 rounded-full p-2"
              />
            </Avatar>

            <div className="container flex flex-col items-start gap-1 py-4 md:py-6 lg:py-8 sm:-mb-2">
              <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                Detalles de empresa
              </h1>
              <p className="max-w-2xl text-lg font-light text-foreground">
                ID: {empresa?.idempresa ?? "No disponible"} , {empresa?.razonsocial  ?? "No disponible"}
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
              <Building2 className="w-6 h-6" />
              <h2 className="font-medium text-xl tracking-tighter">
                Información de la empresa
              </h2>
            </div>

            <hr className="pb-6" />
            <div>
              {/* Razón Social */}
              <div className="flex flex-col mb-4">
                <Label htmlFor="" className="mb-2">
                  Razón social
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={empresa?.razonsocial ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ID de Empresa */}
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Id de empresa
                  </Label>
                  {/* Skeleton Loader */}
                  {!empresa ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="number"
                      value={empresa?.idempresa ?? "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Correo
                  </Label>
                  {/* Skeleton Loader */}
                  {!empresa ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="email"
                      value={empresa?.correo ?? "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Teléfono
                  </Label>
                  {/* Skeleton Loader */}
                  {!empresa ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="number"
                      value={empresa.telefono ?? "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Nombre de contrato
                  </Label>
                  {/* Skeleton Loader */}
                  {!empresa ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="string"
                      value={empresa.nombrecontrato ?? "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 text-gray-600">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-4">
              <ReceiptText className="w-6 h-6" />
              <h2 className="font-medium text-xl tracking-tighter">
                Datos de Facturación
              </h2>
            </div>

            <hr className="pb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  RFC
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={empresa?.rfc ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Correo de facturación
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="email"
                    value={empresa?.correofacturacion ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo de régimen
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={empresa?.tiporegimen ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número de cuenta
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="number"
                    value={empresa?.numerocuenta ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Banco
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={empresa?.banco ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Vencimiento de constancia
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="date"
                    value={
                      empresa?.fechavencimientoconstancia ?? "No disponible"
                    }
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
              <Scale className="w-6 h-6" />
              <h2 className="font-medium text-xl tracking-tighter">
                Representante legal
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Representante
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={empresa?.representantelegal ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Correo
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="email"
                    value={empresa?.correoRepresentantelegal ?? "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Teléfono
                </Label>
                {/* Skeleton Loader */}
                {!empresa ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="string"
                    value={empresa?.telefonoRepresentantelegal ?? "No disponible"}
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
