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
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectEmpresa } from "@/components/select-empresa/select-empresa";

export const datosConvenioSchema = z.object({
  fechainicio: z
    .date({
      required_error: "Fecha de ingreso obligatoria.",
    })
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    }),
  fechafinal: z
    .date()
    .min(new Date(1914, 0, 1), {
      message: "Fecha de ingreso no puede ser antes de 1914.",
    })
    .optional(),
  montoadicional: z.string(),
  documento: z.string(),
  contratos: z.string(),
});

export type DatosConvenio = z.infer<typeof datosConvenioSchema>;

interface DatosConvenioProps {
  onSubmit: (values: DatosConvenio) => void;
  form: UseFormReturn<DatosConvenio>;
}

export const DatosConvenioForm: FC<DatosConvenioProps> = ({
  onSubmit,
  form,
}) => {
  return (
    <Form {...form}>
      <form
        className="grid grid-cols-3 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="contratos"
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
          name="documento"
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
          name="fechainicio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Ingreso del Convenio</FormLabel>
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
          name="fechafinal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha final del Convenio</FormLabel>
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
          name="montoadicional"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto Adicional</FormLabel>
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
