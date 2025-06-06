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
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
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

type AccordionValue =
  | "datos-personales"
  | "datos-medicos"
  | "datos-academicos"
  | "datos-contratacion"
  | string;

export function PageAgregarTrabajador() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/personas", {
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
    navigate("/personal");
  });
  const [value, setValue] = useState<AccordionValue>("datos-personales"); //Mantiene el estado en un componente.
  const datosContratacionForm = useForm<DatosContratacion>({
    resolver: zodResolver(datosContratacionSchema),
  });
  function onSubmitCon(values: DatosContratacion) {
    console.log(values);

    guardarTrabajador();
  }
  const datosAcademicosForm = useForm<DatosAcademicos>({
    resolver: zodResolver(datosAcademicosSchema),
  });
  function onSubmitAcd(values: DatosAcademicos) {
    console.log(values);
    setValue("datos-contratacion");
  }
  const datosMedicosForm = useForm<DatosMedicos>({
    resolver: zodResolver(datosMedicosSchema),
  });
  function onSubmitMed(values: DatosMedicos) {
    console.log(values);
    setValue("datos-academicos");
  }

  const datosPersonalesForm = useForm<DatosPersonales>({
    resolver: zodResolver(datosPersonalesSchema),
  });
  function onSubmit(values: DatosPersonales) {
    console.log(values);
    setValue("datos-medicos");
  }

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
      datosMedicos: datosMedicos,
      datosAcademicos: datosAcademicos,
      datosPersonales: { ...datosPersonales, ...datosContratacion },
    };
    console.log(trabajador);
    mutation.mutate(trabajador);
  }

  const erroresPersonales = Object.keys(
    datosPersonalesForm.formState.errors
  ).length;

  const erroresMedicos = Object.keys(datosMedicosForm.formState.errors).length;

  const erroresAcademicos = Object.keys(
    datosAcademicosForm.formState.errors
  ).length;

  const erroresContratacion = Object.keys(
    datosContratacionForm.formState.errors
  ).length;

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
              <BreadcrumbLink href="/agregar-trabajador">
                Agregar trabajador
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
            <AccordionTrigger
              data-haserrors={erroresPersonales > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Personales ${
                erroresPersonales > 0 ? `(${erroresPersonales} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosPersonalesForm
                form={datosPersonalesForm}
                onSubmit={onSubmit}
              ></DatosPersonalesForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-medicos">
            <AccordionTrigger
              data-haserrors={erroresMedicos > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
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
              data-haserrors={erroresAcademicos > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Académicos ${
                erroresAcademicos > 0 ? `(${erroresAcademicos} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosAcademicosForm
                form={datosAcademicosForm}
                onSubmitAcd={onSubmitAcd}
              ></DatosAcademicosForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-contratacion">
            <AccordionTrigger
              data-haserrors={erroresContratacion > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos de Contratación ${
                erroresContratacion > 0
                  ? `(${erroresContratacion} errores)`
                  : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosContratacionForm
                form={datosContratacionForm}
                onSubmitCon={onSubmitCon}
              ></DatosContratacionForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
