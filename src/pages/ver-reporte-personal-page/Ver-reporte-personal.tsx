import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Layout from "../../components/layout";
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
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function VerReportePersonal() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });
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

      <div ref={contentRef}>
        <div className="flex items-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="w-60 rounded-full p-6"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="font-medium text-2xl w-1/2">Nombre de trabajador</h1>
          <div className="px-6 w-full flex justify-end">
            <Button onClick={handlePrint}>
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
                  <Label>Edad</Label>
                  <Label>Fecha de nacimiento</Label>
                  <Label>Género</Label>
                  <Label>Teléfono</Label>
                  <Label>Dirección</Label>
                  <Label>Licencia</Label>
                  <Label>Pasaporte</Label>
                  <Label>CURP</Label>
                  <Label>RFC</Label>
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
                  <Label>Alergias</Label>
                  <Label>Enfermedades</Label>
                  <Label>Lesiones</Label>
                  <Label>NSS</Label>
                  <Label>Contacto de emergencia</Label>
                  <Label>Relación</Label>
                  <Label>Número de emergencia</Label>
                  <Label>Tipo de sangre</Label>
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
                  <Label>Carrera</Label>
                  <Label>Cédula</Label>
                  <Label>Experiencia laboral</Label>
                  <Label>Certificaciones</Label>
                  <Label>Grado de estudios</Label>
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
                  <Label>Estado</Label>
                  <Label>Tipo de contrato</Label>
                  <Label>Inicio de contrato</Label>
                  <Label>Fin de contrato</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
