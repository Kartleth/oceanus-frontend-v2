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

export function PageEditarFianzaAnticipo() {
  const { idcontrato } = useParams<{
    idcontrato: string;
  }>();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: unknown) => {
    console.log(data);
    const res = await fetch(
      `http://localhost:3001/fianza/contrato/${idcontrato}/fianza-anticipo`,
      {
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
    navigate(`/contratos/${idcontrato}/fianza-anticipo`);
  });
  const [value, setValue] = useState<AccordionValue>("datos-anticipos");
  const datosFianzaAnticiposForm = useForm<DatosFianzaAnticipos>({
    resolver: zodResolver(datosFianzaAnticipoSchema),
  });

  function onSubmitAntic(values: DatosFianzaAnticipos) {
    console.log(values);
    guardarFianza();
  }

  async function guardarFianza() {
    const validos = await formulariosSonValidos();
    if (!validos) return;

    const DatosFianzaAnticipos = datosFianzaAnticiposForm.getValues();
    const formattedData = {
      idContrato: Number(idcontrato),
      ...DatosFianzaAnticipos,
      inicio: DatosFianzaAnticipos.inicio
        ? DatosFianzaAnticipos.inicio.toISOString().split("T")[0]
        : undefined,
      fin: DatosFianzaAnticipos.fin
        ? DatosFianzaAnticipos.fin.toISOString().split("T")[0]
        : undefined,
      monto: Number(DatosFianzaAnticipos.monto),
    };
    console.log("Estos son los datos mandados: ", formattedData);
    mutation.mutate(formattedData);
  }

  async function formulariosSonValidos() {
    if (!(await datosFianzaAnticiposForm.trigger())) {
      setValue("datos-anticipos");
      return false;
    }
    return true;
  }

  const erroresAnticipo = Object.keys(
    datosFianzaAnticiposForm.formState.errors
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
              <BreadcrumbLink href={`/contratos/${idcontrato}/fianza-anticipo`}>
                Fianzas de Anticipo de contrato {idcontrato}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbLink
              href={`/contratos/${idcontrato}/fianza-anticipo/agregar-fianza-anticipo`}
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
          <AccordionItem value="datos-anticipos">
            <AccordionTrigger
              data-haserrors={erroresAnticipo > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[haserrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos de Fianza de Anticipo ${
                erroresAnticipo > 0 ? `(${erroresAnticipo} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaAnticiposForm
                form={datosFianzaAnticiposForm}
                onSubmit={onSubmitAntic}
              ></DatosFianzaAnticiposForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
