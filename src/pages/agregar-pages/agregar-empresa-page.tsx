import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import {
  FormSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  DatosPersonales,
  DatosPersonalesForm,
  datosPersonalesSchema,
} from "@/components/forms/datos-personales-form";

type AccordionValue =
  | "datos-personales"
  | "datos-medicos"
  | "datos-academicos"
  | "datos-contratacion"
  | string;

const datosMedicosSchema = z.object({
  alergias: z.string({ message: "Introduce el tipo de alergias." }).optional(),
  enfercronicas: z
    .string({ message: "Introduce si padeces de una enfermedad cronica." })
    .optional(),
  lesiones: z.string({ message: "Introduce lesiones." }).optional(),
  alergiasmed: z.string({ message: "" }),
  numseguro: z.string({ required_error: "Numero seguro obligatorio." }),
  relaemergencia: z.string({
    required_error: "Relacion con trabajador obligaoria.",
  }),
  numemergencia: z.string({
    required_error: "Numero de emergencia obligatorio.",
  }),
  tiposangre: z.string({ required_error: "Tipo de sangre obligatorio." }),
  genero: z.string({ required_error: "Genero obligatorio." }),
  nombremergencia: z.string({
    required_error: "Nombre de persona emergencia obligatorio.",
  }),
});

const datosAcademicosSchema = z.object({
  cedula: z
    .string({ required_error: "Ingresa cedula profesional." })
    .optional(),
  carrera: z.string({ required_error: "Carrera obligatorio." }),
  explaboral: z
    .string({ required_error: "Ingresa experiencia laboral." })
    .optional(),
  certificaciones: z
    .string({ required_error: "Introduce certificaciones." })
    .optional(),
  gradoestudios: z.string({ required_error: "Nivel de estudios obligatorio" }),
});
const datosContratacionSchema = z.object({
  tipocontrato: z.string({ required_error: "Tipo de contrato obligatorio." }),
  estado: z.string({ required_error: "Campo obligatorio." }),
  iniciocontrato: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
  fincontrato: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
});

type DatosMedicosForm = z.infer<typeof datosMedicosSchema>;
type DatosAcademicosForm = z.infer<typeof datosAcademicosSchema>;
type DatosContratacionForm = z.infer<typeof datosContratacionSchema>;

export function PageAgregarEmpresa() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(async (data: any) => {
    console.log(data);
    const res = await fetch("http://localhost:3001/personas", {
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
    queryClient.invalidateQueries(["trabajadores"]);
    navigate("/personal");
  });
  const [value, setValue] = useState<AccordionValue>("datos-personales"); //Mantiene el estado en un componente.
  const datosContratacionForm = useForm<DatosContratacionForm>({
    resolver: zodResolver(datosContratacionSchema),
  });
  function onSubmitCon(values: DatosContratacionForm) {
    console.log(values);
    guardarTrabajador();
  }
  const datosAcademicosForm = useForm<DatosAcademicosForm>({
    resolver: zodResolver(datosAcademicosSchema),
  });
  function onSubmitAcd(values: DatosAcademicosForm) {
    console.log(values);
    setValue("datos-contratacion");
  }
  const datosMedicosForm = useForm<DatosMedicosForm>({
    resolver: zodResolver(datosMedicosSchema),
  });
  function onSubmitMed(values: DatosMedicosForm) {
    console.log(values);
    setValue("datos-academicos");
  }

  const datosPersonalesForm = useForm<DatosPersonales>({
    resolver: zodResolver(datosPersonalesSchema),
  });
  function onSubmit(values: DatosPersonales) {
    console.log(values);
    setValue("datos-medicos");
  }
  function guardarTrabajador() {
    const datosPersonales = datosPersonalesForm.getValues();
    const datosMedicos = datosMedicosForm.getValues();
    const datosAcademicos = datosAcademicosForm.getValues();
    const datosContratacion = datosContratacionForm.getValues();
    const trabajador = {
      datosMedicos: datosMedicos,
      datosAcademicos: datosAcademicos,
      datosPersonales: { ...datosPersonales, ...datosContratacion },
    };
    console.log(trabajador);
    mutation.mutate(trabajador);
  }
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
          <AccordionItem value="datos-medicos">
            <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 p-4 rounded-t-md transition-colors">
              Información de la empresa
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <section>
                <Form {...datosMedicosForm}>
                  <form
                    className="grid grid-cols-3 gap-4"
                    onSubmit={datosMedicosForm.handleSubmit(onSubmitMed)}
                  >
                    <FormField
                      control={datosMedicosForm.control}
                      name="alergias"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de la empresa</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="alergiasmed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Representante legal</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="enfercronicas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosAcademicosForm.control}
                      name="gradoestudios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea">
                      Siguiente
                    </Button>
                  </form>
                </Form>
              </section>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-academicos">
            <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 p-4 rounded-t-md transition-colors">
              Datos de facturación
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <section>
                <Form {...datosAcademicosForm}>
                  <form
                    className="grid grid-cols-3 gap-4"
                    onSubmit={datosAcademicosForm.handleSubmit(onSubmitAcd)}
                  >
                    <FormField
                      control={datosAcademicosForm.control}
                      name="cedula"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>RFC</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosAcademicosForm.control}
                      name="carrera"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de regimen</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosAcademicosForm.control}
                      name="certificaciones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número de cuenta/Clave</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosAcademicosForm.control}
                      name="explaboral"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banco</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosAcademicosForm.control}
                      name="gradoestudios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo de facturación</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosContratacionForm.control}
                      name="iniciocontrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de vencimiento de constancia</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              onChange={field.onChange}
                              maxDate={new Date()}
                              minDate={new Date(1900, 1, 1)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea">
                      Siguiente
                    </Button>
                  </form>
                </Form>
              </section>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-contratacion">
            <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 p-4 rounded-t-md transition-colors">
              Contacto
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <section>
                <Form {...datosContratacionForm}>
                  <form
                    className="grid grid-cols-3 gap-4"
                    onSubmit={datosContratacionForm.handleSubmit(onSubmitCon)}
                  >
                    <FormField
                      control={datosAcademicosForm.control}
                      name="gradoestudios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de contacto</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosAcademicosForm.control}
                      name="gradoestudios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosAcademicosForm.control}
                      name="gradoestudios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea">
                      Guardar
                    </Button>
                  </form>
                </Form>
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </Layout>
  );
}
