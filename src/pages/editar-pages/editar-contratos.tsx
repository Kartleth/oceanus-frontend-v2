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
  DatosGeneralesContratacion,
  DatosGeneralesContratacionForm,
  datosGeneralesSchema,
} from "@/components/forms/datos-contratacion/datos-generales-form";
import { Contrato } from "@/modelos/datosContratos";

type AccordionValue = "datos-generales";

export function PageEditarContratos() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data } = useQuery({
    queryKey: ["contrato", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/contrato/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error(resData);
        throw new Error(resData.message);
      }
      const contratoParse = Contrato.safeParse(resData);
      if (!contratoParse.success) {
        console.error(contratoParse.error);
        throw new Error(contratoParse.error.toString());
      }
      return contratoParse.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: unknown) => {
      console.log("Datos enviados:", data);
      const res = await fetch(`http://localhost:3001/contrato/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resData = await res.json();
      if (!res.ok) {
        console.error("Error en la respuesta:", resData);
        throw new Error(resData.message || "Error al actualizar contrato");
      }

      return resData;
    },
    onSuccess: () => {
      console.log("Contrato actualizado con éxito");
      queryClient.invalidateQueries(["contrato"]);
      navigate("/contratos");
    },
    onError: (error) => {
      console.error("Error al guardar el contrato:", error);
      alert("Hubo un error al guardar el contrato");
    },
  });

  async function formulariosSonValidos() {
    if (!(await datosGeneralesForm.trigger())) {
      setValue("datos-generales");
      return false;
    }
    return true;
  }

  async function guardarContratos() {
    const validos = await formulariosSonValidos();
    if (!validos) return;

    const datosGenerales = datosGeneralesForm.getValues();
    console.log("Datos antes de enviar:", datosGenerales);

    const payload = {
      nombreContrato: datosGenerales.nombrecontrato,
      idContratado: parseInt(datosGenerales.contratado, 10),
      numeroContrato: datosGenerales.numerocontrato,
      tipoSubcontrato: datosGenerales.subcontrato,
      direccion: datosGenerales.direccion,
      iniciocontrato: datosGenerales.iniciocontrato?.toISOString(),
      fincontrato: datosGenerales.fincontrato?.toISOString(),
      montoContrato: parseFloat(datosGenerales.montocontrato),
      anticipoContrato: parseFloat(datosGenerales.anticipocontrato),
      personal: [],
    };

    console.log("Datos enviados:", payload);
    mutation.mutate(payload);
  }

  const [value, setValue] = useState<AccordionValue | undefined>();

  const datosGeneralesForm = useForm<DatosGeneralesContratacion>({
    resolver: zodResolver(datosGeneralesSchema),
  });

  useEffect(() => {
    if (data) {
      datosGeneralesForm.reset({
        nombrecontrato: data.nombrecontrato,
        subcontrato: data.subcontrato,
        numerocontrato: data.numerocontrato ?? "",
        iniciocontrato: new Date(data.iniciocontrato),
        fincontrato: data.fincontrato ? new Date(data.fincontrato) : new Date(),
        contratado: data.contratado?.idCliente?.toString() ?? "",
        montocontrato: data.montocontrato,
        anticipocontrato: data.anticipocontrato,
        direccion: data.direccion,
        personalcontrato:
          typeof data.personalcontrato === "string"
            ? data.personalcontrato
            : "",
      });

      setValue("datos-generales");
    }
    console.log("Este es data: ", data);
  }, [data, datosGeneralesForm]);

  return (
    <Layout>
      <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 bg-gray-50">
        <SidebarTrigger className="-ml-1" />
        <Separator className="h-6 w-px bg-gray-300 mx-2" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/contratos">Contratos</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="editar-contratos">
                Editar contrato
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
          <AccordionItem value="datos-generales">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Generales
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosGeneralesContratacionForm
                form={datosGeneralesForm}
                onSubmitCon={() => guardarContratos()}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
