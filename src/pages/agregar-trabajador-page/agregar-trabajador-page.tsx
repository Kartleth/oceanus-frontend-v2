import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import Layout from "@/components/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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

type AccordionValue =
  | "datos-personales"
  | "datos-medicos"
  | "datos-academicos"
  | "datos-contratacion"
  | string;

const datosPersonalesSchema = z.object({
  nombre: z
    .string({
      required_error: "Nombre completo obligatorio.",
    })
    .max(150, {
      message: "El nombre no puede excederse de mas de 150 caracteres.",
    })
    .min(1, { message: "El nombre es obligatorio." }),
  fechanacimiento: z
    .date({
      required_error: "Fecha de nacimiento obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de nacimiento no puede ser antes de 1914.",
    })
    .max(new Date(), {
      message: "Fecha de nacimiento menos al año actual.",
    }),
  curp: z
    .string({
      required_error: "Curp es obligatoria.",
    })
    .regex(
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/gm,
      { message: "Curp incorrecta." }
    ),
  rfc: z
    .string({
      required_error: "RFC es obligatoria.",
    })
    .regex(
      /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/gm,
      { message: "RFC incorrecto." }
    ),
  ine: z
    .string({
      required_error: "Numero de INE incorrecto.",
    })
    .regex(/^\d{12,13}$/g, { message: "Numero de INE incorrecto." }),
  estadocivil: z.string({ required_error: "Estado civil obligatorio." }),
  numerofijo: z.string().optional(),
  numerocelular: z
    .string({ required_error: "Numero celular obligatorio." })
    .regex(/^\d{10}$/g, { message: "Numero de celular incorrecto." }),
  correo: z
    .string({ required_error: "El correo es obligatorio." })
    .max(50, { message: "Correo incorrecto." })
    .email({ message: "Correo electronico incorrecto." }),
  direccion: z
    .string({ required_error: "Direccion obligatoria" })
    .min(10, { message: "Direccion minima de 10 caracteres." }),
  numerolicencia: z
    .string()
    .max(15, { message: "Numero de Licencia Incorrecto." })
    .optional(),
  numeropasaporte: z
    .string()
    .max(9, { message: "Numero de pasaporte incorrecto, son maximo 9 numeros" })
    .optional(),
  fechaingreso: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
});

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

type DatosPersonalesForm = z.infer<typeof datosPersonalesSchema>;
type DatosMedicosForm = z.infer<typeof datosMedicosSchema>;
type DatosAcademicosForm = z.infer<typeof datosAcademicosSchema>;
type DatosContratacionForm = z.infer<typeof datosContratacionSchema>;

export function PageAgregarTrabajador() {
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

  const datosPersonalesForm = useForm<DatosPersonalesForm>({
    resolver: zodResolver(datosPersonalesSchema),
  });
  function onSubmit(values: DatosPersonalesForm) {
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
              <BreadcrumbPage className="line-clamp-1 text-xl">
                Agregar Trabajador
              </BreadcrumbPage>
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
            <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 p-4 rounded-t-md transition-colors">
              Datos Personales
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <section>
                <Form {...datosPersonalesForm}>
                  <form
                    className="grid grid-cols-3 gap-4"
                    onSubmit={datosPersonalesForm.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={datosPersonalesForm.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="fechanacimiento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Nacimiento</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              onChange={field.onChange}
                              maxDate={new Date()}
                              minDate={new Date(1914, 0, 1)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="curp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Curp</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="rfc"
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
                      control={datosPersonalesForm.control}
                      name="ine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero de INE</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="estadocivil"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado Civil</FormLabel>
                          <FormControl>
                            <FormSelect
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Selecciona un estado civil"
                            >
                              <SelectItem value="soltero">
                                Soltero(a)
                              </SelectItem>
                              <SelectItem value="casado">Casado(a)</SelectItem>
                            </FormSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="numerofijo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero de Casa</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="numerocelular"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero de Celular</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="correo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electronico </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="direccion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Direccion </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="numerolicencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero licencia </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="numeropasaporte"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero de Pasaporte </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosPersonalesForm.control}
                      name="fechaingreso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de ingreso </FormLabel>
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
                    <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea ">
                      Siguiente
                    </Button>
                  </form>
                </Form>
              </section>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="datos-medicos">
            <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 p-4 rounded-t-md transition-colors">
              Datos Médicos
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
                          <FormLabel>Alergias</FormLabel>
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
                          <FormLabel>Alergias a Medicamentos</FormLabel>
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
                          <FormLabel>Enfermedad Cronica</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="genero"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Género</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un género" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="masculino">
                                  Masculino
                                </SelectItem>
                                <SelectItem value="femenino">
                                  Femenino
                                </SelectItem>
                                <SelectItem value="otro">Otro</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={datosMedicosForm.control}
                      name="lesiones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lesiones</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="numemergencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero de emergencia</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="nombremergencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de emergencia</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="numseguro"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numero de seguro</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="relaemergencia"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relacion con la persona</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosMedicosForm.control}
                      name="tiposangre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de sangre</FormLabel>
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
              Datos Académicos
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
                          <FormLabel>Cedula Profesional</FormLabel>
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
                          <FormLabel>Carrera</FormLabel>
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
                          <FormLabel>Certificaciones</FormLabel>
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
                          <FormLabel>Experiencia Laboral</FormLabel>
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
                          <FormLabel>Grado de Estudios</FormLabel>
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
          <AccordionItem value="datos-contratacion">
            <AccordionTrigger className="[&[data-state=open]]:bg-gray-200 p-4 rounded-t-md transition-colors">
              Datos de Contratación
            </AccordionTrigger>
            <AccordionContent className="rounded-b-md bg-muted/50 p-4">
              <section>
                <Form {...datosContratacionForm}>
                  <form
                    className="grid grid-cols-3 gap-4"
                    onSubmit={datosContratacionForm.handleSubmit(onSubmitCon)}
                  >
                    <FormField
                      control={datosContratacionForm.control}
                      name="tipocontrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de contrato</FormLabel>
                          <FormControl>
                            <FormSelect
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Selecciona tipo de contrato"
                            >
                              <SelectItem value="indefinido">
                                Indefinido
                              </SelectItem>
                              <SelectItem value="temporal">Temporal</SelectItem>
                              <SelectItem value="porObra">Por Obra</SelectItem>
                            </FormSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosContratacionForm.control}
                      name="estado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado del Empleado</FormLabel>
                          <FormControl>
                            <FormSelect
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Selecciona estado empleado"
                            >
                              <SelectItem value="activo">Activo</SelectItem>
                              <SelectItem value="inactivo">Inactivo</SelectItem>
                            </FormSelect>
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
                          <FormLabel>Fecha de Ingreso del Contrato</FormLabel>
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
                    <FormField
                      control={datosContratacionForm.control}
                      name="fincontrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha final del Contrato</FormLabel>
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
