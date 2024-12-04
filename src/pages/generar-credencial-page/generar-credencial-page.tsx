import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CirclePlus, Upload, UserRound } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export function PageGenerarCredencial() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/personal">
                Generar Credencial
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="py-6 px-3 space-x-2 flex justify-end">
        <Button className="bg-deepSea hover:bg-deepLightSea">
          <Upload /> Descargar
        </Button>
      </div>

      <div className="p-6 grid grid-cols-2 gap-6">
        {/* Contenedor izquierdo */}
        <div className="flex flex-col">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <img
                  src="src/assets/oceanus-logo.svg"
                  alt="Logo Oceanus"
                  className="w-8 h-8"
                />
                <span>Oceanus Supervisión y Proyectos</span>
              </CardTitle>
            </CardHeader>
            <hr className="mb-4 border-softAqua" />
            <CardContent>
              <div className="flex gap-4 items-start">
                {/* Sección izquierda con los Labels */}
                <div className="flex-1 max-w-[70%]">
                  <Label>NOMBRE COMPLETO</Label>
                  <Label>RFC</Label>
                  <Label>Género</Label>
                  <Label>NSS</Label>
                  <Label>CURP</Label>
                  <Label>PUESTO</Label>
                  <Label>CELULAR</Label>
                  <Label>CURP</Label>
                  <Label>VIGENCIA</Label>
                </div>

                {/* Imagen a la derecha */}
                <div className="flex-shrink-0">
                  <img
                    src="src/assets/admin-logo.png"
                    alt="Descripción de la imagen"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenedor derecho */}
        <div className="flex flex-col">
          <Card className="w-full h-full">
            <CardHeader>
            <CardTitle className="text-xl flex items-center justify-center gap-2">
                <img
                  src="src/assets/oceanus-logo.svg"
                  alt="Logo Oceanus"
                  className="w-8 h-8"
                />
                <span>Información Médica</span>
              </CardTitle>
            </CardHeader>
            <hr className="mb-4 border-softAqua" />
            <CardContent>
              <div className="flex gap-4 items-start">
                {/* Sección izquierda con los Labels */}
                <div className="flex-1 max-w-[70%]">
                  <Label>SEXO</Label>
                  <Label>TIPO DE SANGRE</Label>
                  <Label>ALERGIAS A MEDICAMENTOS</Label>
                  <Label>PADECIMIENTOS MEDICOS</Label>
                  <Label>EN CASO DE EMERGENCIA LLAMAR A:</Label>
                  <Label>Licencia</Label>
                  <Label>NUM. TELEFONO</Label>
                </div>

                {/* Código QR a la derecha */}
                <div className="flex-shrink-0">
                  <QRCodeCanvas
                    value="https://example.com"
                    size={128}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
