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
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function VerReportePersonal() {
  const { id } = useParams();
  const [empleado, setEmpleado] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  {
    /* AGREGAR DISEÑO AL APARTADO DE CARGANDO*/
  }
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
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
              <BreadcrumbLink href="/detalles-trabajador">
                Detalles
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/reporte-de-empleado">
                Reporte de empleado
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex items-center">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="w-60 rounded-full p-6"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h1 className="font-medium text-2xl w-1/2">{empleado?.nombre || "No disponible"}</h1>
        <div className="px-6 w-full flex justify-end">
          <Button className="bg-deepSea hover:bg-deepLightSea">
            <Printer />
            Imprimir reporte
          </Button>
        </div>
      </div>

      <div className="px-6">
        <hr />
      </div>

      <div className="p-6 grid gap-6 md:grid-cols-2">
        <Card className="w-full">
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
                <Label><b>Edad: </b>No disponible</Label>
                <Label><b>Fecha de nacimiento: </b>{empleado?.fechanacimiento || "No disponible"}</Label>
                <Label><b>Género: </b>{empleado?.datosmedico?.genero || "No disponible"}</Label>
                <Label><b>Teléfono: </b>{empleado?.numerocelular || "No disponible"}</Label>
                <Label><b>Dirección: </b>{empleado?.direccion || "No disponible"}</Label>
                <Label><b>Licencia: </b>{empleado?.numerolicencia || "No disponible"}</Label>
                <Label><b>Pasaporte: </b>{empleado?.numeropasaporte || "No disponible"}</Label>
                <Label><b>CURP: </b>{empleado?.curp || "No disponible"}</Label>
                <Label><b>RFC: </b>{empleado?.rfc || "No disponible"}</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Stethoscope className="w-6 h-6" /> Datos médicos
            </CardTitle>
          </CardHeader>
          <hr className="mb-4 border-softAqua" />
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label><b>Alergias: </b>{empleado?.datosmedico?.alergias || "No disponible"}</Label>
                <Label><b>Enfermedades: </b>{empleado?.datosmedico?.enfercronicas || "No disponible"}</Label>
                <Label><b>Lesiones: </b>{empleado?.datosmedico?.lesiones || "No disponible"}</Label>
                <Label><b>NSS: </b>{empleado?.datosmedico?.numseguro || "No disponible"}</Label>
                <Label><b>Contacto de emergencia: </b>{empleado?.datosmedico?.nombremergencia || "No disponible"}</Label>
                <Label><b>Relación: </b>{empleado?.datosmedico?.relaemergencia || "No disponible"}</Label>
                <Label><b>Número de emergencia: </b>{empleado?.datosmedico?.numemergencia || "No disponible"}</Label>
                <Label><b>Tipo de sangre: </b>{empleado?.datosmedico?.tiposangre || "No disponible"}</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
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
                <Label><b>Carrera: </b>{empleado?.formacademica?.carrera || "No disponible"}</Label>
                <Label><b>Cédula: </b>{empleado?.formacademica?.cedula || "No disponible"}</Label>
                <Label><b>Experiencia laboral: </b>{empleado?.formacademica?.explaboral || "No disponible"}</Label>
                <Label><b>Certificaciones: </b>{empleado?.formacademica?.certificaciones || "No disponible"}</Label>
                <Label><b>Grado de estudios: </b>{empleado?.formacademica?.gradoestudios || "No disponible"}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
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
                <Label><b>Estado: </b>{empleado?.estado || "No disponible"}</Label>
                <Label><b>Tipo de contrato: </b>{empleado?.tipocontrato || "No disponible"}</Label>
                <Label><b>Inicio de contrato: </b>{empleado?.iniciocontrato || "No disponible"}</Label>
                <Label><b>Fin de contrato: </b>{empleado?.fincontrato || "No disponible"}</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
