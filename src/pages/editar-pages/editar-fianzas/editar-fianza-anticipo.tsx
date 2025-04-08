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
  DatosFianzaAnticipos,
  datosFianzaAnticipoSchema,
  DatosFianzaAnticiposForm,
} from "@/components/forms/datos-contratacion/datos-fianza-anticipo-form";
import { Fianza } from "@/modelos/datosFianza";

type AccordionValue = "datos-anticipos";

export function PageEditarFianzaAnticipo() {
  const { idcontrato, idFianzaAnticipo } = useParams<{
    idcontrato: string;
    idFianzaAnticipo: string;
  }>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["fianzaAnticipo", idcontrato, idFianzaAnticipo],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/fianza/contrato/${idcontrato}/fianza-anticipo/${idFianzaAnticipo}`,
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
      `http://localhost:3001/fianza/${idcontrato}/${idFianzaAnticipo}`,
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
      "fianzaAnticipo",
      idcontrato,
      idFianzaAnticipo,
    ]);
    navigate(`/contratos/${idcontrato}/fianza-anticipo`);
  });

  async function formulariosSonValidos() {
    if (!(await datosFianzaAnticiposForm.trigger())) {
      setValue("datos-anticipos");
      return false;
    }
    return true;
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
  const [value, setValue] = useState<AccordionValue | undefined>();

  const datosFianzaAnticiposForm = useForm<DatosFianzaAnticipos>({
    resolver: zodResolver(datosFianzaAnticipoSchema),
  });

  useEffect(() => {
    if (data) {
      datosFianzaAnticiposForm.reset({
        tipodecambio: data.tipodecambio,
        inicio: data.inicio ? new Date(data.inicio) : undefined,
        fin: data.fin ? new Date(data.fin) : undefined,
        poliza: data.poliza,
        aseguradora: data.aseguradora,
        monto: data.monto,
      });
      setValue("datos-anticipos");
    }
    console.log(data);
  }, [datosFianzaAnticiposForm, data]);

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
              href={`/contratos/${idcontrato}/fianza-anticipo/editar-fianza-anticipo/${idFianzaAnticipo}`}
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
          <AccordionItem value="datos-anticipos">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos de fianza de anticipo
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaAnticiposForm
                form={datosFianzaAnticiposForm}
                onSubmit={() => guardarFianza()}
              ></DatosFianzaAnticiposForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
