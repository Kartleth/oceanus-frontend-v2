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
  DatosFianzaCumplimientos,
  datosFianzaCumplimientoSchema,
  DatosFianzaCumplimientosForm,
} from "@/components/forms/datos-contratacion/datos-fianza-cumplimiento-form";

type AccordionValue = "datos-cumplimiento";

export function PageAgregarFianzaCumplimiento() {
  const { idcontrato } = useParams<{
    idcontrato: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: unknown) => {
    console.log(data);
    const res = await fetch(
      `http://localhost:3001/fianza/contrato/${idcontrato}/fianza-cumplimiento`,
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
    queryClient.invalidateQueries(["fianza"]);
    navigate(`/contratos/${idcontrato}/fianza-cumplimiento`);
  });
  const [value, setValue] = useState<AccordionValue>("datos-cumplimiento");
  const datosFianzaCumplimientoForm = useForm<DatosFianzaCumplimientos>({
    resolver: zodResolver(datosFianzaCumplimientoSchema),
  });

  function onSubmitCum(values: DatosFianzaCumplimientos) {
    console.log(values);
    guardarFianza();
  }

  async function guardarFianza() {
    const validos = await formulariosSonValidos();
    if (!validos) return;

    const DatosFianzaCumplimientos = datosFianzaCumplimientoForm.getValues();
    const formattedData = {
      idContrato: Number(idcontrato),
      ...DatosFianzaCumplimientos,
      inicio: DatosFianzaCumplimientos.inicio
        ? DatosFianzaCumplimientos.inicio.toISOString().split("T")[0]
        : undefined,
      fin: DatosFianzaCumplimientos.fin
        ? DatosFianzaCumplimientos.fin.toISOString().split("T")[0]
        : undefined,
      monto: Number(DatosFianzaCumplimientos.monto),
    };
    console.log("Estos son los datos mandados: ", formattedData);
    mutation.mutate(formattedData);
  }

  async function formulariosSonValidos() {
    if (!(await datosFianzaCumplimientoForm.trigger())) {
      setValue("datos-cumplimiento");
      return false;
    }
    return true;
  }

  const erroresCumplimiento = Object.keys(
    datosFianzaCumplimientoForm.formState.errors
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
              <BreadcrumbLink
                href={`/contratos/${idcontrato}/fianza-cumplimiento`}
              >
                Fianzas de Cumplimiento de contrato {idcontrato}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbLink
              href={`/contratos/${idcontrato}/fianza-cumplimiento/agregar-fianza-cumplimiento`}
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
          <AccordionItem value="datos-cumplimiento">
            <AccordionTrigger
              data-haserrors={erroresCumplimiento > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos de Fianza de Cumplimiento ${
                erroresCumplimiento > 0 ? `(${erroresCumplimiento} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaCumplimientosForm
                form={datosFianzaCumplimientoForm}
                onSubmit={onSubmitCum}
              ></DatosFianzaCumplimientosForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
