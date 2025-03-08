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
import {
  FileText,
  FileUser,
  GraduationCap,
  IdCard,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "react-query";
import { Contrato } from "@/modelos/datosContratos";
import { Button } from "@/components/ui/button";

export function VerDetallesContratos() {
  const { idcontrato } = useParams();
  const fetchContrato = async () => {
    const response = await axios.get(
      `http://localhost:3001/contrato/${idcontrato}`
    );
    return response.data;
  };
  const {
    data: contrato,
    isLoading,
    isError, //lo dejare para cuando pongamos página de error
    error,
  } = useQuery<Contrato>(["contrato", idcontrato], fetchContrato);

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contrato">Contratos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/detalles-contratos/${idcontrato}`}>
                Detalles
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex items-center">
        <div className="container flex flex-col items-start gap-1 py-4 px-5 md:py-6 lg:py-8 sm:-mb-2">
          <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            Contrato
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            ID: {contrato?.idContrato}, {contrato?.nombrecontrato}
          </p>
        </div>

        <div className="px-3 w-full flex justify-end gap-2 ">
          <Button className="bg-deepSea hover:bg-deepLightSea">
            <IdCard />
            <Link to={`/contratos/${contrato?.idContrato}/convenio`}>
              Convenio{" "}
            </Link>
          </Button>

          <Button className="bg-deepSea hover:bg-deepLightSea">
            <FileUser />
            <Link to={"/facturas"}>Facturas</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4 -mt-4">
            <div className="flex items-center gap-2 mb-4">
              <UserRound className="w-6 h-6" />
              <h2 className="font-medium text-xl">Datos Generales</h2>
            </div>

            <hr className="pb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Nombre Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.nombrecontrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Numero de Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.numerocontrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Contratado
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.contratado?.razonsocial || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Subcontrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.subcontrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Inicio contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.iniciocontrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fin contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fincontrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Monto Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.montocontrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Anticipo Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.anticipocontrato || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Direccion
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.direccion || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.datosPersonal?.tipocontrato || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6" />
              <h2 className="font-medium text-xl">Datos Fianza Ocultos</h2>
            </div>

            <hr className="pb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Documento
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaOculto?.documento || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo de Cambio
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaOculto?.tipodecambio || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Anticpo Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaOculto?.anticipodoc || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Inicio Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaOculto?.inicio || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fin del Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaOculto?.fin || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Poliza
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaOculto?.poliza || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Aseguradora
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaOculto?.aseguradora || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Monto
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaOculto?.monto || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="w-6 h-6" />
              <h2 className="font-medium text-xl">Datos Fianza Cumplimiento</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Documento
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaCumplimiento?.documento || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo de Cambio
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaCumplimiento?.tipodecambio ||
                      "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Inicio Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaCumplimiento?.inicio || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fin Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaCumplimiento?.fin || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Poliza
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaCumplimiento?.poliza || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Aseguradora
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaCumplimiento?.aseguradora ||
                      "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Monto
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaCumplimiento?.monto || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6" />
              <h2 className="font-medium text-xl">Datos Fianza Anticipos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Documento
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaAnticipo?.documento || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo de Cambio
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaAnticipo?.tipodecambio || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Anticipo de Documento
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaAnticipo?.anticipodoc || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Inicio de Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaAnticipo?.inicio || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fin de Contrato
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaAnticipo?.fin || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Poliza
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaAnticipo?.poliza || "No disponible"}
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Aseguradora
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={
                      contrato?.fianzaAnticipo?.aseguradora || "No disponible"
                    }
                    className="bg-white disabled:opacity-100"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Monto
                </Label>
                {/* Skeleton Loader */}
                {!contrato ? (
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  <Input
                    disabled
                    type="text"
                    value={contrato?.fianzaAnticipo?.monto || "No disponible"}
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
