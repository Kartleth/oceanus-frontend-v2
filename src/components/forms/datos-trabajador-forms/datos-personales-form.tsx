import { z } from "zod";
import { Button } from "../../ui/button";
import { DatePicker } from "../../ui/datepicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { FormSelect, SelectItem } from "../../ui/select";
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";

export const datosPersonalesSchema = z.object({
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
      { message: "Curp incorrecta, debe cumplir con los digitos correctos de la curp oficial." }
    ),
  rfc: z
    .string({
      required_error: "RFC es obligatoria.",
    })
    .regex(
      /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/gm,
      { message: "RFC incorrecto, no cumple con los digitos oficiales que complementan un RFCf." }
    ),
  ine: z
    .string({
      required_error: "Numero de INE incorrecto, debe cumplir con los 13 digitos correspondientes.",
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

export type DatosPersonales = z.infer<typeof datosPersonalesSchema>;

interface DatosPersonalesProps {
  onSubmit: (values: DatosPersonales) => void;
  form: UseFormReturn<DatosPersonales>;
}

export const DatosPersonalesForm: FC<DatosPersonalesProps> = ({
  form,
  onSubmit,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
                  <SelectItem value="soltero">Soltero(a)</SelectItem>
                  <SelectItem value="casado">Casado(a)</SelectItem>
                </FormSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
  );
};
