import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
import { datosContratacionSchema } from "@/components/forms/datos-trabajador-forms/datos-contratacion-form";
import {
  DatosGeneralesContratacion,
  DatosGeneralesContratacionForm,
  datosGeneralesSchema,
} from "@/components/forms/datos-contratacion/datos-generales-form";
import {
  DatosFianzaCumplimientos,
  datosFianzaCumplimientoSchema,
  DatosFianzaCumplimientosForm,
} from "@/components/forms/datos-contratacion/datos-fianza-cumplimiento-form";
import {
  DatosFianzaOcultos,
  DatosFianzaOcultosForm,
  datosFianzaOcultosSchema,
} from "@/components/forms/datos-contratacion/datos-fianza-ocultos-form";
import {
  DatosFianzaAnticipos,
  datosFianzaAnticipoSchema,
  DatosFianzaAnticiposForm,
} from "@/components/forms/datos-contratacion/datos-fianza-anticipo-form";
import { Contrato } from "@/modelos/datosContratos";

type AccordionValue =
  | "datos-generales"
  | "datos-cumplimiento"
  | "datos-ocultos"
  | "datos-anticipos"
  | string;

export function PageEditarContratos() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { data, isLoading } = useQuery({
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

  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch(`http://localhost:3001/contrato/${id}`, {
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
    queryClient.invalidateQueries(["contrato"]);
    navigate("/contratos");
  });

  async function formulariosSonValidos() {
    if (!(await datosGeneralesForm.trigger())) {
      setValue("datos-generales");

      return false;
    }
    if (!(await datosCumplimientoForm.trigger())) {
      setValue("datos-cumplimiento");

      return false;
    }
    if (!(await datosOcultosForm.trigger())) {
      setValue("datos-ocultos");

      return false;
    }
    if (!(await datosAnticipoForm.trigger())) {
      setValue("datos-anticipos");

      return false;
    }

    return true;
  }

  async function guardarContratos() {
    const validos = await formulariosSonValidos();

    if (!validos) return;

    const datosGenerales = datosGeneralesForm.getValues();
    const datosAnticipo = datosAnticipoForm.getValues();
    const datosCumplimiento = datosCumplimientoForm.getValues();
    const datosOcultos = datosOcultosForm.getValues();
    const contrato = {
      nombreContrato: datosGenerales.nombrecontrato,
      idContratante: 1,
      idContratado: 2,
      personal: [],
      tipoSubcontrato: datosGenerales.subcontrato,
      iniciocontrato: datosGenerales.iniciocontrato,
      fincontrato: datosGenerales.fincontrato,
      convenio: [],
      fianzaCumplimiento: {
        documento: datosCumplimiento.documento,
        tipodecambio: datosCumplimiento.tipodecambio,
        inicio: datosCumplimiento.inicio,
        anticipodoc: datosCumplimiento.anticipodoc,
        fin: datosCumplimiento.fin,
        poliza: datosCumplimiento.poliza,
        aseguradora: datosCumplimiento.aseguradora,
        monto: datosCumplimiento.monto,
      },
      fianzaOculto: datosOcultos,
      fianzaAnticipo: datosAnticipo,
      montoContrato: datosGenerales.montocontrato,
      anticipoContrato: datosGenerales.anticipocontrato,
      direccion: datosGenerales.direccion,
      numeroContrato: datosGenerales.numerocontrato,
      facturas: [],
      ordenes: [],
    };
    console.log(contrato);
    mutation.mutate(contrato);
  }
  const datosGeneralesForm = useForm<DatosGeneralesContratacion>({
    resolver: zodResolver(datosGeneralesSchema),
  });

  const datosOcultosForm = useForm<DatosFianzaOcultos>({
    resolver: zodResolver(datosFianzaOcultosSchema),
  });

  const datosCumplimientoForm = useForm<DatosFianzaCumplimientos>({
    resolver: zodResolver(datosFianzaCumplimientoSchema),
  });

  const datosAnticipoForm = useForm<DatosFianzaAnticipos>({
    resolver: zodResolver(datosFianzaAnticipoSchema),
  });

  const [value, setValue] = useState<AccordionValue | undefined>();

  // Sincroniza los datos obtenidos con los formularios
  useEffect(() => {
    if (data) {
      datosGeneralesForm.reset({
        nombrecontrato: data.nombrecontrato,
        subcontrato: data.subcontrato,
        iniciocontrato: new Date(data.iniciocontrato),
        fincontrato: data.fincontrato ? new Date(data.fincontrato) : new Date(),
        montocontrato: data.montocontrato,
        anticipocontrato: data.anticipocontrato,
        direccion: data.direccion,
        numerocontrato: data.numerocontrato,
      });

      datosAnticipoForm.reset({
        documento: data.fianzaanticipo?.documento ?? undefined,
        tipodecambio: data.fianzaanticipo?.tipodecambio,
        inicio: data.fianzaanticipo?.inicio
          ? new Date(data.fianzaanticipo?.inicio)
          : undefined,
        anticipodoc: data.fianzaanticipo?.anticipodoc,
        fin: data.fianzaanticipo?.fin
          ? new Date(data.fianzaanticipo?.fin)
          : new Date(),
        poliza: data.fianzaanticipo?.poliza,
        aseguradora: data.fianzaanticipo?.aseguradora,
        monto: data.fianzaanticipo?.monto,
      });
      datosCumplimientoForm.reset({
        documento: data.fianzacumplimiento?.documento ?? undefined,
        tipodecambio: data.fianzacumplimiento?.tipodecambio,
        inicio: data.fianzacumplimiento?.inicio
          ? new Date(data.fianzacumplimiento?.inicio)
          : undefined,
        anticipodoc: data.fianzacumplimiento?.anticipodoc,
        fin: data.fianzacumplimiento?.fin
          ? new Date(data.fianzacumplimiento?.fin)
          : undefined,
        poliza: data.fianzacumplimiento?.poliza,
        aseguradora: data.fianzacumplimiento?.aseguradora,
        monto: data.fianzacumplimiento?.monto,
      });
      datosOcultosForm.reset({
        documento: data.fianzaoculto?.documento ?? undefined,
        tipodecambio: data.fianzaoculto?.tipodecambio,
        inicio: data.fianzaoculto?.inicio
          ? new Date(data.fianzaoculto.inicio)
          : undefined,
        anticipodoc: data.fianzaoculto?.anticipodoc,
        fin: data.fianzaoculto?.fin
          ? new Date(data.fianzaoculto?.fin)
          : undefined,
        poliza: data.fianzaoculto?.poliza,
        aseguradora: data.fianzaoculto?.aseguradora,
        monto: data.fianzaoculto?.monto,
      });
      setValue("datos-contrato");
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
          <AccordionItem value="datos-personales">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Generales
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosGeneralesContratacionForm
                form={datosGeneralesForm}
                onSubmitCon={() => setValue("datos-generales")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-medicos">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Cumplimiento
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosFianzaCumplimientosForm
                form={datosCumplimientoForm}
                onSubmit={() => setValue("datos-cumplimiento")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-academicos">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Ocultos
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosFianzaOcultosForm
                form={datosOcultosForm}
                onSubmit={() => setValue("datos-ocultos")}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="datos-contratacion">
            <AccordionTrigger className="bg-gray-100 text-gray-800 font-bold p-4 rounded-t-md border-b border-gray-300 transition-all hover:bg-gray-200">
              Datos Anticipos
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <DatosFianzaAnticiposForm
                form={datosAnticipoForm}
                onSubmit={() => guardarContratos()}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
