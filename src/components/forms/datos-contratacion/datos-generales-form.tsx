import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSelect, SelectItem } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectEmpresa } from "@/components/select-empresa/select-empresa";

export const datosGeneralesSchema = z.object({
  nombrecontrato: z.string({
    required_error: "Nombre de contrato obligatorio.",
  }),
  subcontrato: z.string({ required_error: "Campo obligatorio." }),
  idcontratofuente: z
    .string({ required_error: "Escribe correctamente el campo." })
    .optional(),
  numerocontrato: z.string({ required_error: "" }),
  // contratante: z.string(),
  contratado: z.string(),
  // facturas: z.string(),
  iniciocontrato: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
  fincontrato: z
    .date()
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    })
    .optional(),
  montocontrato: z.string(),
  anticipocontrato: z.string(),
  direccion: z.string(),
  personalcontrato: z.string(),
  tipocontrato: z.string({ required_error: "Tipo de contrato obligatorio." }),
});

export type DatosGeneralesContratacion = z.infer<typeof datosGeneralesSchema>;

interface DatosGeneralesContratacionProps {
  onSubmitCon: (values: DatosGeneralesContratacion) => void;
  form: UseFormReturn<DatosGeneralesContratacion>;
}

export const DatosGeneralesContratacionForm: FC<
  DatosGeneralesContratacionProps
> = ({ onSubmitCon, form }) => {
  const tipoContrato = form.watch("tipocontrato");
  const disableContractEnd = tipoContrato?.toLowerCase() === "indefinido";
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmitCon)}
      >
        <FormField
          control={form.control}
          name="nombrecontrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Contrato</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subcontrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contrato</FormLabel>
              <FormControl>
                <FormSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Selecciona tipo de subcontrato"
                >
                  <SelectItem value="subcontrato">Subcontrato</SelectItem>
                  <SelectItem value="contrato origen">
                    Contrato Origen
                  </SelectItem>
                  <SelectItem value="cotizacion">Cotizacion</SelectItem>
                </FormSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numerocontrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numero de Contrato</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
          control={form.control}
          name="fincontrato"
          disabled={disableContractEnd}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha final del Contrato</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  minDate={new Date(1900, 1, 1)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contratado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Contratado</FormLabel>
              <FormControl>
                <SelectEmpresa value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="montocontrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto del Contrato</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anticipocontrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anticipo del Contrato</FormLabel>
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
              <FormLabel>Direccion del Contrato</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="personalcontrato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal del Contrato</FormLabel>
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
  );
};
