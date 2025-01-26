import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSelect, SelectItem } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";

export const datosEmpresaSchema = z.object({
  razonsocial: z
    .string({ required_error: "Razón social obligatoria." })
    .max(150, { message: "Razón social no puede exceder de 150 caracteres." })
    .min(1, { message: "Razón social obligatoria." }),
  correo: z
    .string()
    .max(50, { message: "Correo incorrecto." })
    .email({ message: "Correo electrónico incorrecto." })
    .nullable(),
  telefono: z
    .string()
    .regex(/^\d{10}$/, { message: "Número de teléfono debe tener 10 dígitos." })
    .nullable(),
  representantelegal: z.string().nullable(),
  correoRepresentantelegal: z
    .string()
    .email({ message: "Correo electrónico incorrecto." })
    .nullable(),
  telefonoRepresentantelegal: z
    .string()
    .regex(/^\d{10}$/, { message: "Número de teléfono debe tener 10 dígitos." })
    .nullable(),
  rfc: z
    .string({ required_error: "RFC es obligatorio." })
    .regex(
      /^([A-ZÑ&]{3,4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{3})$/,
      { message: "RFC incorrecto, debe cumplir con el formato oficial." }
    ),
  correofacturacion: z
    .string()
    .max(50, { message: "Correo no puede exceder de 50 caracteres." })
    .email({ message: "Correo electrónico incorrecto." })
    .nullable(),
  tiporegimen: z.string().nullable(),
  numerocuenta: z.string().nullable(),
  nombrecontrato: z
    .string()
    .max(150, { message: "Contrato no puede exceder de 150 caracteres." })
    .nullable(),
  fechavencimientoconstancia: z
    .date()
    .min(new Date(1914, 0, 1), {
      message: "Fecha no puede ser anterior a 1914.",
    })
    .nullable(),
});

export type DatosEmpresa = z.infer<typeof datosEmpresaSchema>;

interface DatosEmpresaProps {
  onSubmit: (values: DatosEmpresa) => void;
  form: UseFormReturn<DatosEmpresa>;
}

export const DatosEmpresaForm: FC<DatosEmpresaProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="razonsocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón social</FormLabel>
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
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefono"
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
        <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea ">
          Siguiente
        </Button>
      </form>
    </Form>
  );
};
