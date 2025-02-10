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
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
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

import { Empresa } from "@/modelos/empresa";

type AccordionValue =
  | "datos-empresa"
  | "datos-facturacionEmpresa"
  | "datos-representante";

export function PageEditarEmpresa() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["empresa", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/empresa/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      const empresaParse = Empresa.safeParse(resData);
      if (!empresaParse.success) {
        console.error(empresaParse.error);
        throw new Error(empresaParse.error.toString());
      }
      return empresaParse.data;
    },
  });

  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch(`http://localhost:3001/empresa/${id}`, {
      method: "put",
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
    queryClient.invalidateQueries(["empresa"]);
    navigate("/empresas");
  });

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
    console.log(empresa);
    mutation.mutate(empresa);
  }
  const datosEmpresaForm = useForm<DatosEmpresa>({
    resolver: zodResolver(datosEmpresaSchema),
  });
  const datosFacturacionEmpresaForm = useForm<DatosFacturacionEmpresa>({
    resolver: zodResolver(datosFacturacionEmpresaSchema),
  });
  const datosRepresentanteForm = useForm<DatosRepresentante>({
    resolver: zodResolver(datosRepresentanteSchema),
  });

  const [value, setValue] = useState<AccordionValue | undefined>();

  // Sincroniza los datos obtenidos con los formularios
  useEffect(() => {
    if (data) {
      datosEmpresaForm.reset({
        razonsocial: data.razonsocial ?? "",
        correo: data.correo ?? "",
        telefono: data.telefono ?? "",
      });
      datosFacturacionEmpresaForm.reset({
        rfc: data.rfc ?? "",
        correofacturacion: data.correofacturacion ?? "",
        tiporegimen: data.tiporegimen ?? "",
        numerocuenta: data.numerocuenta ?? "",
        banco: data.banco ?? "",
        fechavencimientoconstancia: data.fechavencimientoconstancia
          ? new Date(data.fechavencimientoconstancia)
          : undefined,
      });
      datosRepresentanteForm.reset({
        representantelegal: data.representantelegal ?? "",
        correoRepresentantelegal: data.correoRepresentantelegal ?? "",
        telefonoRepresentantelegal: data.telefonoRepresentantelegal ?? "",
      });

      setValue("datos-empresa");
    }
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/empresas">Empresas</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/editar-empresa/:id`}>
                Ediar empresa
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
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Empresa
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosEmpresaForm
                form={datosEmpresaForm}
                onSubmitEmp={() => setValue("datos-facturacionEmpresa")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-facturacionEmpresa">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Facturación
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosFacturacionEmpresaForm
                form={datosFacturacionEmpresaForm}
                onSubmitFacEmp={() => setValue("datos-representante")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-representante">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Representante
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosRepresentanteForm
                form={datosRepresentanteForm}
                onSubmitRepLeg={() => guardarEmpresa()}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
