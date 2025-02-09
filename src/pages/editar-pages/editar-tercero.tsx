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
  DatosTerceros,
  DatosTercerosForm,
  datosTercerosSchema,
} from "@/components/forms/datos-tercero-form/datos-terceros-form";
import { Subcontratado } from "@/modelos/subcontratado";

type AccordionValue = "datos-tercero" | string;

export function PageEditarTercero() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
    queryKey: ["subcontratado", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/subcontratados/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      const personaParse = Subcontratado.safeParse(resData);
      if (!personaParse.success) {
        console.error(personaParse.error);
        throw new Error(personaParse.error.toString());
      }
      return personaParse.data;
    },
  });

  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch(`http://localhost:3001/subcontratados/${id}`, {
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
    queryClient.invalidateQueries(["subcontratado"]);
    navigate("/personal_terceros");
  });

  async function formulariosSonValidos() {
    if (!(await datosTercerosForm.trigger())) {
      setValue("datos-tercero");

      return false;
    }
    return true;
  }

  async function guardarTrabajador() {
    const validos = await formulariosSonValidos();

    if (!validos) return;

    const DatosTerceros = datosTercerosForm.getValues();
    console.log(DatosTerceros);
    mutation.mutate(DatosTerceros);
  }

  const [value, setValue] = useState<AccordionValue | undefined>();

  const datosTercerosForm = useForm<DatosTerceros>({
    resolver: zodResolver(datosTercerosSchema),
  });

  useEffect(() => {
    if (data) {
      datosTercerosForm.reset({
        nombre: data.nombre,
        rfc: data.rfc,
        nss: data.nss ?? undefined,
        ine: data.ine ?? undefined,
        curp: data.curp,
        estado: data.estado,
      });
      setValue("datos-tercero");
    }
    console.log(data);
  }, [data, datosTercerosForm]);

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
              <BreadcrumbLink href="/personal_terceros">
                Personal de terceros
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href={`/editar-tercero/:id`}>
                Editar tercero
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
          <AccordionItem value="datos-tercero">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos de tercero
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosTercerosForm
                form={datosTercerosForm}
                onSubmit={() => guardarTrabajador()}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
