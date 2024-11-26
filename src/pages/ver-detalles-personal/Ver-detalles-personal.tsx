import Layout from "@/components/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  FileText,
  FileUser,
  GraduationCap,
  IdCard,
  Slash,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VerDetallesPersonal() {
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Personal
              </BreadcrumbPage>
            </BreadcrumbItem>

            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Detalles
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="py-6 px-3 flex flex-wrap md:flex-nowrap items-center justify-between space-y-4 md:space-y-0">
        <h1 className="font-medium text-2xl">Nombre del trabajador</h1>
        <div className="flex space-x-2">
          <Button>
            <IdCard />
            Generar credencial
          </Button>
          <Button>
            <FileUser />
            Generar reporte
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4">
          <div className="rounded-xl bg-muted/50 p-4">
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
                <Input
                  disabled
                  type="text"
                  placeholder="Nombre de usuario"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fecha nacimiento
                </Label>
                <Input
                  disabled
                  type="date"
                  placeholder="1996-09-13"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Teléfono
                </Label>
                <Input
                  disabled
                  type="number"
                  placeholder="6600000000"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Email
                </Label>
                <Input
                  disabled
                  type="email"
                  placeholder="correo@gmail.com"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Carrera
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Carrera"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Grado Académico
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Grado Académico"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Inicio contrato
                </Label>
                <Input
                  disabled
                  type="date"
                  placeholder=""
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fin contrato
                </Label>
                <Input
                  disabled
                  type="date"
                  placeholder=""
                  className="bg-white disabled:opacity-100"
                />
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
              <h2 className="font-medium text-xl">Datos personales</h2>
            </div>

            <hr className="pb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Nombre
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Nombre de usuario"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fecha nacimiento
                </Label>
                <Input
                  disabled
                  type="date"
                  placeholder=""
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  CURP
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="CURPUSUARIO"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  RFC
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="RFCDEUSUARIO"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número fijo
                </Label>
                <Input
                  disabled
                  type="number"
                  placeholder="6600000000"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número de celular
                </Label>
                <Input
                  disabled
                  type="number"
                  placeholder="6600000000"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Dirección
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Dirección de usuario"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número de licencia
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Número de licencia"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número de pasaporte
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="N/A"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Fecha de ingreso
                </Label>
                <Input
                  disabled
                  type="date"
                  placeholder=""
                  className="bg-white disabled:opacity-100"
                />
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
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Enfermedades cronicas
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Lesiones
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Alergias a medicamentos
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número de seguro
                </Label>
                <Input
                  disabled
                  type="number"
                  placeholder="Número de seguro"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Llamar en caso de emergencia
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Nombre del padre"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Relación
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Padre"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Número de emergencia
                </Label>
                <Input
                  disabled
                  type="number"
                  placeholder="Número de emergencia"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Tipo de sangre
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Tipo de sangre"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Genero
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Genero"
                  className="bg-white disabled:opacity-100"
                />
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
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Carrera
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Experiencia laboral
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Certificaciones
                </Label>
                <Input
                  disabled
                  type="text"
                  placeholder="Ninguna"
                  className="bg-white disabled:opacity-100"
                />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="" className="mb-2">
                  Grado de estudio
                </Label>
                <Input
                  disabled
                  type="number"
                  placeholder="Número de seguro"
                  className="bg-white disabled:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
      <div className="px-3">
        <h2 className="font-medium py-3 text-xl">Datos del usuario</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Nombre
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Fecha nacimiento
            </Label>
            <Input disabled type="date" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Teléfono
            </Label>
            <Input disabled type="number" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Email
            </Label>
            <Input disabled type="email" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Carrera
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Grado Academico
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Inicio contrato
            </Label>
            <Input disabled type="date" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Fin contrato
            </Label>
            <Input disabled type="date" placeholder="" />
          </div>
        </div>
      </div>
      <div className="px-3 pt-8">
        <h2 className="font-medium py-3 text-xl">Datos personales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Nombre
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Fecha nacimiento
            </Label>
            <Input disabled type="date" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Curp
            </Label>
            <Input disabled type="number" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              RFC
            </Label>
            <Input disabled type="number" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Numero fijo
            </Label>
            <Input disabled type="number" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Numero Celular
            </Label>
            <Input disabled type="number" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Direccion
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Numero Licencia
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Numero Pasaporte
            </Label>
            <Input disabled type="text" placeholder="N/A" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Fecha Ingreso
            </Label>
            <Input disabled type="date" placeholder="" />
          </div>
        </div>
      </div>
      <div className="px-3 pt-8">
        <h2 className="font-medium py-3 text-xl">Datos Medicos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Alergias
            </Label>
            <Input disabled type="text" placeholder="Ninguna" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Enfermedades Cronicas
            </Label>
            <Input disabled type="text" placeholder="Ninguna" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Lesiones
            </Label>
            <Input disabled type="text" placeholder="Ninguna" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Número de seguro
            </Label>
            <Input disabled type="number" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Contacto de emergencia
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Relación
            </Label>
            <Input disabled type="text" placeholder="Padre" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Número de emergencia
            </Label>
            <Input disabled type="number" placeholder="" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Tipo de sangre
            </Label>
            <Input disabled type="text" placeholder="A+" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Genero
            </Label>
            <Input disabled type="text" placeholder="" />
          </div>
        </div>
      </div>
      <div className="px-3 py-8">
        <h2 className="font-medium py-3 text-xl">Datos Academicos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Número de cedula
            </Label>
            <Input disabled type="number" placeholder="0" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Carrera
            </Label>
            <Input disabled type="text" placeholder="Ninguna" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Experiencia laboral
            </Label>
            <Input disabled type="text" placeholder="Ninguna" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Certificaciones
            </Label>
            <Input disabled type="text" placeholder="Ninguna" />
          </div>
          <div className="flex flex-col mt-2">
            <Label htmlFor="" className="mb-2">
              Grado de estudios
            </Label>
            <Input disabled type="text" placeholder="Ninguna" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>*/}
    </Layout>
  );
}
