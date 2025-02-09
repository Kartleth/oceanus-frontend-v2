import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  DatosPersonales,
  DatosPersonalesForm,
  datosPersonalesSchema,
} from "@/components/forms/datos-trabajador-forms/datos-personales-form";
import {
  DatosMedicos,
  DatosMedicosForm,
  datosMedicosSchema,
} from "@/components/forms/datos-trabajador-forms/datos-medicos-form";
import {
  DatosAcademicos,
  DatosAcademicosForm,
  datosAcademicosSchema,
} from "@/components/forms/datos-trabajador-forms/datos-academicos-form";
import {
  DatosContratacion,
  DatosContratacionForm,
  datosContratacionSchema,
} from "@/components/forms/datos-trabajador-forms/datos-contratacion-form";
import { Persona } from "@/modelos/personal";

type AccordionValue =
  | "datos-personales"
  | "datos-medicos"
  | "datos-academicos"
  | "datos-contratacion"
  | string;

export function PageEditarContratos() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["trabajador", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/personas/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      const personaParse = Persona.safeParse(resData);
      if (!personaParse.success) {
        console.error(personaParse.error);
        throw new Error(personaParse.error.toString());
      }
      return personaParse.data;
    },
  });

  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch(`http://localhost:3001/personas/${id}`, {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    if (!res.ok) {
      console.error(resData);
    }
    console.log(resData);
    queryClient.invalidateQueries(["trabajadores"]);
    navigate("/personal");
  });

  async function formulariosSonValidos() {
    if (!(await datosPersonalesForm.trigger())) {
      setValue("datos-personales");

      return false;
    }
    if (!(await datosMedicosForm.trigger())) {
      setValue("datos-medicos");

      return false;
    }
    if (!(await datosAcademicosForm.trigger())) {
      setValue("datos-academicos");

      return false;
    }
    if (!(await datosContratacionForm.trigger())) {
      setValue("datos-contratacion");

      return false;
    }

    return true;
  }

  async function guardarTrabajador() {
    const validos = await formulariosSonValidos();

    if (!validos) return;

    const datosPersonales = datosPersonalesForm.getValues();
    const datosMedicos = datosMedicosForm.getValues();
    const datosAcademicos = datosAcademicosForm.getValues();
    const datosContratacion = datosContratacionForm.getValues();
    const trabajador = {
      datosMedico: datosMedicos,
      datosAcademicos: datosAcademicos,
      ...{ ...datosPersonales, ...datosContratacion },
    };
    console.log(trabajador);
    mutation.mutate(trabajador);
  }
  const datosPersonalesForm = useForm<DatosPersonales>({
    resolver: zodResolver(datosPersonalesSchema),
  });

  const datosMedicosForm = useForm<DatosMedicos>({
    resolver: zodResolver(datosMedicosSchema),
  });

  const datosAcademicosForm = useForm<DatosAcademicos>({
    resolver: zodResolver(datosAcademicosSchema),
  });

  const datosContratacionForm = useForm<DatosContratacion>({
    resolver: zodResolver(datosContratacionSchema),
  });

  const [value, setValue] = useState<AccordionValue | undefined>();

  // Sincroniza los datos obtenidos con los formularios
  useEffect(() => {
    if (data) {
      datosPersonalesForm.reset({
        nombre: data.nombre,
        fechanacimiento: new Date(data.fechanacimiento),
        curp: data.curp,
        rfc: data.rfc,
        ine: data.ine,
        estadocivil: data.estadocivil,
        numerofijo: data.numerofijo,
        numerocelular: data.numerocelular,
        correo: data.correo,
        direccion: data.direccion,
        numerolicencia: data.numerolicencia,
        numeropasaporte: data.numeropasaporte,
        fechaingreso: new Date(data.fechaingreso),
      });

      datosMedicosForm.reset(data.datosMedicos);
      datosAcademicosForm.reset(data.datosAcademicos);
      datosContratacionForm.reset({
        tipocontrato: data.tipocontrato,
        estado: data.estado,
        iniciocontrato: new Date(data.iniciocontrato),
        fincontrato: new Date(data.fincontrato),
      });
      setValue("datos-personales");
    }
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contratos">Contratos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="editar-contratos">
                Editar contrato
              </BreadcrumbLink>
            </BreadcrumbItem>

          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="p-4">
        <Accordion
          type="single"
          collapsible
          value={value}
          onValueChange={setValue}
        >
          <AccordionItem value="datos-personales">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Personales
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosPersonalesForm
                form={datosPersonalesForm}
                onSubmit={() => setValue("datos-medicos")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-medicos">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Médicos
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosMedicosForm
                form={datosMedicosForm}
                onSubmitMed={() => setValue("datos-academicos")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-academicos">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Académicos
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosAcademicosForm
                form={datosAcademicosForm}
                onSubmitAcd={() => setValue("datos-contratacion")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-contratacion">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos de Contratación
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosContratacionForm
                form={datosContratacionForm}
                onSubmitCon={() => guardarTrabajador()}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
