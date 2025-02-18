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
  DatosCliente,
  DatosClienteForm,
  datosClienteSchema,
} from "@/components/forms/datos-cliente-forms/datos-cliente-form";
import {
  DatosFacturacionCliente,
  DatosFacturacionClieneForm,
  datosFacturacionClienteSchema,
} from "@/components/forms/datos-cliente-forms/datos-facturacionCliente-form";
import {
  DatosRepresentante,
  DatosRepresentanteForm,
  datosRepresentanteSchema,
} from "@/components/forms/datos-cliente-forms/datos-representateCliente-form";

import { Cliente } from "@/modelos/cliente";

type AccordionValue =
  | "datos-cliente"
  | "datos-facturacionCliente"
  | "datos-representante";

export function PageEditarCliente() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["cliente", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/cliente/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      const clienteParse = Cliente.safeParse(resData);
      if (!clienteParse.success) {
        console.error(clienteParse.error);
        throw new Error(clienteParse.error.toString());
      }
      return clienteParse.data;
    },
  });

  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch(`http://localhost:3001/cliente/${id}`, {
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
    queryClient.invalidateQueries(["cliente"]);
    navigate("/clientes");
  });

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
    console.log(cliente);
    mutation.mutate(cliente);
  }
  const datosClienteForm = useForm<DatosCliente>({
    resolver: zodResolver(datosClienteSchema),
  });
  const datosFacturacionClienteForm = useForm<DatosFacturacionCliente>({
    resolver: zodResolver(datosFacturacionClienteSchema),
  });
  const datosRepresentanteForm = useForm<DatosRepresentante>({
    resolver: zodResolver(datosRepresentanteSchema),
  });

  const [value, setValue] = useState<AccordionValue | undefined>();

  // Sincroniza los datos obtenidos con los formularios
  useEffect(() => {
    if (data) {
      datosClienteForm.reset({
        razonsocial: data.razonsocial ?? "",
        correo: data.correo ?? "",
        telefono: data.telefono ?? "",
      });
      datosFacturacionClienteForm.reset({
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

      setValue("datos-cliente");
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
              <BreadcrumbLink href="/clientes">Clientes</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/editar-cliente/:id`}>
                Ediar cliente
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
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Cliente
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosClienteForm
                form={datosClienteForm}
                onSubmitEmp={() => setValue("datos-facturacionCliente")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-facturacionCliente">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Facturación
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosFacturacionClieneForm
                form={datosFacturacionClienteForm}
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
                onSubmitRepLeg={() => guardarCliente()}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
