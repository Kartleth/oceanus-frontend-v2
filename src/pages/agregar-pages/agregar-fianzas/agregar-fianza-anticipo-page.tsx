import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import { useNavigate, useParams } from "react-router-dom";
import {
  DatosFianzaAnticipos,
  datosFianzaAnticipoSchema,
  DatosFianzaAnticiposForm,
} from "@/components/forms/datos-contratacion/datos-fianza-anticipo-form";

type AccordionValue = "datos-anticipos";

export function PageAgregarFianzaAnticipo() {
  const { idcontrato } = useParams<{
    idcontrato: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch(
      `http://localhost:3001/fianza/contrato/${idcontrato}/fianza-anticipo`,
      {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      console.error(resData);
    }
    console.log(resData);
    queryClient.invalidateQueries(["fianzaAnticipo"]);
    navigate(`/contratos/${idcontrato}/fianza-anticipo/`);
  });
  const [value, setValue] = useState<AccordionValue>("datos-anticipos"); //Mantiene el estado en un componente.

  const datosFianzaAnticipoForm = useForm<DatosFianzaAnticipos>({
    resolver: zodResolver(datosFianzaAnticipoSchema),
  });

  function onSubmitAntic(values: DatosFianzaAnticipos) {
    console.log(values);
    setValue("datos-anticipos");
    guardarFianza();
  }

  async function guardarFianza() {
    const validos = await formulariosSonValidos();
    if (!validos) return;

    const DatosTerceros = datosTercerosForm.getValues();
    console.log(DatosTerceros);
    mutation.mutate(DatosTerceros);
  }

  async function formulariosSonValidos() {
    if (!(await datosFianzaAnticipoForm.trigger())) {
      setValue("datos-anticipos");

      return false;
    }

    return true;
  }

  const erroresGenerales = Object.keys(
    datosFianzaAnticipoForm.formState.errors
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
                Agregar contrato
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
