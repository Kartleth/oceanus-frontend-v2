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
  DatosEmpresa,
  DatosEmpresaForm,
  datosEmpresaSchema,
} from "@/components/forms/datos-empresa-forms/datos-empresa-form";
import {
  DatosFacturacionEmpresa,
  DatosFacturacionEmpresaForm,
  datosFacturacionEmpresaSchema,
} from "@/components/forms/datos-empresa-forms/datos-facturacionEmpresa-form";
import {
  DatosRepresentante,
  DatosRepresentanteForm,
  datosRepresentanteSchema,
} from "@/components/forms/datos-empresa-forms/datos-representateEmpresa-form";

type AccordionValue =
  | "datos-empresa"
  | "datos-facturacionEmpresa"
  | "datos-representante"
  | string;

export function PageAgregarEmpresa() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/empresa", {
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
    queryClient.invalidateQueries(["empresas"]);
    navigate("/empresas");
  });
  const [value, setValue] = useState<AccordionValue>("datos-empresa");

  const datosEmpresaForm = useForm<DatosEmpresa>({
    resolver: zodResolver(datosEmpresaSchema),
  });
  const datosFacturacionEmpresaForm = useForm<DatosFacturacionEmpresa>({
    resolver: zodResolver(datosFacturacionEmpresaSchema),
  });
  const datosRepresentanteForm = useForm<DatosRepresentante>({
    resolver: zodResolver(datosRepresentanteSchema),
  });

  function onSubmitEmp(values: DatosEmpresa) {
    console.log(values);
    setValue("datos-facturacionEmpresa");
  }
  function onSubmitFacEmp(values: DatosFacturacionEmpresa) {
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
    guardarEmpresa();
  }

  async function formulariosSonValidos() {
    if (!(await datosEmpresaForm.trigger())) {
      setValue("datos-empresa");
      return false;
    }
    if (!(await datosFacturacionEmpresaForm.trigger())) {
      setValue("datos-facturacionEmpresa");
      return false;
    }
    if (!(await datosRepresentanteForm.trigger())) {
      setValue("datos-representante");
      return false;
    }
    return true;
  }

  async function guardarEmpresa() {
    const validos = await formulariosSonValidos();

    if (!validos) return;

    const datosEmpresa = datosEmpresaForm.getValues();
    const datosFacturacionEmpresa = datosFacturacionEmpresaForm.getValues();
    const datosRepresentante = datosRepresentanteForm.getValues();

    const empresa = {
      ...datosEmpresa,
      ...datosFacturacionEmpresa,
      ...datosRepresentante,
    };

    console.log("ESTA ES LA EMPRESA", empresa);
    mutation.mutate(empresa, {
      onError: (error: any) => {
        console.error("Errores del backend:", error.message);
        alert(
          `Errores en la solicitud:\n${JSON.stringify(error.message, null, 2)}`
        );
      },
    });
  }

  const erroresEmpresa = Object.keys(datosEmpresaForm.formState.errors).length;
  const erroresFacturacion = Object.keys(
    datosFacturacionEmpresaForm.formState.errors
  ).length;
  const erroresRepresentante = Object.keys(
    datosRepresentanteForm.formState.errors
  ).length;

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/empresas">Empresas</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/agregar-empresa`}>
                Agregar empresa
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
          <AccordionItem value="datos-empresa">
            <AccordionTrigger
              data-hasErrors={erroresEmpresa > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Empresa ${
                erroresEmpresa > 0 ? `(${erroresEmpresa} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosEmpresaForm
                form={datosEmpresaForm}
                onSubmitEmp={onSubmitEmp}
              ></DatosEmpresaForm>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-facturacionEmpresa">
            <AccordionTrigger
              data-hasErrors={erroresFacturacion > 0}
              className="[&[data-state=open]]:bg-gray-200 data-[hasErrors=true]:text-destructive p-4 rounded-t-md transition-colors"
            >
              {`Datos Facturación ${
                erroresFacturacion > 0 ? `(${erroresFacturacion} errores)` : ""
              }`}
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFacturacionEmpresaForm
                form={datosFacturacionEmpresaForm}
                onSubmitFacEmp={onSubmitFacEmp}
              ></DatosFacturacionEmpresaForm>
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
