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
import { useNavigate } from "react-router-dom";
import {
  DatosCliente,
  DatosClienteForm,
  datosClienteSchema,
} from "@/components/forms/datos-cliente-forms/datos-cliente-form";
import {
  DatosFacturacionCliente,
  DatosFacturacionClienteForm,
  datosFacturacionClienteSchema,
} from "@/components/forms/datos-cliente-forms/datos-facturacionCliente-form";
import {
  DatosRepresentante,
  DatosRepresentanteForm,
  datosRepresentanteSchema,
} from "@/components/forms/datos-cliente-forms/datos-representateCliente-form";

type AccordionValue =
  | "datos-cliente"
  | "datos-facturacionCliente"
  | "datos-representante";

export function PageAgregarCliente() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/cliente", {
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
    queryClient.invalidateQueries(["clientes"]);
    navigate("/clientes");
  });
  const [value, setValue] = useState<AccordionValue>("datos-cliente");

  const datosClienteForm = useForm<DatosCliente>({
    resolver: zodResolver(datosClienteSchema),
  });
  const datosFacturacionClienteForm = useForm<DatosFacturacionCliente>({
    resolver: zodResolver(datosFacturacionClienteSchema),
  });
  const datosRepresentanteForm = useForm<DatosRepresentante>({
    resolver: zodResolver(datosRepresentanteSchema),
  });

  function onSubmitEmp(values: DatosCliente) {
    console.log(values);
    setValue("datos-facturacionCliente");
  }
  function onSubmitFacEmp(values: DatosFacturacionCliente) {
    const formattedValues = {
      ...values,
      fechavencimientoconstancia: values.fechavencimientoconstancia
        ? new Date(values.fechavencimientoconstancia)
        : null,
    };
    console.log("Enviando datos al backend:", formattedValues);
    console.log(values);
    setValue("datos-representante");
  }
  function onSubmitRepLeg(values: DatosRepresentante) {
    console.log(values);
    guardarCliente();
  }

  async function formulariosSonValidos() {
    if (!(await datosClienteForm.trigger())) {
      setValue("datos-cliente");
      return false;
    }
    if (!(await datosFacturacionClienteForm.trigger())) {
      setValue("datos-facturacionCliente");
      return false;
    }
    if (!(await datosRepresentanteForm.trigger())) {
      setValue("datos-representante");
      return false;
    }
    return true;
  }

  async function guardarCliente() {
    const validos = await formulariosSonValidos();

    if (!validos) return;

    const datosCliente = datosClienteForm.getValues();
    const datosFacturacionCliente = datosFacturacionClienteForm.getValues();
    const datosRepresentante = datosRepresentanteForm.getValues();

    const cliente = {
      ...datosCliente,
      ...datosFacturacionCliente,
      ...datosRepresentante,
    };

    console.log("ESTA ES EL CLIENTE", cliente);
    mutation.mutate(cliente, {
      onError: (error: any) => {
        console.error("Errores del backend:", error.message);
        alert(
          `Errores en la solicitud:\n${JSON.stringify(error.message, null, 2)}`
        );
      },
    });
  }

  const erroresCliente = Object.keys(datosClienteForm.formState.errors).length;
  const erroresFacturacion = Object.keys(
    datosFacturacionClienteForm.formState.errors
  ).length;
  const erroresRepresentante = Object.keys(
    datosRepresentanteForm.formState.errors
  ).length;

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/clientes">Clientes</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/agregar-cliente`}>
                Agregar cliente
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
          <AccordionItem value="datos-cliente">
            <AccordionTrigger
              data-hasErrors={erroresCliente > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Cliente ${
                erroresCliente > 0 ? `(${erroresCliente} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosClienteForm
                form={datosClienteForm}
                onSubmitEmp={onSubmitEmp}
              ></DatosClienteForm>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-facturacionCliente">
            <AccordionTrigger
              data-hasErrors={erroresFacturacion > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Facturación ${
                erroresFacturacion > 0 ? `(${erroresFacturacion} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFacturacionClienteForm
                form={datosFacturacionClienteForm}
                onSubmitFacEmp={onSubmitFacEmp}
              ></DatosFacturacionClienteForm>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-representante">
            <AccordionTrigger
              data-hasErrors={erroresRepresentante > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos representante ${
                erroresRepresentante > 0
                  ? `(${erroresRepresentante} errores)`
                  : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosRepresentanteForm
                form={datosRepresentanteForm}
                onSubmitRepLeg={onSubmitRepLeg}
              ></DatosRepresentanteForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
