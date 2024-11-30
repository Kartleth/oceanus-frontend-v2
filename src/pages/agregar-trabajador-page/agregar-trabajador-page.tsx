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

type AccordionValue =
  | "datos-personales"
  | "datos-medicos"
  | "datos-academicos"
  | "datos-contratacion"
  | string;

const datosPersonalesSchema = z.object({
  name: z
    .string({
      required_error: "Nombre completo obligatorio.",
    })
    .max(150, {
      message: "El nombre no puede excederse de mas de 150 caracteres.",
    })
    .min(1, { message: "El nombre es obligatorio." }),
  fechaNacimiento: z
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
  clave: z
    .string({
      required_error: "Numero de INE incorrecto.",
    })
    .regex(/\d{10}/g, { message: "Numero de INE incorrecto." }),
  estadoCivil: z.string({ required_error: "Estado civil obligatorio." }),
  numeroCasa: z.string().optional(),
  numeroCelular: z
    .string({ required_error: "Numero celular obligatorio." })
    .regex(/\d{10}/g, { message: "Numero de celular incorrecto." }),
  correoElectronico: z
    .string({ required_error: "El correo es obligatorio." })
    .email({ message: "Correo electronico incorrecto." }),
  direccion: z
    .string({ required_error: "Direccion obligatoria" })
    .min(10, { message: "Direccion minima de 10 caracteres." }),
  numeroLicencia: z.string().optional(),
  numeroPasaporte: z.string().optional(),
  fechaIngreso: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
});

const datosMedicosSchema = z.object({
  alegias: z.string({ message: "Introduce el tipo de alergias." }).optional(),
  enfermedadCronica: z
    .string({ message: "Introduce si padeces de una enfermedad cronica." })
    .optional(),
  lesiones: z.string({ message: "Introduce lesiones." }).optional(),
  alergiasMedicamentos: z.string({ message: "" }),
  numeroSeguro: z.string({ required_error: "Numero seguro obligatorio." }),
  relacionPersona: z.string({
    required_error: "Relacion con trabajador obligaoria.",
  }),
  numeroEmergencia: z.string({
    required_error: "Numero de emergencia obligatorio.",
  }),
  tipoSangre: z.string({ required_error: "Tipo de sangre obligatorio." }),
  genero: z.string({ required_error: "Genero obligatorio." }),
});

const datosAcademicosSchema = z.object({
  cadulaProfesional: z
    .string({ required_error: "Ingresa cedula profesional." })
    .optional(),
  carrera: z.string({ required_error: "Carrera obligatorio." }),
  experienciaLaboral: z
    .string({ required_error: "Ingresa experiencia laboral." })
    .optional(),
  certificaciones: z
    .string({ required_error: "Introduce certificaciones." })
    .optional(),
  gradosEstudios: z.string({ required_error: "Nivel de estudios obligatorio" }),
});
const datosContratacionSchema = z.object({
  tipoContrato: z.string({ required_error: "Tipo de contrato obligatorio." }),
  estadoEmpleado: z.string({ required_error: "Campo obligatorio." }),
  fechaInicioContrato: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
  fechaFinContrato: z
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
  const [value, setValue] = useState<AccordionValue>("datos-personales"); //Mantiene el estado en un componente.
  const datosContratacionForm = useForm<DatosContratacionForm>({
    resolver: zodResolver(datosContratacionSchema),
  });
  function onSubmitCon(values: DatosContratacionForm) {
    console.log(values);
  }
  const datosAcademicosForm = useForm<DatosAcademicosForm>({
    resolver: zodResolver(datosAcademicosSchema),
  });
  function onSubmitAcd(values: DatosAcademicosForm) {
    console.log(values);
    setValue("datos-contratacion")
  }
  const datosMedicosForm = useForm<DatosMedicosForm>({
    resolver: zodResolver(datosMedicosSchema),
  });
  function onSubmitMed(values: DatosMedicosForm) {
    console.log(values);
    setValue("datos-academicos")
  }

  const datosPersonalesForm = useForm<DatosPersonalesForm>({
    resolver: zodResolver(datosPersonalesSchema),
  });
  function onSubmit(values: DatosPersonalesForm){
    console.log(values);
    setValue("datos-medicos")
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
                      name="name"
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
                      name="fechaNacimiento"
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
                      name="clave"
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
                      name="estadoCivil"
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
                      name="numeroCasa"
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
                      name="numeroCelular"
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
                      name="correoElectronico"
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
                      name="numeroLicencia"
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
                      name="numeroPasaporte"
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
                      name="fechaIngreso"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de ingreso </FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              onChange={field.onChange}
                              minDate={undefined}
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
                      name="alegias"
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
                      name="alergiasMedicamentos"
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
                      name="enfermedadCronica"
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
                      name="numeroEmergencia"
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
                      name="numeroSeguro"
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
                      name="relacionPersona"
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
                      name="tipoSangre"
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
                      name="cadulaProfesional"
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
                      name="experienciaLaboral"
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
                      name="gradosEstudios"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grados de Estudios</FormLabel>
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
                      name="tipoContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de contrato</FormLabel>
                          <FormControl>
                            <FormSelect
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Selecciona tipo de contrato"
                            >
                              <SelectItem value="soltero">
                                Indefinido
                              </SelectItem>
                              <SelectItem value="casado">Temporal</SelectItem>
                              <SelectItem value="casado">Por Obra</SelectItem>
                            </FormSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosContratacionForm.control}
                      name="estadoEmpleado"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado del Empleado</FormLabel>
                          <FormControl>
                            <FormSelect
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              placeholder="Selecciona estado empleado"
                            >
                              <SelectItem value="soltero">Activo</SelectItem>
                              <SelectItem value="casado">Inactivo</SelectItem>
                            </FormSelect>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosContratacionForm.control}
                      name="fechaInicioContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de Ingreso del Contrato</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              onChange={field.onChange}
                              minDate={undefined}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={datosContratacionForm.control}
                      name="fechaFinContrato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha final del Contrato</FormLabel>
                          <FormControl>
                            <DatePicker
                              date={field.value}
                              onChange={field.onChange}
                              minDate={undefined}
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
