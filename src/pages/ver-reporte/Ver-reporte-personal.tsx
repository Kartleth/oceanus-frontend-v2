import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/Layout";
import {
  BookUser,
  GraduationCap,
  Printer,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Persona } from "@/modelos/personal";
import { useQuery } from "react-query";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import "../../assets/styles/print.css";

export default function VerReportePersonal() {
  const { id } = useParams();
  const fetchEmpleado = async (): Promise<Persona> => {
    const response = await axios.get(`http://localhost:3001/personas/${id}`);
    return response.data;
  };

  //Lógica para mandar a imprimir
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const {
    data: empleado,
    isLoading,
    isError,
    error, //lo dejare para cuando pongamos página de error
  } = useQuery<Persona>(["empleado", id], fetchEmpleado);

  {
    /* AGREGAR DISEÑO AL APARTADO DE CARGANDO Y DE ERROR*/
  }
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
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

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/reporte-de-empleado/${id}`}>
                Reporte de empleado
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div ref={contentRef}>
        <div className="flex items-center">
          <Avatar className="p-4">
            <AvatarImage
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                empleado?.nombre ?? "Usuario"
              )}&background=C4EEF8`}
              alt="Avatar"
              className="w-64 rounded-full p-2"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="container flex flex-col items-start gap-1 py-4 md:py-6 lg:py-8 sm:-mb-2">
            <h1 className=" text-gray-600 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
              Reporte
            </h1>
            <p className="max-w-2xl text-lg font-light text-foreground">
              ID: {empleado?.id}, {empleado?.nombre}
            </p>
          </div>
          <div className="px-6 w-full flex justify-end">
            <Button
              className="bg-deepSea hover:bg-deepLightSea print:hidden"
              onClick={() => reactToPrintFn()}
            >
              <Printer />
              Imprimir reporte
            </Button>
          </div>
        </div>

        <div className="px-6">
          <hr />
        </div>

        <div className="p-6 grid gap-6 md:grid-cols-2">
          <Card className="w-full print-card text-gray-600">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <UserRound className="w-6 h-6" />
                Datos personales
              </CardTitle>
            </CardHeader>
            <hr className="mb-4 border-softAqua" />
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>
                    <b>Edad: </b>No disponible
                  </Label>
                  <Label>
                    <b>Fecha de nacimiento: </b>
                    {empleado?.fechanacimiento ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Género: </b>
                    {empleado?.datosMedicos?.genero ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Teléfono: </b>
                    {empleado?.numerocelular ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Dirección: </b>
                    {empleado?.direccion ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Licencia: </b>
                    {empleado?.numerolicencia ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Pasaporte: </b>
                    {empleado?.numeropasaporte ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>CURP: </b>
                    {empleado?.curp ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>RFC: </b>
                    {empleado?.rfc ?? "No disponible"}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full print-card text-gray-600">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Stethoscope className="w-6 h-6" /> Datos médicos
              </CardTitle>
            </CardHeader>
            <hr className="mb-4 border-softAqua" />
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>
                    <b>Alergias: </b>
                    {empleado?.datosMedicos?.alergias ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Enfermedades: </b>
                    {empleado?.datosMedicos?.enfercronicas ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Lesiones: </b>
                    {empleado?.datosMedicos?.lesiones ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>NSS: </b>
                    {empleado?.datosMedicos?.numseguro ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Contacto de emergencia: </b>
                    {empleado?.datosMedicos?.nombremergencia ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Relación: </b>
                    {empleado?.datosMedicos?.relaemergencia ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Número de emergencia: </b>
                    {empleado?.datosMedicos?.numemergencia ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Tipo de sangre: </b>
                    {empleado?.datosMedicos?.tiposangre ?? "No disponible"}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full print-card text-gray-600">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Datos académicos
              </CardTitle>
            </CardHeader>
            <hr className="mb-4 border-softAqua" />
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>
                    <b>Carrera: </b>
                    {empleado?.datosAcademicos?.carrera ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Cédula: </b>
                    {empleado?.datosAcademicos?.cedula ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Experiencia laboral: </b>
                    {empleado?.datosAcademicos?.explaboral ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Certificaciones: </b>
                    {empleado?.datosAcademicos?.certificaciones ??
                      "No disponible"}
                  </Label>
                  <Label>
                    <b>Grado de estudios: </b>
                    {empleado?.datosAcademicos?.gradoestudios ??
                      "No disponible"}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full print-card text-gray-600">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BookUser />
                Datos de contratación
              </CardTitle>
            </CardHeader>
            <hr className="mb-4 border-softAqua" />
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>
                    <b>Estado: </b>
                    {empleado?.estado ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Tipo de contrato: </b>
                    {empleado?.tipocontrato ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Inicio de contrato: </b>
                    {empleado?.iniciocontrato ?? "No disponible"}
                  </Label>
                  <Label>
                    <b>Fin de contrato: </b>
                    {empleado?.fincontrato ?? "No disponible"}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
