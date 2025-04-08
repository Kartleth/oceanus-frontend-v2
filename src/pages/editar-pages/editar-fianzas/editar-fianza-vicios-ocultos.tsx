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
  DatosFianzaOcultos,
  DatosFianzaOcultosForm,
  datosFianzaOcultosSchema,
} from "@/components/forms/datos-contratacion/datos-fianza-ocultos-form";
import { Fianza } from "@/modelos/datosFianza";

type AccordionValue = "datos-ocultos";

export function PageEditarFianzaViciosOcultos() {
  const { idcontrato, idFianzaViciosO } = useParams<{
    idcontrato: string;
    idFianzaViciosO: string;
  }>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["fianzaOcultos", idcontrato, idFianzaViciosO],
    queryFn: async () => {
      const res = await fetch(
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      const fianzaParse = Fianza.safeParse(resData);
      if (!fianzaParse.success) {
        console.error(fianzaParse.error.format());
        throw new Error("Error al parsear la fianza");
      }
      return fianzaParse.data;
    },
  });

  const mutation = useMutation(async (data: unknown) => {
    console.log(data);
    const res = await fetch(
      `http://localhost:3001/fianza/${idcontrato}/${idFianzaViciosO}`,
      {
        method: "PUT",
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
    queryClient.invalidateQueries([
      "fianzaOcultos",
      idcontrato,
      idFianzaViciosO,
    ]);
    navigate(`/contratos/${idcontrato}/fianza-vicios-ocultos`);
  });

  async function formulariosSonValidos() {
    if (!(await datosFianzaOcultosForm.trigger())) {
      setValue("datos-ocultos");
      return false;
    }
    return true;
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
  const [value, setValue] = useState<AccordionValue | undefined>();

  const datosFianzaOcultosForm = useForm<DatosFianzaOcultos>({
    resolver: zodResolver(datosFianzaOcultosSchema),
  });

  useEffect(() => {
    if (data) {
      datosFianzaOcultosForm.reset({
        tipodecambio: data.tipodecambio,
        inicio: data.inicio ? new Date(data.inicio) : undefined,
        fin: data.fin ? new Date(data.fin) : undefined,
        poliza: data.poliza,
        aseguradora: data.aseguradora,
        monto: data.monto,
      });
      setValue("datos-ocultos");
    }
    console.log(data);
  }, [datosFianzaOcultosForm, data]);

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
                Fianzas de vicios de oculto de contrato {idcontrato}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbLink
              href={`/contratos/${idcontrato}/fianza-vicios-ocultos/editar-fianza-vicios-ocultos/${idFianzaViciosO}`}
            >
              Editar fianza
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
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos de fianza de vicios de ocultos
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaOcultosForm
                form={datosFianzaOcultosForm}
                onSubmit={() => guardarFianza()}
              ></DatosFianzaOcultosForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
