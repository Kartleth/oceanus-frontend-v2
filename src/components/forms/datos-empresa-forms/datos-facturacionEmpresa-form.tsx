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
import { UseFormReturn } from "react-hook-form";
import { FC } from "react";
import { DatePicker } from "@/components/ui/datepicker";

export const datosFacturacionEmpresaSchema = z.object({
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

export type DatosFacturacionEmpresa = z.infer<
  typeof datosFacturacionEmpresaSchema
>;

interface DatosFacturacionEmpresaProps {
  onSubmitFacEmp: (values: DatosFacturacionEmpresa) => void;
  form: UseFormReturn<DatosFacturacionEmpresa>;
}

export const DatosFacturacionEmpresaForm: FC<DatosFacturacionEmpresaProps> = ({
  form,
  onSubmitFacEmp,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitFacEmp)}
      >
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
          name="correofacturacion"
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
          control={form.control}
          name="tiporegimen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de régimen</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numerocuenta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de cuenta</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="banco"
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
          control={form.control}
          name="nombrecontrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de contrato</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fechavencimientoconstancia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de vencimiento de constancia</FormLabel>
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
        <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea ">
          Siguiente
        </Button>
      </form>
    </Form>
  );
};
