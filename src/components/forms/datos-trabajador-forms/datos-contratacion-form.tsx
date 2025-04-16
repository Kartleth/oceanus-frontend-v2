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
} from "../../ui/form";
import { FormSelect, SelectItem } from "../../ui/select";
import { DatePicker } from "../../ui/datepicker";
import { Button } from "../../ui/button";

export const datosContratacionSchema = z.object({
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
    .date()
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    })
    .optional(),
});

export type DatosContratacion = z.infer<typeof datosContratacionSchema>;

interface DatosContratacionProps {
  onSubmitCon: (values: DatosContratacion) => void;
  form: UseFormReturn<DatosContratacion>;
}

export const DatosContratacionForm: FC<DatosContratacionProps> = ({
  onSubmitCon,
  form,
}) => {
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
        <Button className="col-span-3 w-fit justify-self-end bg-deepSea hover:bg-deepLightSea">
          Guardar
        </Button>
      </form>
    </Form>
  );
};
