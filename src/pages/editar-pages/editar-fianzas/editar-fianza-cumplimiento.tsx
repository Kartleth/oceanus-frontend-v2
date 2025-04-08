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
  DatosFianzaCumplimientos,
  datosFianzaCumplimientoSchema,
  DatosFianzaCumplimientosForm,
} from "@/components/forms/datos-contratacion/datos-fianza-cumplimiento-form";
import { Fianza } from "@/modelos/datosFianza";

type AccordionValue = "datos-cumplimiento";

export function PageEditarFianzaCumplimiento() {
  const { idcontrato, idFianzaCumplimiento } = useParams<{
    idcontrato: string;
    idFianzaCumplimiento: string;
  }>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["fianzaCmplimiento", idcontrato, idFianzaCumplimiento],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/fianza/contrato/${idcontrato}/fianza-cumplimiento/${idFianzaCumplimiento}`,
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
      `http://localhost:3001/fianza/${idcontrato}/${idFianzaCumplimiento}`,
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
      "fianzaCumplimiento",
      idcontrato,
      idFianzaCumplimiento,
    ]);
    navigate(`/contratos/${idcontrato}/fianza-cumplimiento`);
  });

  async function formulariosSonValidos() {
    if (!(await datosFianzaCumplimientoForm.trigger())) {
      setValue("datos-cumplimiento");
      return false;
    }
    return true;
  }

  async function guardarFianza() {
    const validos = await formulariosSonValidos();
    if (!validos) return;

    const DatosFianzaCumplimientos = datosFianzaCumplimientoForm.getValues();
    const formattedData = {
      idContrato: Number(idcontrato),
      ...DatosFianzaCumplimientos,
      inicio: DatosFianzaCumplimientos.inicio
        ? DatosFianzaCumplimientos.inicio.toISOString().split("T")[0]
        : undefined,
      fin: DatosFianzaCumplimientos.fin
        ? DatosFianzaCumplimientos.fin.toISOString().split("T")[0]
        : undefined,
      monto: Number(DatosFianzaCumplimientos.monto),
    };
    console.log("Estos son los datos mandados: ", formattedData);
    mutation.mutate(formattedData);
  }
  const [value, setValue] = useState<AccordionValue | undefined>();

  const datosFianzaCumplimientoForm = useForm<DatosFianzaCumplimientos>({
    resolver: zodResolver(datosFianzaCumplimientoSchema),
  });

  useEffect(() => {
    if (data) {
        datosFianzaCumplimientoForm.reset({
        tipodecambio: data.tipodecambio,
        inicio: data.inicio ? new Date(data.inicio) : undefined,
        fin: data.fin ? new Date(data.fin) : undefined,
        poliza: data.poliza,
        aseguradora: data.aseguradora,
        monto: data.monto,
      });
      setValue("datos-cumplimiento");
    }
    console.log(data);
  }, [datosFianzaCumplimientoForm, data]);

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
              <BreadcrumbLink href={`/contratos/${idcontrato}/fianza-cumplimiento`}>
                Fianzas de Cumplimiento de contrato {idcontrato}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbLink
              href={`/contratos/${idcontrato}/fianza-cumplimiento/editar-fianza-cumplimiento/${idFianzaCumplimiento}`}
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
              Datos de fianza de cumplimiento
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <DatosFianzaCumplimientosForm
                form={datosFianzaCumplimientoForm}
                onSubmit={() => guardarFianza()}
              ></DatosFianzaCumplimientosForm>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
