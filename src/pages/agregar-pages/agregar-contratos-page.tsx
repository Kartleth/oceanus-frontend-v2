import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
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
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { DatosPersonalesForm } from "@/components/forms/datos-personales-form";
import { DatosMedicosForm } from "@/components/forms/datos-medicos-form";
import { DatosAcademicosForm } from "@/components/forms/datos-academicos-form";
import {
  DatosContratacionForm,
  datosContratacionSchema,
} from "@/components/forms/datos-contratacion-form";
import {
  DatosGeneralesContratacion,
  DatosGeneralesContratacionForm,
  datosGeneralesSchema,
} from "@/components/forms/datos-contratacion/datos-generales-form";
import {
  DatosFianzaCumplimientos,
  datosFianzaCumplimientoSchema,
} from "@/components/forms/datos-contratacion/datos-fianza-cumplimiento-form";
import {
  DatosFianzaOcultos,
  datosFianzaOcultosSchema,
} from "@/components/forms/datos-contratacion/datos-fianza-ocultos-form";
import {
  DatosFianzaAnticipos,
  datosFianzaAnticipoSchema,
} from "@/components/forms/datos-contratacion/datos-fianza-anticipo-form";

type AccordionValue =
  | "datos-personales"
  | "datos-medicos"
  | "datos-academicos"
  | "datos-contratacion"
  | string;

export function PageAgregarContratos() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/contratos", {
      method: "post",
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
    navigate("/contratos");
  });
  const [value, setValue] = useState<AccordionValue>("datos-generales"); //Mantiene el estado en un componente.
  const datosGeneralesContratacionForm = useForm<DatosGeneralesContratacion>({
    resolver: zodResolver(datosContratacionSchema),
  });
  function onSubmitCon(values: DatosGeneralesContratacion) {
    console.log(values);

    if (values.tipocontrato !== "indefinido" && !values.fincontrato) {
      datosGeneralesContratacionForm.setError("fincontrato", {
        message: "La fecha de fin de contrato es obligatoria.",
        type: "required",
      });

      return;
    }

    guardarTrabajador();
  }
  const datosGeneralesForm = useForm<DatosGeneralesContratacion>({
    resolver: zodResolver(datosGeneralesSchema),
  });
  function onSubmitAcd(values: DatosGeneralesContratacion) {
    console.log(values);
    setValue("datos-generales");
  }
  const datosCumplimientoForm = useForm<DatosFianzaCumplimientos>({
    resolver: zodResolver(datosFianzaCumplimientoSchema),
  });
  function onSubmitMed(values: DatosFianzaCumplimientos) {
    console.log(values);
    setValue("datos-cumplimiento");
  }

  const datosOcultosForm = useForm<DatosFianzaOcultos>({
    resolver: zodResolver(datosFianzaOcultosSchema),
  });
  function onSubmit(values: DatosFianzaOcultos) {
    console.log(values);
    setValue("datos-ocultos");
  }

  const datosAnticipoForm = useForm<DatosFianzaAnticipos>({
    resolver: zodResolver(datosFianzaAnticipoSchema),
  });
  function onSubmit(values: DatosFianzaAnticipos) {
    console.log(values);
    setValue("datos-anticipos");
  }

  async function formulariosSonValidos() {
    if (!(await datosGeneralesForm.trigger())) {
      setValue("datos-generales");

      return false;
    }
    if (!(await datosCumplimientoForm.trigger())) {
      setValue("datos-cumplimiento");

      return false;
    }
    if (!(await datosOcultosForm.trigger())) {
      setValue("datos-ocultos");

      return false;
    }
    if (!(await datosAnticipoForm.trigger())) {
      setValue("datos-anticipo");

      return false;
    }

    return true;
  }

  async function guardarTrabajador() {
    const validos = await formulariosSonValidos();

    if (!validos) return;

    const datosGenerales = datosGeneralesForm.getValues();
    const datosAnticipo = datosAnticipoForm.getValues();
    const datosCumplimiento = datosCumplimientoForm.getValues();
    const datosOcultos = datosOcultosForm.getValues();
    const trabajador = {
      datosGenerales: datosGenerales,
      datosFianza: { ...datosAnticipo, ...datosCumplimiento, ...datosOcultos },
    };
    console.log(trabajador);
    mutation.mutate(trabajador);
  }

  const erroresGenerales = Object.keys(
    datosGeneralesForm.formState.errors
  ).length;

  const erroresMedicos = Object.keys(datosMedicosForm.formState.errors).length;

  const erroresAcademicos = Object.keys(
    datosGeneralesForm.formState.errors
  ).length;

  const erroresContratacion = Object.keys(
    datosGeneralesContratacionForm.formState.errors
  ).length;

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Agregar Contratos
              </BreadcrumbPage>
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
          <AccordionItem value="datos-generales">
            <AccordionTrigger
              data-hasErrors={erroresGenerales > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Personales ${
                erroresGenerales > 0 ? `(${erroresGenerales} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosGeneralesContratacionForm
                form={datosGeneralesForm}
                onSubmit={onSubmit}
              ></DatosGeneralesContratacionForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-medicos">
            <AccordionTrigger
              data-hasErrors={erroresMedicos > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Médicos ${
                erroresMedicos > 0 ? `(${erroresMedicos} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosMedicosForm
                form={datosMedicosForm}
                onSubmitMed={onSubmitMed}
              ></DatosMedicosForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-academicos">
            <AccordionTrigger
              data-hasErrors={erroresAcademicos > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Académicos ${
                erroresAcademicos > 0 ? `(${erroresAcademicos} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosAcademicosForm
                form={datosGeneralesForm}
                onSubmitAcd={onSubmitAcd}
              ></DatosAcademicosForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-contratacion">
            <AccordionTrigger
              data-hasErrors={erroresContratacion > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos de Contratación ${
                erroresContratacion > 0
                  ? `(${erroresContratacion} errores)`
                  : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosContratacionForm
                form={datosGeneralesContratacionForm}
                onSubmitCon={onSubmitCon}
              ></DatosContratacionForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
