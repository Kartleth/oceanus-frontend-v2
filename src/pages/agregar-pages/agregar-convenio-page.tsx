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
import { useNavigate, useParams } from "react-router-dom";
import {
  DatosConvenio,
  DatosConvenioForm,
  datosConvenioSchema,
} from "@/components/forms/datos-convenio/datos-convenio-form";

type AccordionValue = "datos-convenio" | string;

export function PageAgregarConvenio() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/convenio", {
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
    queryClient.invalidateQueries(["convenios"]);
    navigate("/contratos/:idcontrato/convenio");
  });
  const [value, setValue] = useState<AccordionValue>("datos-convenio"); //Mantiene el estado en un componente.

  function onSubmit(values: DatosConvenio) {
    console.log(values);
    setValue("datos-convenio");
    guardarConvenio();
  }
  const datosConvenioForm = useForm<DatosConvenio>({
    resolver: zodResolver(datosConvenioSchema),
  });
  async function formulariosSonValidos() {
    if (!(await datosConvenioForm.trigger())) {
      setValue("datos-convenio");

      return false;
    }

    return true;
  }

  async function guardarConvenio() {
    const validos = await formulariosSonValidos();
    const { idContrato } = useParams();

    if (!validos) return;

    const datosConvenio = datosConvenioForm.getValues();
    const convenio = {
      fechainicio: datosConvenio.fechainicio,
      montoadicional: datosConvenio.montoadicional,
      documento: datosConvenio.documento,
      fechafinal: datosConvenio.fechafinal,
      idContrato: Number(idContrato),
    };
    console.log(convenio);
    mutation.mutate(convenio);
  }

  const erroresGenerales = Object.keys(
    datosConvenioForm.formState.errors
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
                Agregar Convenio
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
              {`Datos Generales Convenio ${
                erroresGenerales > 0 ? `(${erroresGenerales} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosConvenioForm
                form={datosConvenioForm}
                onSubmit={onSubmit}
              ></DatosConvenioForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
