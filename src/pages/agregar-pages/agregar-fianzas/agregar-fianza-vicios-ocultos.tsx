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
  DatosFianzaOcultos,
  DatosFianzaOcultosForm,
  datosFianzaOcultosSchema,
} from "@/components/forms/datos-contratacion/datos-fianza-ocultos-form";

type AccordionValue = "datos-ocultos";

export function PageAgregarFianzaViciosOcultos() {
  const { idcontrato } = useParams<{
    idcontrato: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: unknown) => {
    console.log(data);
    const res = await fetch(
      `http://localhost:3001/fianza/contrato/${idcontrato}/fianza-oculto`,
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
    queryClient.invalidateQueries(["fianzaOcultos"]);
    navigate(`/contratos/${idcontrato}/fianza-vicios-ocultos`);
  });
  const [value, setValue] = useState<AccordionValue>("datos-ocultos");
  const datosFianzaOcultosForm = useForm<DatosFianzaOcultos>({
    resolver: zodResolver(datosFianzaOcultosSchema),
  });

  function onSubmitOcu(values: DatosFianzaOcultos) {
    console.log(values);
    guardarFianza();
  }

  async function guardarFianza() {
    const validos = await formulariosSonValidos();
    if (!validos) return;

    const DatosFianzaOcultos = datosFianzaOcultosForm.getValues();
    const formattedData = {
      idContrato: Number(idcontrato),
      ...DatosFianzaOcultos,
      inicio: DatosFianzaOcultos.inicio
        ? DatosFianzaOcultos.inicio.toISOString().split("T")[0]
        : undefined,
      fin: DatosFianzaOcultos.fin
        ? DatosFianzaOcultos.fin.toISOString().split("T")[0]
        : undefined,
      monto: Number(DatosFianzaOcultos.monto),
    };
    console.log("Estos son los datos mandados: ", formattedData);
    mutation.mutate(formattedData);
  }

  async function formulariosSonValidos() {
    if (!(await datosFianzaOcultosForm.trigger())) {
      setValue("datos-ocultos");
      return false;
    }
    return true;
  }

  const erroresOcultos = Object.keys(
    datosFianzaOcultosForm.formState.errors
  ).length;

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-gray-50 p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contratos">Contratos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/contratos/${idcontrato}/fianza-vicios-ocultos`}>
                Fianzas de vicios de ocultos de contrato {idcontrato}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbLink
              href={`/contratos/${idcontrato}/fianza-vicios-ocultos/agregar-fianza-vicios-ocultos`}
            >
              Agregar fianza
            </BreadcrumbLink>
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
          <AccordionItem value="datos-ocultos">
            <AccordionTrigger
              data-haserrors={erroresOcultos > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos de Fianza de Vicios de Ocultos ${
                erroresOcultos > 0 ? `(${erroresOcultos} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaOcultosForm
                form={datosFianzaOcultosForm}
                onSubmit={onSubmitOcu}
              ></DatosFianzaOcultosForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
