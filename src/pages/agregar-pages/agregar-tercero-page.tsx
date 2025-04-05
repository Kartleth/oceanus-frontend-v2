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
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  DatosTerceros,
  DatosTercerosForm,
  datosTercerosSchema,
} from "@/components/forms/datos-tercero-form/datos-terceros-form";

type AccordionValue = "datos-tercero";

export function PageAgregarTercero() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { idcontrato } = useParams();
  const mutation = useMutation(async (data: unknown) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/subcontratados", {
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
    queryClient.invalidateQueries(["subcontratados"]);
    navigate(`/contratos/${idcontrato}/personal_terceros`);
  });
  const [value, setValue] = useState<AccordionValue>("datos-tercero");
  const datosTercerosForm = useForm<DatosTerceros>({
    resolver: zodResolver(datosTercerosSchema),
  });
  function onSubmit(values: DatosTerceros) {
    console.log(values);
    guardarSubcontratado();
  }

  async function guardarSubcontratado() {
    const validos = await formulariosSonValidos();
    if (!validos) return;

    const DatosTerceros = datosTercerosForm.getValues();
    const subcontratos = {
      nombre: DatosTerceros.nombre,
      rfc: DatosTerceros.rfc,
      ine: DatosTerceros.ine,
      nss: DatosTerceros.nss,
      curp: DatosTerceros.curp,
      idContrato: Number(idcontrato),
    };
    console.log(subcontratos);
    mutation.mutate(subcontratos);
  }

  async function formulariosSonValidos() {
    if (!(await datosTercerosForm.trigger())) {
      setValue("datos-tercero");

      return false;
    }
    return true;
  }

  const erroresSubcontratado = Object.keys(
    datosTercerosForm.formState.errors
  ).length;
  const { idcontrato: idContrato } = useParams();
  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/personal_terceros">
                Personal de terceros
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/contratos/${idContrato}/personal_terceros/agregar-tercero`}
              >
                Agregar tercero
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
          onValueChange={setValue as (value: string) => void}
        >
          <AccordionItem value="datos-tercero">
            <AccordionTrigger
              data-haserrors={erroresSubcontratado > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos de tercero ${
                erroresSubcontratado > 0
                  ? `(${erroresSubcontratado} errores)`
                  : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosTercerosForm
                form={datosTercerosForm}
                onSubmit={onSubmit}
              ></DatosTercerosForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
