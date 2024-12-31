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
  FileText,
  GraduationCap,
  IdCard,
  Printer,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Persona } from "@/modelos/personal";

export function VerDetallesPersonal() {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/personas/${id}`)
      .then((response) => {
        setEmpleado(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los datos del empleado");
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/personal">Personal</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/detalles-trabajador/${id}`}>
                Detalles
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex flex-col items-start p-4">
        {loading ? (
          <div className="flex items-center space-x-4 w-full p-6">
            <div className="w-full h-20 bg-gray-200 animate-pulse rounded-md"></div>
          </div>
        ) : (
          <>
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="w-60 rounded-full p-6"
              />
            </Avatar>

            <h1 className="font-medium text-2xl w-1/2">
              {empleado?.nombre || "No disponible"}
            </h1>

            <div className="px-3 w-full flex justify-end gap-2">
              <Button className="bg-deepSea hover:bg-deepLightSea">
                <IdCard />
                Generar credencial
              </Button>

              <Button
                asChild={true}
                className="bg-deepSea hover:bg-deepLightSea"
              >
                <Link to={`/reporte-de-empleado/${id}`}>Generar reporte</Link>
              </Button>
            </div>
          </>
        )}

        <div className="grid grid-cols-2  gap-4">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="rounded-xl bg-muted/50 p-4 -mt-4">
              <div className="flex items-center gap-2 mb-4">
                <UserRound className="w-6 h-6" />
                <h2 className="font-medium text-xl">Datos del usuario</h2>
              </div>

              <hr className="pb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Nombre
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="text"
                      value={empleado?.nombre || "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Fecha nacimiento
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="date"
                      value={empleado?.fechanacimiento || "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Teléfono
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="number"
                      value={empleado?.numerocelular || "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Email
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="email"
                      value={empleado?.correo || "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Carrera
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="text"
                      value={
                        empleado?.datosAcademicos?.carrera || "No disponible"
                      }
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Grado Académico
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="text"
                      value={
                        empleado?.datosAcademicos?.gradoestudios ||
                        "No disponible"
                      }
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Inicio contrato
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="date"
                      value={empleado?.iniciocontrato || "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="" className="mb-2">
                    Fin contrato
                  </Label>
                  {/* Skeleton Loader */}
                  {!empleado ? (
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <Input
                      disabled
                      type="date"
                      value={empleado?.fincontrato || "No disponible"}
                      className="bg-white disabled:opacity-100"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-6 h-6" />
                  <h2 className="font-medium text-xl">Datos personales</h2>
                </div>

                <hr className="pb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Nombre
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={empleado?.nombre || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Fecha nacimiento
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="date"
                        value={empleado?.fechanacimiento || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      CURP
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={empleado?.curp || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      RFC
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={empleado?.rfc || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Número fijo
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="number"
                        value={empleado?.numerofijo || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Número de celular
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="number"
                        value={empleado?.numerocelular || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Dirección
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={empleado?.direccion || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Número de licencia
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={empleado?.numerolicencia || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Número de pasaporte
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={empleado?.numeropasaporte || "No disponible"}
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Fecha de ingreso
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="date"
                        value={empleado?.fechaingreso || "No disponible"}
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
                  <h2 className="font-medium text-xl">Datos medicos</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Alergias
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosMedicos?.alergias || "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Enfermedades cronicas
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosMedicos?.enfercronicas ||
                          "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Lesiones
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosMedicos?.lesiones || "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Alergias a medicamentos
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosMedicos?.alergiasmed || "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Número de seguro
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        value={
                          empleado?.datosMedicos?.numseguro || "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Llamar en caso de emergencia
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        value={
                          empleado?.datosMedicos?.nombremergencia ||
                          "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Relación
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosMedicos?.relaemergencia ||
                          "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Número de emergencia
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="number"
                        value={
                          empleado?.datosMedicos?.numemergencia ||
                          "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Tipo de sangre
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosMedicos?.tiposangre || "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Genero
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosMedicos?.genero || "No disponible"
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
                  <h2 className="font-medium text-xl">Datos academicos</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Número de cedula
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosAcademicos?.cedula || "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Carrera
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosAcademicos?.carrera || "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Experiencia laboral
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosAcademicos?.explaboral ||
                          "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Certificaciones
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosAcademicos?.certificaciones ||
                          "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="" className="mb-2">
                      Grado de estudio
                    </Label>
                    {/* Skeleton Loader */}
                    {!empleado ? (
                      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      <Input
                        disabled
                        type="text"
                        value={
                          empleado?.datosAcademicos?.gradoestudios ||
                          "No disponible"
                        }
                        className="bg-white disabled:opacity-100"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
