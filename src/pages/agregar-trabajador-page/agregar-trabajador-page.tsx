import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import Layout from "@/components/layout";
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
  alergiasMedicamentos: z.string({message:""}),
});
const datosAcademicosSchema = z.object({});
const datosContratacionSchema = z.object({});

type DatosPersonalesForm = z.infer<typeof datosPersonalesSchema>;

export function PageAgregarTrabajador() {
  const datosPersonalesForm = useForm<DatosPersonalesForm>({
    resolver: zodResolver(datosPersonalesSchema),
  });
  function onSubmit(values: DatosPersonalesForm) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
      <main>
        <section>
          <h1>Datos Personales</h1>
          <Form {...datosPersonalesForm}>
            <form onSubmit={datosPersonalesForm.handleSubmit(onSubmit)}>
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
                      <Input {...field} />
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
              <Button>Guardar</Button>
            </form>
          </Form>
        </section>
        <section>
          <h1>Datos Médicos</h1>
        </section>
        <section>
          <h1>Datos Académicos</h1>
        </section>
        <section>
          <h1>Datos de Contratación</h1>
        </section>
      </main>
    </Layout>
  );
}
