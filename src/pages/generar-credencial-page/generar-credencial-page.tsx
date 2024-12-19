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
import { Persona } from "@/modelos/personal";
import { Label } from "@radix-ui/react-dropdown-menu";
import { id } from "date-fns/locale";
import { CirclePlus, Upload, UserRound } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import QRCode from "react-qr-code"; // Importa el componente QRCode
import { useQuery, useQueryClient } from "react-query";

export function PageGenerarCredencial() {
  const id = 20;
  const query = useQuery({
    queryKey: ["trabajador", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/personas/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      console.log(resData);
      const personaParse = Persona.safeParse(resData);
      if (!personaParse.success) {
        console.error(personaParse.error);
        throw new Error(personaParse.error.toString());
      }
      return personaParse.data;
    },
  });
  console.log(query.data);
  // const queryClient = useQueryClient();
  // const trabajador = queryClient.getQueryData(["trabajador", id]);
  // if (!trabajador) {
  //   return <p>Datos no disponibles en cache.Por favor, recarga la pagina.</p>;
  // }

  // const { datosPersonales, datosMedicos, datosAcademicos, datosContratacion } =
  //   trabajador;

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

      <div className="p-6 flex justify-center items-stretch gap-20">
        {/* Contenedor izquierdo */}
        <div className="flex flex-col w-1/3">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-center gap-1">
                <img
                  src="src/assets/oceanus-logo.svg"
                  alt="Logo Oceanus"
                  className="w-8 h-8"
                />
                <span>Oceanus Supervisión y Proyectos</span>
              </CardTitle>
            </CardHeader>
            <div className="relative mb-4 w-full h-10">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `
        repeating-linear-gradient(
          45deg,
          #58D1EC,
          #58D1EC 2px,
          transparent 2px,
          transparent 40px
        )
      `,
                }}
              ></div>
            </div>

            <CardContent>
              <div className="flex flex-col items-center gap-4">
                {/* Imagen centrada con diseño */}
                <div
                  className="p-2 rounded-full bg-blue-50 border-4"
                  style={{
                    boxShadow: "0 0 0 4px #58D1EC", // Contorno azul alrededor de la imagen
                  }}
                >
                  <img
                    src="src/assets/admin-logo.png"
                    alt="Descripción de la imagen"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>

                {/* Información debajo */}
                <div className="w-full text-center space-y-2">
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    NOMBRE COMPLETO
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    RFC
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    Género
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    NSS
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    CURP
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    PUESTO
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    CELULAR
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    CURP
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    VIGENCIA
                  </Label>
                </div>
              </div>
            </CardContent>
            <div className="relative mb-4 w-full h-10">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `
        repeating-linear-gradient(
          45deg,
          #58D1EC,
          #58D1EC 2px,
          transparent 2px,
          transparent 40px
        )
      `,
                }}
              ></div>
            </div>
          </Card>
        </div>

        {/* Contenedor derecho */}
        <div className="flex flex-col w-1/3">
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
            <div className="relative mb-4 w-full h-10">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `
            repeating-linear-gradient(
              45deg,
              #58D1EC,
              #58D1EC 2px,
              transparent 2px,
              transparent 40px
            )
          `,
                }}
              ></div>
            </div>
            <CardContent>
              <div className="flex flex-col justify-between items-center h-full">
                {/* Código QR azul */}
                <div className="flex-shrink-0 mb-6">
                  {" "}
                  {/* Aumenté el margen inferior */}
                  <QRCode
                    value="https://example.com"
                    size={128}
                    className="rounded-lg"
                    fgColor="#117991"
                    bgColor="#ffffff"
                  />
                </div>

                {/* Sección de Labels con más espaciado */}
                <div className="flex flex-col items-center gap-4">
                  {" "}
                  {/* Aumenté el gap */}
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    SEXO
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    TIPO DE SANGRE
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    ALERGIAS A MEDICAMENTOS
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    PADECIMIENTOS MEDICOS
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    EN CASO DE EMERGENCIA LLAMAR A:
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    Licencia
                  </Label>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    NUM. TELEFONO
                  </Label>
                </div>
                <div className="relative mb-4 w-full h-10"></div>
              </div>
            </CardContent>
            <div className="relative mb-4 w-full h-10">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: `
            repeating-linear-gradient(
              45deg,
              #58D1EC,
              #58D1EC 2px,
              transparent 2px,
              transparent 40px
            )
          `,
                }}
              ></div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
