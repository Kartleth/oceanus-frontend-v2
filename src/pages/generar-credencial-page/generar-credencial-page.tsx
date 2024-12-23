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
import { useParams } from "react-router-dom";
import oceanuslogo from "@/assets/oceanus-logo.svg";
import oceanusadmi from "@/assets/admin-logo.png";

export function PageGenerarCredencial() {
  const params = useParams();
  const id = params.id;
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
  console.log(query.status, query.data);

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
          <Card className="w-full h-full relative pb-16">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-center gap-1">
                <img src={oceanuslogo} alt="Logo Oceanus" className="w-8 h-8" />
                <span>Oceanus Supervisión y Proyectos</span>
              </CardTitle>
            </CardHeader>
            <div className="relative w-full h-10 ">
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
            <div className="py-2"></div>
            <CardContent>
              <div className="flex flex-col items-center gap-2">
                <div
                  className="p-2 rounded-full bg-blue-50 border-4"
                  style={{
                    boxShadow: "0 0 0 4px #58D1EC",
                  }}
                >
                  <img
                    src={oceanusadmi}
                    alt="Descripción de la imagen"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>

                {/* Información debajo */}
                <div className="w-full text-center space-y-2">
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    NOMBRE COMPLETO
                  </Label>
                  <span>{query.data?.nombre}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    RFC
                  </Label>
                  <span>{query.data?.rfc}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    NSS
                  </Label>
                  <span>{query.data?.datosMedicos.numseguro}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    CURP
                  </Label>
                  <span>{query.data?.curp}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    PUESTO
                  </Label>
                  <span>{query.data?.datosAcademicos.carrera}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    CELULAR
                  </Label>
                  <span>{query.data?.numerocelular}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    VIGENCIA
                  </Label>
                  <span>{query.data?.tipocontrato}</span>
                </div>
              </div>
            </CardContent>
            {/* <div className="relative w-full h-10"> */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: 0,
                width: "100%",
                height: "40px",
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
            {/* </div> */}
          </Card>
        </div>

        {/* Contenedor derecho */}
        <div className="flex flex-col w-1/3">
          <Card className="w-full h-full relative pb-16">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                <img src={oceanuslogo} alt="Logo Oceanus" className="w-8 h-8" />
                <span>Información Médica</span>
              </CardTitle>
            </CardHeader>
            <div className="relative w-full h-10">
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
            <div className="py-2"></div>
            <CardContent>
              <div className="flex flex-col justify-between items-center h-full">
                {/* Código QR azul */}
                <div className="flex-shrink-0 p-3">
                  {" "}
                  {/* Aumenté el margen inferior */}
                  <QRCode
                    value="https://example.com"
                    // size={128}
                    className="rounded-lg w-32 h-32"
                    fgColor="#117991"
                    bgColor="#ffffff"
                  />
                </div>

                {/* Sección de Labels con más espaciado */}
                <div className="flex flex-col items-center gap-2">
                  {/* Aumenté el gap */}
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    SEXO
                  </Label>
                  <span>{query.data?.datosMedicos.genero}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    TIPO DE SANGRE
                  </Label>
                  <span>{query.data?.datosMedicos.tiposangre}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    ALERGIAS A MEDICAMENTOS
                  </Label>
                  <span>{query.data?.datosMedicos.alergiasmed}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    PADECIMIENTOS MEDICOS
                  </Label>
                  <span>{query.data?.datosMedicos.enfercronicas}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    EN CASO DE EMERGENCIA LLAMAR A:
                  </Label>
                  <span>{query.data?.datosMedicos.nombremergencia}</span>
                  <Label className="font-bold" style={{ color: "#117991" }}>
                    NUM. TELEFONO
                  </Label>
                  <span>{query.data?.datosMedicos.numemergencia}</span>
                </div>
                <div className="relative mb-4 w-full h-10"></div>
              </div>
            </CardContent>
            {/* <div className="relative w-full h-10"> */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: 0,
                width: "100%",
                height: "40px",
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
            {/* </div> */}
          </Card>
        </div>
      </div>
    </Layout>
  );
}
