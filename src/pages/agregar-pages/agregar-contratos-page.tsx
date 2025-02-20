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
import { datosContratacionSchema } from "@/components/forms/datos-trabajador-forms/datos-contratacion-form";
import {
  DatosGeneralesContratacion,
  DatosGeneralesContratacionForm,
  datosGeneralesSchema,
} from "@/components/forms/datos-contratacion/datos-generales-form";
import {
  DatosFianzaCumplimientos,
  datosFianzaCumplimientoSchema,
  DatosFianzaCumplimientosForm,
} from "@/components/forms/datos-contratacion/datos-fianza-cumplimiento-form";
import {
  DatosFianzaOcultos,
  DatosFianzaOcultosForm,
  datosFianzaOcultosSchema,
} from "@/components/forms/datos-contratacion/datos-fianza-ocultos-form";
import {
  DatosFianzaAnticipos,
  datosFianzaAnticipoSchema,
  DatosFianzaAnticiposForm,
} from "@/components/forms/datos-contratacion/datos-fianza-anticipo-form";

type AccordionValue =
  | "datos-generales"
  | "datos-cumplimiento"
  | "datos-ocultos"
  | "datos-anticipos"
  | string;

export function PageAgregarContratos() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/contrato", {
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
    queryClient.invalidateQueries(["contratos"]);
    navigate("/contratos");
  });
  const [value, setValue] = useState<AccordionValue>("datos-generales"); //Mantiene el estado en un componente.
  const datosGeneralesContratacionForm = useForm<DatosGeneralesContratacion>({
    resolver: zodResolver(datosContratacionSchema),
  });
  const datosGeneralesForm = useForm<DatosGeneralesContratacion>({
    resolver: zodResolver(datosGeneralesSchema),
  });
  function onSubmitGe(values: DatosGeneralesContratacion) {
    console.log(values);
    setValue("datos-cumplimiento");
  }
  const datosCumplimientoForm = useForm<DatosFianzaCumplimientos>({
    resolver: zodResolver(datosFianzaCumplimientoSchema),
  });
  function onSubmitCum(values: DatosFianzaCumplimientos) {
    console.log(values);
    setValue("datos-ocultos");
  }

  const datosOcultosForm = useForm<DatosFianzaOcultos>({
    resolver: zodResolver(datosFianzaOcultosSchema),
  });
  function onSubmitOcu(values: DatosFianzaOcultos) {
    console.log(values);
    setValue("datos-anticipos");
  }

  const datosAnticipoForm = useForm<DatosFianzaAnticipos>({
    resolver: zodResolver(datosFianzaAnticipoSchema),
  });
  function onSubmitAntic(values: DatosFianzaAnticipos) {
    console.log(values);
    setValue("datos-anticipos");
    guardarContratos();
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
      setValue("datos-anticipos");

      return false;
    }

    return true;
  }

  async function guardarContratos() {
    const validos = await formulariosSonValidos();

    if (!validos) return;

    const datosGenerales = datosGeneralesForm.getValues();
    const datosAnticipo = datosAnticipoForm.getValues();
    const datosCumplimiento = datosCumplimientoForm.getValues();
    const datosOcultos = datosOcultosForm.getValues();
    const contrato = {
      nombreContrato: datosGenerales.nombrecontrato,
      idContratante: 1,
      idContratado: 2,
      personal: [],
      tipoSubcontrato: datosGenerales.subcontrato,
      iniciocontrato: datosGenerales.iniciocontrato,
      fincontrato: datosGenerales.fincontrato,
      convenio: [],
      fianzaCumplimiento: {
        // documento: datosCumplimiento.documento,
        tipodecambio: datosCumplimiento.tipodecambio,
        inicio: datosCumplimiento.inicio,
        anticipodoc: datosCumplimiento.anticipodoc,
        fin: datosCumplimiento.fin,
        poliza: datosCumplimiento.poliza,
        aseguradora: datosCumplimiento.aseguradora,
        monto: datosCumplimiento.monto,
      },
      fianzaOculto: datosOcultos,
      fianzaAnticipo: datosAnticipo,
      montoContrato: datosGenerales.montocontrato,
      anticipoContrato: datosGenerales.anticipocontrato,
      direccion: datosGenerales.direccion,
      numeroContrato: datosGenerales.numerocontrato,
      facturas: [],
      ordenes: [],
    };
    console.log(contrato);
    mutation.mutate(contrato);
  }

  const erroresGenerales = Object.keys(
    datosGeneralesForm.formState.errors
  ).length;

  const erroresAnticipo = Object.keys(
    datosAnticipoForm.formState.errors
  ).length;
  const erroresCumplimiento = Object.keys(
    datosCumplimientoForm.formState.errors
  ).length;
  const erroresOculto = Object.keys(datosOcultosForm.formState.errors).length;

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
              data-haserrors={erroresGenerales > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Generales ${
                erroresGenerales > 0 ? `(${erroresGenerales} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosGeneralesContratacionForm
                form={datosGeneralesForm}
                onSubmitCon={onSubmitGe}
              ></DatosGeneralesContratacionForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-cumplimiento">
            <AccordionTrigger
              data-haserrors={erroresCumplimiento > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Cumplimiento ${
                erroresCumplimiento > 0
                  ? `(${erroresCumplimiento} errores)`
                  : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaCumplimientosForm
                form={datosCumplimientoForm}
                onSubmit={onSubmitCum}
              ></DatosFianzaCumplimientosForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-ocultos">
            <AccordionTrigger
              data-haserrors={erroresOculto > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Ocultos ${
                erroresOculto > 0 ? `(${erroresOculto} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaOcultosForm
                form={datosOcultosForm}
                onSubmit={onSubmitOcu}
              ></DatosFianzaOcultosForm>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-anticipos">
            <AccordionTrigger
              data-haserrors={erroresAnticipo > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Anticipo ${
                erroresAnticipo > 0 ? `(${erroresAnticipo} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaAnticiposForm
                form={datosAnticipoForm}
                onSubmit={onSubmitAntic}
              ></DatosFianzaAnticiposForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
